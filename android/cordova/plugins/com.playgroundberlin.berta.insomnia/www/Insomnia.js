var exec = require('cordova/exec');

var Insomnia = {};

Insomnia.enable = function enable() {
  exec(null, null, 'Insomnia', 'enable', []);
};

Insomnia.disable = function disable() {
  exec(null, null, 'Insomnia', 'disable', []);
};

module.exports = Insomnia;
