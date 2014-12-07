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
		"components/cameratracking",
		"events"
	]
	, function (GameObject, Rectangle, AABBCollider, Keyboard, Keys, PlatformerMover, Repeater, CameraTracking, Events)
	{
		Player.prototype = Object.create(GameObject.prototype);
		/**** PUBLIC ****/

		Object.defineProperty(Player.prototype, "facing", {
			get: function() { return this._facing; }
		});

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

			this._boundOnEnterPause = Events.sGameEnterPause.add(this._onEnterPause.bind(this));
			this._boundOnExitPause = Events.sGameExitPause.add(this._onExitPause.bind(this));
		}

		Player.prototype.update = function(elapsed)
		{
			if (this._paused) return;

			if (Keyboard.check(Keys.LEFT) || Keyboard.check(Keys.A)) this._mover.moveLeft();
			if (Keyboard.check(Keys.RIGHT) || Keyboard.check(Keys.D)) this._mover.moveRight();
			if (Keyboard.pressed(Keys.UP) || Keyboard.pressed(Keys.W)) this._mover.jump();
			if (Keyboard.pressed(Keys.SPACE)) this.togglePower();

			if (this._mover._velocity.x > 0) this._facing = 1;
			else if (this._mover._velocity.x < 0) this._facing = -1;

			if (this.collideFirst(this.x, this.y, "trap")) { this.die(); }
			if (this.collideFirst(this.x, this.y, "exit")) { this.exit(); }
		};

		Player.prototype.togglePower = function()
		{
			this._repeater.enabled = !this._repeater.enabled;
			this._cameraTracking.enabled = !this._cameraTracking.enabled;
		};

		Player.prototype.die = function()
		{
			Events.sPlayerDead.dispatch();
			this.destroy();
		};

		Player.prototype.destroyed = function()
		{
			Events.sGameEnterPause.remove(this._boundOnEnterPause._listener);
			Events.sGameExitPause.remove(this._boundOnExitPause._listener);
		};

		Player.prototype.exit = function()
		{
			Events.sPlayerExit.dispatch();
			this.destroy();
		};

		/**** PRIVATE ****/

		Player.prototype._onEnterPause = function()
		{
			this._paused = true;
		};

		Player.prototype._onExitPause = function()
		{
			this._paused = false;
		};

		Player.prototype._paused = false;
		Player.prototype._facing = 1;
		Player.prototype._mover = null;
		Player.prototype._repeater = null;
		Player.prototype._cameraTracking = null;

		Player.prototype._boundOnEnterPause = null;
		Player.prototype._boundOnExitPause = null;

		return Player;
	});