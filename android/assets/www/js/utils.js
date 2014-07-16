(function (exports) {
  'use strict';

  // Maps a value from one range into another:
  // scale(150, [100, 200], [0, 1]) // => 0.5
  exports.scale = function scale(num, range1, range2) {
    var normalized = ((num - range1[0]) / (range1[1] - range1[0]));
    return normalized * (range2[1] - range2[0]) + range2[0];
  }

  // Provides template rendering/string interpolation:
  // render('Hello {{name}}!', {name: 'world'}) // => 'Hello World!'
  exports.render = function render(template, ctx) {
    return Mustache.render(template, ctx);
  }
})(this);
