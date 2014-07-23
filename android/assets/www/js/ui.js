(function (exports) {
  'use strict';

  /**
   * Utility functions
   */

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

  /**
   * Berta's (user inter)face:
   *
   * Component structure
   *   - App
   *     - Navigator
   *       - CompassScreen
   *       - NotificationScreen
   *       - PlayerScreen
   *     - Debugger
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

  var NotificationScreen = React.createClass({
    render: function () {
      var props = this.props;
      return React.DOM.div({
        className: 'screen notification',
        onClick: props.handleContinue || (function noop() {})
      }, [
        React.DOM.h2({}, props.message)
      ]);
    }
  });

  var PlayerScreen = React.createClass({
    getInitialState: function () {
      return {playing: false};
    },
    play: function () {},
    pause: function () {},
    stop: function () {},
    render: function () {
      var props = this.props;
      return React.DOM.div({
        className: 'screen player'
      }, [
        React.DOM.h2({}, text(props.messages.voila, props.info)),
        React.DOM.div({}, [
          React.DOM.a({
            onClick: function () {}
          }, this.state.playing ? 'Pause' : 'Play'),
          React.DOM.a({
            onClick: function () {}
          }, 'Rewind'),
          React.DOM.a({
            onClick: props.handleContinue
          }, 'Weiter geht\'s')
        ])
      ]);
    }
  });

  // Navigator state machine:
  //
  //   o-> LAUNCHED -> NAVIGATING -> ANNOUNCE -> PLAY -> FINISHED
  //                   ^                            |
  //                   +-------- CONTINUE <---------+
  //

  var Navigator = React.createClass({
    getInitialState: function () {
      return {mode: Navigator.LAUNCHED};
    },
    handleNewDestination: function (info) {
      console.info('Als Nächstes: %s - %s', info.artist, info.title);
      this.setState({
        mode: Navigator.NAVIGATING,
        info: info
      });
    },
    handleTrackingUpdate: function (distance, direction) {
      if (this.state.mode !== Navigator.NAVIGATING) return;
      this.props.hardware.send('' + Math.round(direction));
    },
    handleAtDestination: function (info) {
      this.setState({mode: Navigator.ANNOUNCE});
    },
    handleTourFinished: function () {
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
        return NotificationScreen({
          message: text(props.messages.disoriented)
        });
      } else if (mode === Navigator.ANNOUNCE) {
        return NotificationScreen({
          message: text(props.messages.announcement),
          handleContinue: function () {
            navigator.setState({mode: Navigator.PLAY});
          }
        });
      } else if (mode === Navigator.PLAY) {
        return PlayerScreen({
          info: state.info,
          messages: props.messages,
          handleContinue: function () {
            navigator.setState({mode: Navigator.CONTINUE});
          }
        });
      } else if (mode === Navigator.CONTINUE) {
        return NotificationScreen({
          message: text(props.messages.proceed),
          handleContinue: function () {
            berta.next(); // proceed with the tour (triggers 'goto')
          }
        });
      } else if (mode === Navigator.FINISHED) {
        return NotificationScreen({
          message: text(props.messages.goodbye),
          handleContinue: function () {
            // turn off? navigate home?
            console.info('Am Ende');
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

// <div id="debug" style="display:none">
//   <p>
//     <strong>Next (Unplayed) Sound Location:</strong><br>
//     <span id="soundLat">???</span>, <span id="soundLon">???</span><br>
//     <span id="soundDistance">???</span> m<br>
//     <span id="soundArtist">???</span><br>
//     <span id="soundTitle">???</span><br>
//     <span id="soundComment">???</span>
//   </p>
//   <p>
//     <strong>Current Location (Lat, Lon, Accuracy):</strong><br>
//     <span id="currentLat">???</span>, <span id="currentLon">???</span>, <span id="currentAcc">???</span>
//   </p>
//   <p>
//     <strong>Compass (True Heading, Magnetic, Accuracy):</strong><br>
//     <span id="currentTrueHead">???</span>, <span id="currentMagnHead">???</span>, <span id="currentHeadAcc">???</span>
//   </p>
//   <p>
//     <strong>Log:</strong><br>
//     <span id="log">Empty</span>
//   </p>
//   <div class="tab"><a href="javascript:playAudio(SDPATH+'/berta/panda.mp3')">TEST SOUND</a></div>
//   <div class="tab"><a href="javascript:stopAudio()">STOP AUDIO</a></div>
//   <div class="tab"><a href="javascript:initRoute('NORMAL')">NORMALMODE</a></div>
//   <div class="tab"><a href="javascript:initRoute('TESTMODE')">TESTMODE</a></div>
//   <div class="tab"><a href="javascript:nextPoint()">NEXT POINT</a></div>
//   <div class="tab"><a href="javascript:prevPoint()">PREV POINT</a></div>
//   <div class="tab"><a href="javascript:hardware.setServoValue('80')">SET SERVO TO 80</a></div>
//   <div class="tab"><a href="javascript:hardware.setServoValue('90')">SET SERVO TO 90</a></div>
//   <div class="tab"><a href="javascript:hardware.setServoValue('100')">SET SERVO TO 100</a></div>
//   <div class="tab"><a href="javascript:hardware.setServoValue('shutdown')">SHUTDOWN PI</a></div>
//   <div class="tab"><a href="javascript:toggleMode()">BACK</a></div>
//   <div class="tab"><a href="javascript:navigator.app.exitApp()">CLOSE APP</a></div>
// </div>

  var Debugger = React.createClass({
    getInitialState: function () {
      return {
        info: null,
        distance: null,
        direction: null
      };
    },
    handleNewDestination: function (info) {
      this.setState({info: info});
    },
    handleTrackingUpdate: function (distance, direction) {
      this.setState({
        distance: distance,
        direction: direction
      });
    },
    handleAtDestination: function (info) {
      // …
    },
    handleTourFinished: function () {
      // …
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
      var state = this.state;
      return React.DOM.div({className: 'screen dbg'}, 'Debugger');
    }
  });

  var App = React.createClass({
    getInitialState: function () {
      return {debug: false};
    },
    handleClick: function () {
      // this.setState({debug: !this.state.debug}); // toggle debug view
    },
    render: function () {
      var view;
      view = this.state.debug ? Debugger(this.props) : Navigator(this.props);
      return React.DOM.div({onClick: this.handleClick}, view);
    }
  });

  exports.App = App;
})(this);
