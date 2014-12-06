if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Player GameObject
 * ===================================*/
define([
		"playgroundjs/gameobject",
		"playgroundjs/graphics/rectangle",
		"playgroundjs/colliders/aabbcollider",
		"playgroundjs/input/keyboard",
		"playgroundjs/utils/keys",
		"components/platformermover"
	]
	, function (GameObject, Rectangle, AABBCollider, Keyboard, Keys, PlatformerMover)
	{
		Player.prototype = Object.create(GameObject.prototype);
		/**** PUBLIC ****/

		function Player(x, y)
		{
			GameObject.call(this, "Player", x, y);

			this.addChild(new Rectangle(20, 40, "#fff", -10, -40));
			this.addChild(new AABBCollider(20, 40, -10, -40, "player"));

			this._mover = new PlatformerMover();
			this._mover.collideTypes = "solid";
			this.addChild(this._mover);
		}

		Player.prototype.update = function(elapsed)
		{
			if (Keyboard.check(Keys.LEFT) || Keyboard.check(Keys.A)) this._mover.moveLeft();
			if (Keyboard.check(Keys.RIGHT) || Keyboard.check(Keys.D)) this._mover.moveRight();
			if (Keyboard.pressed(Keys.SPACE)) this._mover.jump();
		};

		/**** PRIVATE ****/
		Player.prototype._mover = null;

		return Player;
	});