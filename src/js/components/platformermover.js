if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * PlatformerMover Component
 * ===================================*/
define([
		"playgroundjs/component",
		"playgroundjs/utils/math/vector2"
	]
	, function (Component, Vector2)
	{
		PlatformerMover.prototype = Object.create(Component.prototype);

		/**** PUBLIC ****/
		PlatformerMover.prototype.gravity = 100.0;
		PlatformerMover.prototype.speed = 500.0;
		PlatformerMover.prototype.jumpImpulse = 1000.0;
		PlatformerMover.prototype.acceleration = 0.5;
		PlatformerMover.prototype.deceleration = 0.3;
		PlatformerMover.prototype.stopThreshold = 0.1;

		function PlatformerMover()
		{
			Component.call(this, "PlatformerMover");

			this._velocity = new Vector2;
		}

		PlatformerMover.prototype.update = function(elapsed)
		{
			var desiredVelocity = new Vector2;

			//	CALCULATING DESIRED VELOCITY
			if (this._left) desiredVelocity.x -= 1.0;
			if (this._right) desiredVelocity.x += 1.0;
			desiredVelocity.multiply(this.speed);

			// RESOLVING X
			if (Math.abs(desiredVelocity.x) > 0)
			{
				this._velocity.x = this.acceleration * desiredVelocity.x + this._velocity.x * (1.0 - this.acceleration);
			}
			else
			{
				this._velocity.x *= (1 - this.deceleration);
			}

			// RESOLVING Y
			this._velocity.y += this.gravity * elapsed;

			this.parent.x += this._velocity.x * elapsed;
			this.parent.y += this._velocity.y * elapsed;

			this._resetInput();
		};

		PlatformerMover.prototype.moveLeft = function() { this._left = true; };
		PlatformerMover.prototype.moveRight = function() { this._right = true; };
		PlatformerMover.prototype.jump = function() { this._jump = true; };

		/**** PRIVATE ****/

		PlatformerMover.prototype._resetInput = function()
		{
			this._left = false;
			this._right = false;
			this._jump = false;
		};

		PlatformerMover.prototype._left = false;
		PlatformerMover.prototype._right = false;
		PlatformerMover.prototype._jump = false;
		PlatformerMover.prototype._velocity = null;


		return PlatformerMover;
	});