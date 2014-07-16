(function (exports) {
  'use strict';

  var AudioPlayer = function AudioPlayer() {
    this._media = null;
  };

  AudioPlayer.INITIALIZED = 0;
  AudioPlayer.PLAYING     = 1;
  AudioPlayer.PAUSED      = 2;
  AudioPlayer.STOPPED     = 3;

  AudioPlayer.prototype = Object.create(EventEmitter.prototype);

  AudioPlayer.prototype.play = function play(src) {
    if (this._isPlaying) return;

    this._media = new Media(src, function () {}, function () {}, function (status) {});
    this._media.play();

    this.trigger('play', [src]);
  };

  AudioPlayer.prototype.pause = function pause() {
    this._media.pause();
    this.trigger('pause');
  };

  AudioPlayer.prototype.stop = function stop() {
    this._media.stop();
    this._media = null;
    this._isPlaying = false;

    this.trigger('stop');
  };

  exports.AudioPlayer = AudioPlayer;
})(this);
