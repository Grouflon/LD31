if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Flash GameObject
 * ===================================*/
define([
		"playgroundjs/gameobject",
		"playgroundjs/graphics/rectangle",
		"playgroundjs/utils/ease"
	]
	, function (GameObject, Rectangle, Ease)
	{
		Flash.prototype = Object.create(GameObject.prototype);
		/**** PUBLIC ****/


		function Flash()
		{
			GameObject.call(this, "Flash");
		}

		Flash.prototype.start = function()
		{
			this._graphic = new Rectangle(this.game.width + 20, this.game.height + 20, "#9febe7", -10, -10);
			this._graphic.layer = 50;
			this.addChild(this._graphic);
		};

		Flash.prototype.update = function(elapsed)
		{
			this.x = this.world.camera.x;
			this.y = this.world.camera.y;

			this._fadeTimer += elapsed;

			this._graphic.alpha = (1.0 - Ease.quadOut(this._fadeTimer / this._fadeDuration)) * 0.5;

			if (this._fadeTimer >= this._fadeDuration) this.destroy();
		};

		/**** PRIVATE ****/

		Flash.prototype._graphic = null;
		Flash.prototype._fadeTimer = 0.0;
		Flash.prototype._fadeDuration = 0.7;

		return Flash;
	});