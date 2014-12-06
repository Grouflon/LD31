if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * Sound
 * ===================================*/
define([

    ]
    , function () {
        /**** PUBLIC ****/

        Object.defineProperty(Sound.prototype, "loop", {
           get: function() { return this._audio.loop },
           set: function(value) { this._audio.loop = value }
        });

        Object.defineProperty(Sound.prototype, "volume", {
            get: function() { return this._audio.volume },
            set: function(value) { this._audio.volume = value }
        });

        Object.defineProperty(Sound.prototype, "duration", {
            get: function() { return this._audio.duration }
        });

        function Sound(audio) {
            this._audio = audio;
        }

        Sound.prototype.play = function()
        {
            this._audio.play();
        };

        Sound.prototype.stop = function()
        {
            this._audio.currentTime = 0;
            this._audio.pause();
        };

        Sound.prototype.pause = function()
        {
            this._audio.pause();
        };

        /**** PRIVATE ****/

        Sound.prototype._audio = null;

        return Sound;
    });