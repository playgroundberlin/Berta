(function (exports) {
  'use strict';

  /**
   * Berta
   *
   * She will guide you through town, knowing exactly where to look for hidden
   * treasures. When started, she will pick out the next location automatically
   * and lead you there (NAVIGATING state). When close enough to the spot, she
   * will tell you, that you've 'arrive'd (event) and reward you with some nice
   * music (AT_LOCATION state).
   *
   * Whenever you feel like moving on, just tell her so (calling next()). She
   * will visit all the places with you until you've heard the last song of the
   * tour (FINISHED state).
   *
   * Berta's finite state machine visualized:
   *
   *              start()                              next()
   *              'goto'          'arrive'            'finish'
   *   o-> INI -----------> NAV -----------> AT_LOC -----------> FIN
   *                       ^ |  <-----------                    ^ |
   *                       | |     next()                       | |
   *                       +-+     'goto'                       +-+
   *                     'move'                                stop()
   */
  var Berta = function Berta(tracker, tour, config) {
    this.tracker = tracker;

    // Set tour items

    this.tour = tour.map(function (item) {
      return {
        lat:    item[0],
        lon:    item[1],
        src:    item[2],
        artist: item[3],
        title:  item[4],
        imgsrc: item[5]
      };
    });

    this.config = config || {};

    // Tour progress information

    this.progress   = -1; // tour location index (location number)
    this.destination = null; // next tour location (LatLon)

    // Continuously updated tracking information

    this.position   = null; // our current location (LatLon)
    this.heading    = null; // our current heading (in degrees, from north)
    this.distance   = null; // calculated distance to the next tour location
    this.direction  = null; // Berta's "compass" needle direction

    // Current state (state descriptions below)
    this.state      = Berta.INITIALIZED;
  };

  Berta.INITIALIZED = 0; // tour is not yet started
  Berta.NAVIGATING  = 1; // on the way to the next location
  Berta.AT_LOCATION = 2; // currently at a tour/sound location
  Berta.FINISHED    = 3; // finished the tour

  Berta.prototype = Object.create(EventEmitter.prototype);

  function dir(heading, position, destination, landscape) {
    var actual, target, direction;
    actual = landscape ? heading + 90 : heading;
    target = position.bearingTo(destination);
    direction = target - actual;
    if (direction < 0) direction += 360;
    if (direction >= 360) direction -= 360;
    return direction;
  }

  function dist(position, destination) {
    return position.distanceTo(destination) * 1000; // in meters
  }

  Berta.prototype.start = function start() {
    var tracker, lscape, limit;

    tracker = this.tracker;
    lscape = (this.config.orientation === 'landscape');
    limit = this.config.distlimit;

    this.goto(0); // move on to the first tour location

    // Set up position and heading tracking

    tracker.on('positionchange', function (position) {
      var heading, coords, direction;

      coords = position.coords;
      heading = this.heading;

      // Update position and re-calculate the distance
      this.position = new LatLon(coords.latitude, coords.longitude);
      this.distance = dist(this.position, this.destination);

      // Re-calculate the direction after position changes
      if (heading !== null) {
        direction = dir(heading, this.position, this.destination, lscape);
        this.direction = direction;
      }

      // Trigger 'move' event with new distance and direction
      this.trigger('move', [this.distance, this.direction]);

      // Once we have reached a tour location, trigger 'arrive'.
      // Continue the tour by calling berta.next().
      if (this.distance < limit && this.state === Berta.NAVIGATING) {
        this.state = Berta.AT_LOCATION;
        this.trigger('arrive', [this.tour[this.progress]]);
      }
    }.bind(this));

    tracker.on('positionerror', function (error) {
      console.error(error);
    }.bind(this));

    tracker.on('headingchange', function (heading) {
      var position, theading;

      position = this.position;
      theading = heading.trueHeading;

      // Update heading information
      this.heading = theading >= 0 ? theading : heading.magneticHeading;

      // We can't provide a direction to the target without a position fix
      if (!position) return;

      this.direction = dir(this.heading, position, this.destination, lscape);

      // Trigger 'move' event with current distance and new direction
      this.trigger('move', [this.distance, this.direction]);
    }.bind(this));

    tracker.on('headingerror', function (error) {
      console.error(error);
    }.bind(this));

    tracker.start();
  };

  Berta.prototype.prev = function prev() {
    if (this.progress > 0) this.goto(this.progress - 1);
  };

  Berta.prototype.next = function next() {
    if (this.progress < this.tour.length - 1) {
      this.goto(this.progress + 1);
    } else {
      this.state = Berta.FINISHED;
      this.trigger('finish');
    }
  };

  Berta.prototype.goto = function goto(i) {
    var position, destination, landscape, place;

    place = this.tour[i];

    if (!place) return false;

    this.destination = new LatLon(place.lat, place.lon);
    this.progress = i;

    position = this.position;
    destination = this.destination;
    landscape = this.config.landscape;

    if (position !== null) {
      this.distance = dist(position, destination);
      if (this.heading) {
        this.direction = dir(this.heading, position, destination, landscape);
      }
    }

    this.state = Berta.NAVIGATING;
    this.trigger('goto', [place]);

    return true;
  };

  Berta.prototype.stop = function stop() {
    this.tracker.stop();
  };

  exports.Berta = Berta;
})(this);
