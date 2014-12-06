if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Mouse
 * ===================================*/
define([
	'playgroundjs/utils/math/vector2'
]
	, function (Vector2) {
        var Mouse = {};

        /**** PUBLIC ****/

        Object.defineProperty( Mouse, "position", { get: function () { return this._position.clone(); }});
        Object.defineProperty( Mouse, "hasMoved", { get: function () { return this._hasMoved; }});
        Object.defineProperty( Mouse, "hasBeenPressed", { get: function () { return this._hasBeenPressed; }});
        Object.defineProperty( Mouse, "hasBeenReleased", { get: function () { return this._hasBeenReleased; }});
        Object.defineProperty( Mouse, "isDown", { get: function () { return this._isDown; } });
        // TODO : right click events


        /**** PRIVATE ****/

		Mouse._reset = function()
        {
			this._hasMoved = false;
			this._hasBeenPressed = false;
			this._hasBeenReleased = false;
		};


		Mouse._onMove = function(event)
        {
            this._position.x = this.x = event.clientX - this._gameCanvas.offsetLeft;
            this._position.y = this.y = event.clientY - this._gameCanvas.offsetTop;
			this._hasMoved = true;
		};


		Mouse._onPressed = function(event)
        {
			this._isDown = true;
			this._hasBeenPressed = true;
		};


		Mouse._onReleased = function(event)
        {
			this._isDown = false;
			this._hasBeenReleased = true;
		};


		Mouse._init = function(gameCanvas)
        {
			this._hasMoved = false;
			this._hasBeenPressed = false;
			this._hasBeenReleased = false;
			this._isDown = false;

            this._gameCanvas = gameCanvas;

			// Binding Events
			addEventListener('mousemove', this._onMove.bind(this));
			addEventListener('mousedown', this._onPressed.bind(this));
			addEventListener('mouseup', this._onReleased.bind(this));
		};


        Mouse._position = new Vector2(0, 0);
        Mouse._hasMoved = false;
        Mouse._hasBeenPressed = false;
        Mouse._hasBeenReleased = false;
        Mouse._isDown = false;
        Mouse._gameCanvas = null;

		return Mouse;
	});