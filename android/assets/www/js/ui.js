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
   *   - messages
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
      return React.DOM.div({className: 'screen nav'}, [
        React.DOM.div({
          key: 'compass',
          className: 'compass'
        }, [
          React.DOM.img({
            key: 'compass-screen-compass-needle',
            className: 'compass-needle',
            style: {
              '-webkit-transform': 'rotate(' + (state.direction || 0) + 'deg)'
            },
            src: 'img/needle.png'
          })
        ]),
        React.DOM.p({
          key: 'compass-screen-distance',
          className: 'distance'
        }, Math.round(state.distance) + ' ' + this.props.messages.distunit)
      ]);
    }
  });

  /**
   * Displays a message and plays the corresponding audio file (optional).
   *
   * Props:
   *   - audiosrc (optional)
   *   - message
   *   - handler
   *
   * State:
   *   - playing
   *   - media
   */
  var MessageScreen = React.createClass({
    getInitialState: function () {
      return {media: null};
    },
    componentDidMount: function () {
      var audiosrc = this.props.audiosrc;
      console.log(audiosrc);
      if (!audiosrc) return;
      this.setState({
        media: new Media(audiosrc, this.mediaSuccess, this.mediaError, this.mediaStatus)
      });
    },
    componentWillUnmount: function () {
      var media = this.state.media;
      if (media) media.release();
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
    mediaSuccess: function () {},
    mediaError: function (error) {
      console.error(error.message);
    },
    mediaStatus: function (status) {},
    render: function () {
      var props, children;

      props = this.props;

      children = [
        React.DOM.h2({
          key: 'message-screen-message'
        }, props.message),
        React.DOM.a({
          key: 'message-screen-continue-link',
          onClick: props.handler || (function noop() {})
        }, 'Weiter')
      ];

      if (props.audiosrc) {
        children.push(React.DOM.div({}, React.DOM.ul({}, [
          React.DOM.li({}, React.DOM.a({
            onClick: this.play
          }, 'Abspielen')),
          React.DOM.li({}, React.DOM.a({
            onClick: this.pause
          }, 'Pause')),
          React.DOM.li({}, React.DOM.a({
            onClick: this.stop
          }, 'Stop'))
        ])));
      }

      return React.DOM.div({className: 'screen notification'}, children);
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
      this.setState({mode: Navigator.FINISHED});
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

      mode = this.state.mode;

      if (mode === Navigator.LAUNCHED) {
        return MessageScreen({
          key: 'navigator-screen-launched',
          message: text(props.messages.disoriented)
        });
      } else if (mode === Navigator.ANNOUNCE) {
        return MessageScreen({
          key: 'navigator-screen-announce',
          message: text(props.messages.announcement),
          handler: function () {
            navigator.setState({mode: Navigator.PLAY});
          }
        });
      } else if (mode === Navigator.PLAY) {
        return MessageScreen({
          key: 'navigator-screen-play',
          audiosrc: state.info.src,
          message: text(props.messages.voila, state.info),
          handler: function () {
            navigator.setState({mode: Navigator.CONTINUE});
          }
        });
      } else if (mode === Navigator.CONTINUE) {
        return MessageScreen({
          key: 'navigator-screen-continue',
          message: text(props.messages.proceed),
          handler: function () {
            berta.next();
          }
        });
      } else if (mode === Navigator.FINISHED) {
        return MessageScreen({
          key: 'navigator-screen-finished',
          message: text(props.messages.goodbye),
          handler: function () {
            // turn off? navigate home?
          }
        });
      }

      // Default mode (NAVIGATING)
      return CompassScreen(props);
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
