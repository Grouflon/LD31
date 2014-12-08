if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * EndScreen world
 * ===================================*/
define([
		"playgroundjs/world",
		"playgroundjs/resources",
		"playgroundjs/graphics/Rectangle",
		"playgroundjs/graphics/image",
		"playgroundjs/utils/ease"
	]
	, function (World, Resources, Rectangle, Image, Ease)
	{
		EndScreen.prototype = Object.create(World.prototype);
		/**** PUBLIC ****/

		function EndScreen()
		{
			World.call(this, "End Screen");
		}

		EndScreen.prototype.begin = function()
		{
			this.addChild(new Rectangle(this.game.width, this.game.height, "#000"));
			this._image = new Image(Resources.get("end_screen").value);
			this._image.alpha = 0.0;
			this.addChild(this._image)
		};

		EndScreen.prototype.update = function(elapsed)
		{
			if (this._tweenTimer < this._tweenDuration)
			{
				this._tweenTimer += elapsed;
				this._image.alpha = Ease.quadOut(this._tweenTimer / this._tweenDuration);
			}
		};

		/**** PRIVATE ****/
		EndScreen.prototype._image = null;
		EndScreen.prototype._tweenTimer = 0.0;
		EndScreen.prototype._tweenDuration = 1.0;

		return EndScreen;
	});