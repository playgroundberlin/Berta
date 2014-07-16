(function (exports) {
  'use strict';

  var GPSTracker = function GPSTracker() {
    this._pid = null; // position tracking id 
    this._hid = null; // heading tracking id
  };

  GPSTracker.prototype = Object.create(EventEmitter.prototype);

  GPSTracker.prototype.start = function start(positionOpts, headingOpts) {
    var geolocation, compass, self;

    geolocation = window.navigator.geolocation;
    compass = window.navigator.compass;
    self = this;

    positionOpts = positionOpts || {
      enableHighAccuracy: true,
      maximumAge: 1000,
      timeout: 5000
    };

    headingOpts = headingOpts || {
      frequency: 100
    };

    this._pid = geolocation.watchPosition(function (position) {
      self.trigger('positionchange', [position]);
    }, function (error) {
      self.trigger('positionerror', [error]);
    }, positionOpts);

    this._hid = compass.watchHeading(function (heading) {
      self.trigger('headingchange', [heading]);
    }, function (error) {
      self.trigger('headingerror', [error]);
    }, headingOpts);
  };

  GPSTracker.prototype.stop = function stop() {
    var geolocation, compass;

    geolocation = window.navigator.geolocation;
    compass = window.navigator.compass;

    geolocation.clearWatch(this._pid);
    compass.clearWatch(this._hid);
  };

  exports.GPSTracker = GPSTracker;
})(this);
