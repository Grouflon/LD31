if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Keyboard
 * ===================================*/
define([
	'playgroundjs/utils/keys'
]
	, function (Keys) {
		var Keyboard = {};

		/**
		 * Return true if one of the specified keys are currently down
		 * @param keys          Keycode / Array of keycodes
		 * @returns {boolean}
		 */
		Keyboard.check = function(keys)
        {
			keys = this._normalizeKeys(keys);
			for (var i in keys) {
				if (keys.hasOwnProperty(i)) {
                    if (keys[i] == Keys.ANY)
                    {
                        for (var j in this._keysStates) if (this._keysStates[j]) return true;
                        return false;
                    }
                    else return this._keysStates[keys[i].toString()];
				}
			}

			return false;
		};

		/**
		 * Return true if the specified key has been pressed this frame
		 * @param keys          Keycode / Array of keycodes
		 * @returns {boolean}
		 */
		Keyboard.pressed = function(keys)
        {
			keys = this._normalizeKeys(keys);

			for (var i in keys) {
				if (keys.hasOwnProperty(i))
                {
                    if (keys[i] == Keys.ANY) return this._keysPressed.length > 0;
                    else return this._keysPressed.lastIndexOf(keys[i]) >= 0;
				}
			}
			return false;
		};

		/**
		 * Return true if the specified key has been released this frame
		 * @param keys          Keycode / Array of keycodes
		 * @returns {boolean}
		 */
		Keyboard.released = function(keys)
        {
			keys = this._normalizeKeys(keys);
			for (var i in keys) {
				if (keys.hasOwnProperty(i)) {
                    if (keys[i] == Keys.ANY) return this._keysReleased.length > 0;
					else return this._keysReleased.lastIndexOf(keys[i]) >= 0;
				}
			}
			return false;
		};


        /**** PRIVATE ****/

		/**
		 * Reset last frame recording
		 * @private
		 */
		Keyboard._reset = function()
        {
			this._keysPressed.length = 0;
			this._keysReleased.length = 0;
		};


		/**
		 * Key Up Event
		 * @param event
		 * @private
		 */
		Keyboard._onKeyUp = function(event)
        {
			if (this._keysStates[event.keyCode.toString()]) {
				this._keysReleased.push(event.keyCode);
				this._keysStates[event.keyCode.toString()] = false;
			}
		};


		/**
		 * Key Down Event
		 * @param event
		 * @private
		 */
		Keyboard._onKeyDown = function(event)
        {
			if (!this._keysStates[event.keyCode.toString()]) {
				this._keysPressed.push(event.keyCode);
				this._keysStates[event.keyCode.toString()] = true;
			}
		};


		/**
		 * Initializes the Keyboard object
		 * @private
		 */
		Keyboard._init = function()
        {
			this._keysPressed = [];
			this._keysReleased = [];
			this._keysStates = {};

			// Deactivate browser's default scroll keys
			this._disableScrollKey();

			// Binding events
			addEventListener('keyup', this._onKeyUp.bind(this));
			addEventListener('keydown', this._onKeyDown.bind(this));
		};


		/**
		 * Disable Default scroll keys
		 * @private
		 */
		Keyboard._disableScrollKey = function()
        {
			window.onkeydown = function(e) {
				return !(
					e.keyCode == Keys.LEFT
				||  e.keyCode == Keys.RIGHT
				||  e.keyCode == Keys.UP
				||  e.keyCode == Keys.DOWN
				||  e.keyCode == Keys.SPACE
				);
			};
		};


		/**
		 * Make sure keys is in the form of an Array
		 * @param keys
		 * @returns {*}
		 * @private
		 */
		Keyboard._normalizeKeys = function(keys)
        {
			if (!Array.isArray(keys)) keys = [keys];
			return keys;
		};

        Keyboard._keysPressed = [];
        Keyboard._keysReleased = [];
        Keyboard._keysStates = {};


		return Keyboard;
	});