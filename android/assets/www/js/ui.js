(function (exports) {
  'use strict';

  // Utility functions

  // Maps a value from one range into another:
  // scale(150, [100, 200], [0, 1]) // => 0.5
  function scale(num, range1, range2) {
    var normalized = ((num - range1[0]) / (range1[1] - range1[0]));
    return normalized * (range2[1] - range2[0]) + range2[0];
  }

  // Retrieves a random element from an array:
  // sample([0, 1, 2, 3, 4, 5]) // => 0 or 1 or …
  function sample(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Provides template rendering/string interpolation:
  // render('Hello {{name}}!', {name: 'world'}) // => 'Hello World!'
  function render(template, context) {
    return Mustache.render(template, context);
  }

  // Renders a text message, filling in placeholders with values from context.
  // If there are multiple variants - i.e. message is an array - selects one
  // randomly.
  function text(message, context) {
    if (Array.isArray(message)) message = sample(message);
    return render(message, context);
  }

  // Berta's (user inter-)face:
  //
  // Component structure:
  //   - App
  //     - Navigator
  //       - CompassScreen
  //       - MessageScreen
  //     - (Debugger)

  /**
   * Shows the current distance and direction to the next tour location.
   *
   * Props:
   *   - distunit
   *   - berta
   *
   * State:
   *   - direction
   *   - distance
   */
  var CompassScreen = React.createClass({
    getInitialState: function () {
      return {
        direction: null,
        distance: null
      };
    },
    handleTrackingUpdate: function (distance, direction) {
      this.setState({distance: distance, direction: direction});
    },
    componentDidMount: function () {
      this.props.berta.on('move', this.handleTrackingUpdate);
    },
    componentWillUnmount: function () {
      this.props.berta.off('move', this.handleTrackingUpdate);
    },
    render: function () {
      var state = this.state;
      return React.DOM.div({
        className: 'screen compass-screen'
      }, [
        React.DOM.div({
          key: 'cs-compass',
          className: 'compass'
        }, [
          React.DOM.img({
            key: 'cs-compass-needle',
            className: 'compass-needle',
            style: {
              '-webkit-transform': 'rotate(' + (state.direction || 0) + 'deg)'
            },
            src: 'img/needle.png'
          })
        ]),
        React.DOM.p({
          key: 'cs-distance',
          className: 'distance'
        }, render(this.props.message, {distance: Math.round(state.distance)}))
      ]);
    }
  });

  /**
   * Displays a message and plays the corresponding audio file (optional).
   *
   * Props:
   *   - audiosrc (optional)
   *   - handler (optional)
   *   - message
   *
   * State:
   *   - mediastatus
   *   - media
   */
  var MessageScreen = React.createClass({
    getInitialState: function () {
      return {
        mediastatus: -1,
        media: null
      };
    },
    componentDidMount: function () {
      var audiosrc = this.props.audiosrc;
      if (audiosrc) this.load(audiosrc);
    },
    componentWillUnmount: function () {
      var media = this.state.media;
      if (media) media.release();
    },
    load: function (src) {
      var media = new Media(
        src,
        this.mediaSuccess,
        this.mediaError,
        this.mediaStatus
      );
      this.setState({media: media});
      setTimeout(function () {
        media.play();
      }, 800)
    },
    play: function () {
      this.state.media.play();
    },
    pause: function () {
      this.state.media.pause();
    },
    stop: function () {
      this.state.media.stop();
    },
    mediaSuccess: function () {
      // completed the current play or stop action
    },
    mediaError: function (error) {
      console.error('Media Error (%s): %s', error.code, error.message);
    },
    mediaStatus: function (status) {
      this.setState({mediastatus: status});
    },
    render: function () {
      var props, mediastatus, playing, stopped, children;

      props = this.props;

      children = [React.DOM.h2({
        key: 'ms-message-heading',
        className: 'message-heading'
      }, props.message)];

      if (props.handler) {
        if (props.duration) {
          setTimeout(props.handler, props.duration);
        } else {
          children.push(React.DOM.a({
            key: 'ms-continue-btn',
            className: 'continue-btn',
            onClick: props.handler || (function noop() {})
          }, 'Weiter'));
        }
      }

      if (props.audiosrc) {
        mediastatus = this.state.mediastatus;

        playing = (
          mediastatus === Media.MEDIA_STARTING ||
          mediastatus === Media.MEDIA_RUNNING
        );

        stopped = (mediastatus === Media.MEDIA_STOPPED);

        children.push(React.DOM.div({
          key: 'ms-audio-controls',
          className: 'audio-container'
        }, React.DOM.ul({
          className: 'audio-controls'
        }, [
          React.DOM.li({key: 'ms-play-pause'}, React.DOM.a({
            className: playing ? 'pause-btn' : 'play-btn',
            onClick: playing ? this.pause : this.play
          }, playing ? 'Pause' : 'Abspielen')),
          React.DOM.li({key: 'ms-stop'}, React.DOM.a({
            className: 'stop-btn ' + (stopped ? 'disabled' : ' enabled'),
            onClick: this.stop
          }, 'Stop'))
        ])));
      }

      return React.DOM.div({
        className: 'screen message-screen',
        style: this.props.imagesrc ? {
          'background': 'url(' + this.props.imagesrc + ')',
          'background-size': 'cover'
        } : {}
      }, children);
    }
  });

  /**
   * Keeps track of the application/tour state and displays the appropriate
   * screens.
   *
   * Props:
   *   - hardware
   *   - messages
   *   - berta
   *
   * State:
   *   - mode
   *   - info
   *
   * Navigator state machine (modes):
   *
   *   o-> LAUNCHED -> NAVIGATING -> ANNOUNCE -> PLAY -> FINISHED
   *                   ^                            |
   *                   +-------- CONTINUE <---------+
   *
   */
  var Navigator = React.createClass({
    getInitialState: function () {
      return {
        mode: Navigator.LAUNCHED,
        info: null
      };
    },
    handleNewDestination: function (info) {
      // console.info('Als Nächstes: %s - %s', info.artist, info.title);
      this.setState({
        mode: Navigator.NAVIGATING,
        info: info
      });
    },
    handleTrackingUpdate: function (distance, direction) {
      if (this.state.mode !== Navigator.NAVIGATING) return;
      var value = Math.round(scale(direction, [0, 360], [100, 80]));
      this.props.hardware.send(value);
    },
    handleAtDestination: function (info) {
      // console.info('Jetzt: %s - %s', info.artist, info.title);
      this.setState({
        mode: Navigator.ANNOUNCE,
        info: info
      });
    },
    handleTourFinished: function () {
      // console.info('Tour beendet');
      this.setState({
        mode: Navigator.FINISHED
      });
    },
    componentDidMount: function () {
      var berta = this.props.berta;
      berta.on('goto', this.handleNewDestination);
      berta.on('move', this.handleTrackingUpdate);
      berta.on('arrive', this.handleAtDestination);
      berta.on('finish', this.handleTourFinished);
    },
    componentWillUnmount: function () {
      var berta = this.props.berta;
      berta.off('goto', this.handleNewDestination);
      berta.off('move', this.handleTrackingUpdate);
      berta.off('arrive', this.handleAtDestination);
      berta.off('finish', this.handleTourFinished);
    },
    render: function () {
      var berta, navigator, props, state, mode;

      berta = this.props.berta;
      navigator = this;

      props = this.props;
      state = this.state;

      mode = state.mode;

      if (mode === Navigator.LAUNCHED) {
        return MessageScreen({
          key: 'ns-launched',
          message: text(props.messages.disoriented)
        });
      } else if (mode === Navigator.ANNOUNCE) {
        return MessageScreen({
          key: 'ns-announce',
          message: text(props.messages.announcement),
          duration: 8000,
          handler: function () {
            navigator.setState({mode: Navigator.PLAY});
          }
        });
      } else if (mode === Navigator.PLAY) {
        return MessageScreen({
          key: 'ns-play',
          audiosrc: state.info.src,
          imagesrc: state.info.imgsrc,
          message: text(props.messages.voila, state.info),
          handler: function () {
            navigator.setState({mode: Navigator.CONTINUE});
          }
        });
      } else if (mode === Navigator.CONTINUE) {
        return MessageScreen({
          key: 'ns-continue',
          message: text(props.messages.proceed),
          duration: 6000,
          handler: function () {
            berta.next();
          }
        });
      } else if (mode === Navigator.FINISHED) {
        return MessageScreen({
          key: 'ns-finished',
          message: text(props.messages.goodbye),
          handler: function () {
            // turn off? navigate home?
          }
        });
      }

      // Default mode (NAVIGATING)
      return CompassScreen({message: props.messages.distance, berta: berta});
    }
  });

  Navigator.LAUNCHED   = -1;
  Navigator.NAVIGATING = 0;
  Navigator.ANNOUNCE   = 1;
  Navigator.PLAY       = 2;
  Navigator.CONTINUE   = 3;
  Navigator.FINISHED   = 4;

  var App = React.createClass({
    render: function () {
      return Navigator(this.props);
    }
  });

  exports.App = App;
})(this);
