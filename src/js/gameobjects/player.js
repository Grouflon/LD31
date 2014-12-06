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
		"components/platformermover",
		"components/repeater",
		"components/cameratracking"
	]
	, function (GameObject, Rectangle, AABBCollider, Keyboard, Keys, PlatformerMover, Repeater, CameraTracking)
	{
		Player.prototype = Object.create(GameObject.prototype);
		/**** PUBLIC ****/

		function Player(x, y)
		{
			GameObject.call(this, "Player", x, y);

			var clonePattern = function(x, y, target)
			{
				var elements = [
					new Rectangle(20, 40, "#fff", x - 10, y - 40),
					new AABBCollider(20, 40, x - 10, y - 40, "player")
				];
				target.addChild(elements[0]);
				target.addChild(elements[1]);
				return elements;
			};

			clonePattern(0, 0, this);

			this._mover = new PlatformerMover();
			this._mover.collideTypes = "solid";
			this.addChild(this._mover);

			this._repeater = new Repeater(clonePattern);
			this._repeater.enabled = false;
			this.addChild(this._repeater);

			this._cameraTracking = new CameraTracking();
			this.addChild(this._cameraTracking);
		}

		Player.prototype.update = function(elapsed)
		{
			if (Keyboard.check(Keys.LEFT) || Keyboard.check(Keys.A)) this._mover.moveLeft();
			if (Keyboard.check(Keys.RIGHT) || Keyboard.check(Keys.D)) this._mover.moveRight();
			if (Keyboard.pressed(Keys.UP) || Keyboard.pressed(Keys.W)) this._mover.jump();
			if (Keyboard.pressed(Keys.SPACE)) this.togglePower();

		};

		Player.prototype.togglePower = function()
		{
			this._repeater.enabled = !this._repeater.enabled;
			this._cameraTracking.enabled = !this._cameraTracking.enabled;
		};

		/**** PRIVATE ****/
		Player.prototype._mover = null;
		Player.prototype._repeater = null;
		Player.prototype._cameraTracking = null;

		return Player;
	});