(function (exports) {
  'use strict';

  /** Berta's (user inter)face:
   *
   * Component structure
   *   - Navigator
   *     - CompassScreen
   *     - NotificationScreen
   *     - PlayerScreen
   *   - Debugger
   */

  // function say(msg, ctx) {
  //   if (Object.prototype.toString.call(msg) === '[object Array]') {
  //     msg = msg[Math.floor(Math.random() * msg.length)];
  //   }
  //   // textdiv.text(t(msg, ctx));
  // }
  //
  // say(MESSAGES.disoriented); // no signal yet

  var STATES = {
    NAVIGATING: 0,
    ANNOUNCE:   1,
    PLAY:       2,
    CONTINUE:   3,
    FINISHED:   4
  };

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
              '-webkit-transform': 'rotate(' + (state.direction || 0) + 'deg)',
              'display': (typeof state.direction !== null)
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

  // var NotificationScreen = React.createClass({});
  // var PlayerScreen = React.createClass({});

  // Navigator state machine:
  //   o-> NAVIGATING -> ANNOUNCE -> PLAY -> FINISHED
  //       ^                            |
  //       +-------- CONTINUE <---------+
  //
  // distance, direction, position, heading, sound info

  var Navigator = React.createClass({
    getInitialState: function () {
      return {};
    },
    handleNewDestination: function (info) {
      console.info('Als Nächstes: %s - %s', info.artist, info.title);
      // notification screen, wait for tap
    },
    handleTrackingUpdate: function (distance, direction) {
      this.setState({
        distance: distance,
        direction: direction
      });
    },
    handleAtDestination: function (info) {
      // Show announcement,
      // wait for tap,
      // play sound,
      // continue tour (next())
    },
    handleTourFinished: function () {
      // show "Bring me home" notification
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
      var props, state;

      props = this.props;
      state = this.state.state;

      if (state === Navigator.ANNOUNCE) {
        // render sound notification
      } else if (state === Navigator.PLAY) {
        // render player
      } else if (state === Navigator.CONTINUE) {
        // render notification screen
      } else if (state === Navigator.FINISHED) {
        // render notification screen
        // ({onClick: function () {}})
      }

      // Default state (NAVIGATING)
      return CompassScreen(props);
    }
  });

  Navigator.NAVIGATING = 0;
  Navigator.ANNOUNCE   = 1;
  Navigator.PLAY       = 2;
  Navigator.CONTINUE   = 3;
  Navigator.FINISHED   = 4;

  exports.Navigator = Navigator;

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

  exports.Debugger = Debugger;

  var App = React.createClass({
    getInitialState: function () {
      return {debug: false};
    },
    render: function () {
      var view;
      view = this.state.debug ? Debugger(this.props) : Navigator(this.props);
      return React.DOM.div({
        onClick: function () {
          this.setState({debug: !this.state.debug}); // toggle debug view
        }.bind(this)
      }, view);
    }
  });

  exports.App = App;
})(this);
