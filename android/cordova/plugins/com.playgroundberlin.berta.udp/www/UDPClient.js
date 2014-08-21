var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec');

var UDPClient = function UDPClient(address, port) {
  argscheck.checkArgs('SN', 'UDPClient', arguments);
  this.address = address;
  this.port = port;
};

UDPClient.prototype.send = function send(msg) {
  exec(null, null, 'UDPClient', 'send', [this.address, this.port, '' + msg]);
};

module.exports = UDPClient;
