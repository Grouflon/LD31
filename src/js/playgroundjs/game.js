if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * Game
 * ===================================*/
define([
        'playgroundjs/plugins',
        'playgroundjs/input/mouse',
        'playgroundjs/input/keyboard',
        'playgroundjs/libs/stats/Stats'
    ]
    , function (Plugins, Mouse, Keyboard, Stats)
    {
        /**** PUBLIC ****/

        Game.prototype.timeScale = 1.0;

		Object.defineProperty(Game.prototype, "width", {
			get: function () { return this._canvas.width; }
		});

		Object.defineProperty(Game.prototype, "height", {
			get: function () { return this._canvas.height; }
		});

        Object.defineProperty(Game.prototype, "elapsed", {
            get: function () { return this._elapsed; }
        });

        Object.defineProperty(Game.prototype, "world", {
            get : function() { return this._world; },
            set : function(value) { this._nextWorld = value; }
        });

        Object.defineProperty(Game.prototype, "debug", {
            get: function () { return this._debug; },
            set : function(value)
            {
                this._stats.domElement.style.display = value ? "block" : "none";
                this._debug = value;
            }
        });


        function Game(elementId, width, height, bgColor)
        {
            var container = document.getElementById(elementId);

            if (container) {
                // INIT CANVAS
                this._canvas = document.createElement("canvas");
                if (width) this._canvas.width = width;
                if (height) this._canvas.height = height;
                if (bgColor) this._canvas.style.setProperty("background-color", bgColor);
                container.appendChild(this._canvas);
                this._ctx = this._canvas.getContext("2d");

                // INIT STATS
                this._stats = new Stats();
                this._stats.domElement.style.position = 'absolute';
                this._stats.domElement.style.left = '0px';
                this._stats.domElement.style.top = '0px';
                container.appendChild(this._stats.domElement);
                this.debug = false;

                // INIT INPUTS
                Mouse._init(this._canvas);
                Keyboard._init(this._canvas);

                // BLUR EVENTS
                window.onblur = this._onWindowBlur.bind(this);

                this._ready = true;
            }
            else console.error("Unable to find element with id \"" + elementId + "\"");
        }


        /**
         * Start game
         */
        Game.prototype.start = function() {
            if (this._ready)
            {
                this._lastFrameTime = Date.now();
                this._elapsed = 0.0;

                this._logInfo('Game Started');
                this._loop();
            }
            else console.error("Unable to start game: game failed to initialize properly");
        };


        /**** PRIVATE ****/

		Game.prototype._logInfo = function()
		{
			if (this.debug)
			{
				var args = Array.prototype.slice.call(arguments, 0);
				console.log.apply(console, args);
			}
		};

        Game.prototype._switchWorld = function()
        {
            if (this._nextWorld)
            {
                if (this._world)
                {
                    this._world.end();
                    this._world._game = null;
					this._logInfo("Ended world \"" + this._world.name + "\"");
				}
                this._world = this._nextWorld;
                this._nextWorld = null;
				this._world._game = this;
				this._world.begin();
				this._logInfo("Started world \"" + this._world.name + "\"");
            }
        };


        Game.prototype._onWindowBlur = function()
        {
            this._tabBlurred = true;
        };


        Game.prototype._loop = function()
        {
            if (this._debug) this._stats.begin();

			this._switchWorld();
            this._updateTime();
            this._update();
            this._draw();

            Mouse._reset();
            Keyboard._reset();

            if (this._debug) this._stats.end();

            requestAnimationFrame(this._loop.bind(this));
        };


        Game.prototype._updateTime = function()
        {
            var now = Date.now();

            if (this._tabBlurred) {
                this._elapsed = 0;
                this._tabBlurred = false;
            } else {
                this._elapsed = (now - this._lastFrameTime) * this.timeScale;
                this._elapsed /= 1000;
            }
            this._lastFrameTime = now;
        };


        Game.prototype._update = function()
        {
            if (this._world) this._world._update(this.elapsed);
        };


        Game.prototype._draw = function()
        {
            this._clearCanvas();
            if (this._world) this._world._draw(this._ctx);
        };


        Game.prototype._clearCanvas = function() {
            this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        };


        Game.prototype._world = null;
        Game.prototype._nextWorld = null;
        Game.prototype._stats = null;

        Game.prototype._canvas = null;
        Game.prototype._ctx = null;

        Game.prototype._elapsed = 0.0;
        Game.prototype._lastFrameTime = 0.0;

        Game.prototype._ready = false;
        Game.prototype._debug = false;
        Game.prototype._tabBlurred = false;

        return Game;
    });