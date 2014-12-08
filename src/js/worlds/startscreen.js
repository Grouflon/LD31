if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * StartScreen world
 * ===================================*/
define([
		"playgroundjs/world",
		"playgroundjs/resources",
		"playgroundjs/graphics/Rectangle",
		"playgroundjs/graphics/image",
		"playgroundjs/input/keyboard",
		"playgroundjs/utils/keys",
		"playgroundjs/utils/ease",
		"levelmanager"
	]
	, function (World, Resources, Rectangle, Image, Keyboard, Keys, Ease, LevelManager)
	{
		StartScreen.prototype = Object.create(World.prototype);
		/**** PUBLIC ****/

		function StartScreen()
		{
			World.call(this, "Start Screen");
		}

		StartScreen.prototype.begin = function()
		{
			this.addChild(new Rectangle(this.game.width, this.game.height, "#000"));
			this._image = new Image(Resources.get("start_screen").value);
			this._image.alpha = 0.0;
			this.addChild(this._image)
		};

		StartScreen.prototype.update = function(elapsed)
		{
			if (Keyboard.pressed(Keys.ANY)) this._leaving = true;

			if (!this._leaving && this._tweenTimer < this._tweenDuration)
			{
				this._tweenTimer += elapsed;
				this._image.alpha = Ease.quadOut(this._tweenTimer / this._tweenDuration);
			}
			else if (this._leaving)
			{
				if (this._tweenTimer > 0)
				{
					this._tweenTimer -= elapsed;
					if (this._tweenTimer < 0) this._tweenTimer = 0;
					this._image.alpha = Ease.quadOut(this._tweenTimer / this._tweenDuration);
				}
				else LevelManager.setLevel(LevelManager._currentLevel);
			}
		};

		/**** PRIVATE ****/
		StartScreen.prototype._image = null;
		StartScreen.prototype._tweenTimer = 0.0;
		StartScreen.prototype._tweenDuration = 1.0;
		StartScreen.prototype._leaving = false;


		return StartScreen;
	});