if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Player GameObject
 * ===================================*/
define([
		"playgroundjs/gameobject",
		"playgroundjs/graphics/sprite",
		"playgroundjs/graphics/text",
		"playgroundjs/colliders/aabbcollider",
		"playgroundjs/input/keyboard",
		"playgroundjs/utils/keys",
		"playgroundjs/resources",
		"components/platformermover",
		"components/repeater",
		"components/cameratracking",
		"events"
	]
	, function (GameObject, Sprite, Text, AABBCollider, Keyboard, Keys, Resources, PlatformerMover, Repeater, CameraTracking, Events)
	{
		Player.prototype = Object.create(GameObject.prototype);
		/**** PUBLIC ****/

		Object.defineProperty(Player.prototype, "facing", {
			get: function() { return this._facing; }
		});

		Player.prototype.hasPower = true;

		function Player(x, y)
		{
			GameObject.call(this, "Player", x, y);

			this._sprites = [];

			var clonePattern = function(x, y, target)
			{
				var elements = [
					new Sprite(Resources.get("bot_sprite").value , 33, 48, x - 16, y - 48),
					new AABBCollider(28, 48, x - 14, y - 48, "player")
				];

				this._sprites.push(elements[0]);
				elements[0].addAnim("idleRight", [0, 1, 2, 3], 10, true);
				elements[0].addAnim("walkRight", [4, 5, 6, 7], 10, true);
				elements[0].addAnim("idleLeft", [8, 9, 10, 11], 10, true);
				elements[0].addAnim("walkLeft", [12, 13, 14, 15], 10, true);
				elements[0].layer = 5;

				target.addChild(elements[0]);
				target.addChild(elements[1]);
				return elements;
			};

			clonePattern.bind(this)(0, 0, this);

			this._mover = new PlatformerMover();
			this._mover.collideTypes = "solid";
			this.addChild(this._mover);

			this._repeater = new Repeater(clonePattern.bind(this));
			this._repeater.enabled = false;
			this.addChild(this._repeater);

			this._cameraTracking = new CameraTracking();
			this.addChild(this._cameraTracking);

			this._speechText = new Text("", "#fff", 15);
			this._speechText.layer = 6;
			this._speechText.visible = false;
			this.addChild(this._speechText);

			this._boundOnEnterPause = Events.sGameEnterPause.add(this._onEnterPause.bind(this));
			this._boundOnExitPause = Events.sGameExitPause.add(this._onExitPause.bind(this));
		}

		Player.prototype.start = function()
		{
			this._spritesPlayAnim("idle");
		};

		Player.prototype.update = function(elapsed)
		{
			if (this._paused) return;

			if (Keyboard.check(Keys.LEFT) || Keyboard.check(Keys.A)) this._mover.moveLeft();
			if (Keyboard.check(Keys.RIGHT) || Keyboard.check(Keys.D)) this._mover.moveRight();
			if (Keyboard.pressed(Keys.UP) || Keyboard.pressed(Keys.W)) this._mover.jump();
			if (Keyboard.pressed(Keys.SPACE)) this.togglePower();

			if (this._mover._velocity.x > 0) this._facing = 1;
			else if (this._mover._velocity.x < 0) this._facing = -1;

			var side = this._facing == 1 ? "Right" : "Left"
			if (this._mover._velocity.x == 0) this._spritesPlayAnim("idle" + side);
			else this._spritesPlayAnim("walk" + side);

			if (this.collideFirst(this.x, this.y, "trap")) { this.die(); }
			if (this.collideFirst(this.x, this.y, "exit")) { this.exit(); }

			// SPEECH
			var speech;
			this._speechText.visible = false;
			if (speech = this.collideFirst(this.x, this.y, "speech")) { this.speech(speech.value); }
		};

		Player.prototype.togglePower = function()
		{
			if (this.hasPower)
			{
				this._repeater.enabled = !this._repeater.enabled;
				this._cameraTracking.enabled = !this._cameraTracking.enabled;
			}
		};

		Player.prototype.speech = function(value)
		{
			this._speechText.visible = true;
			this._speechText.text = value;
			this._speechText.y = - this._sprites[0].height - this._speechText.height + 8;
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

		Player.prototype._spritesPlayAnim = function(name)
		{
			for (var i in this._sprites)
			{
				this._sprites[i].play(name);
			}
		};

		Player.prototype._speechText = null;
		Player.prototype._sprites = null;
		Player.prototype._paused = false;
		Player.prototype._facing = 1;
		Player.prototype._mover = null;
		Player.prototype._repeater = null;
		Player.prototype._cameraTracking = null;

		Player.prototype._boundOnEnterPause = null;
		Player.prototype._boundOnExitPause = null;

		return Player;
	});