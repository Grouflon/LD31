if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * PlatformerMover Component
 * ===================================*/
define([
		"playgroundjs/component",
		"playgroundjs/utils/math/vector2",
		"playgroundjs/utils/math/mathfunc"
	]
	, function (Component, Vector2, MathFunctions)
	{
		PlatformerMover.prototype = Object.create(Component.prototype);

		/**** PUBLIC ****/
		PlatformerMover.prototype.gravity = 1600.0;
		PlatformerMover.prototype.speed = 200.0;
		PlatformerMover.prototype.jumpImpulse = 550.0;
		PlatformerMover.prototype.acceleration = 0.4;
		PlatformerMover.prototype.deceleration = 0.8;
		PlatformerMover.prototype.stopThreshold = 0.1;
		PlatformerMover.prototype.collideTypes = null;

		function PlatformerMover()
		{
			Component.call(this, "PlatformerMover");

			this._velocity = new Vector2;
		}

		PlatformerMover.prototype.update = function(elapsed)
		{
			this._computeVelocity(elapsed);
			this._moveCollide(elapsed);
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

		PlatformerMover.prototype._moveCollide = function(elapsed)
		{
			var rawXDiff = this._velocity.x * elapsed + this._deltaX;
			var rawYDiff = this._velocity.y * elapsed + this._deltaY;
			var xDiff = Math.floor(rawXDiff);
			var yDiff = Math.floor(rawYDiff);
			this._deltaX = rawXDiff - xDiff;
			this._deltaY = rawYDiff - yDiff;

			var dirX = MathFunctions.sign(xDiff);
			var dirY = MathFunctions.sign(yDiff);
			var startX = this._parent.x;
			var startY = this._parent.y;
			var endX = startX + xDiff;
			var endY = startY + yDiff;

			var collisionX = false;
			var collisionY = false;

			while (dirX != 0 && this.parent.collideFirst(endX, null, this.collideTypes))
			{
				endX -= dirX;
				collisionX = true;
			}
			if (collisionX) this._collideX(dirX);
			this.parent.translateTo(endX, this.parent.y);

			while (dirY != 0 && this.parent.collideFirst(null, endY, this.collideTypes))
			{
				endY -= dirY;
				collisionY = true;
			}
			if (collisionY) this._collideY(dirY);
			this.parent.translateTo(this.parent.x, endY);

			//this.parent._repeater.update(elapsed);
		};

		PlatformerMover.prototype._collideX = function(direction)
		{
			this._velocity.x = 0;
		};

		PlatformerMover.prototype._collideY = function(direction)
		{
			if (direction > 0) this._onGround = true;
			this._velocity.y = 0;
		};

		PlatformerMover.prototype._computeVelocity = function(elapsed)
		{
			//	CALCULATING DESIRED VELOCITYa
			var desiredVelocity = new Vector2;
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
			if (Math.abs(this._velocity.x) <= this.stopThreshold) this._velocity.x = 0.0;

			// RESOLVING Y
			if (this._jump && this._onGround)
			{
				this._velocity.y -= this.jumpImpulse;
				this._onGround = false;
			}
			this._velocity.y += this.gravity * elapsed;
		};

		PlatformerMover.prototype._deltaX = 0.0;
		PlatformerMover.prototype._deltaY = 0.0;
		PlatformerMover.prototype._left = false;
		PlatformerMover.prototype._right = false;
		PlatformerMover.prototype._jump = false;
		PlatformerMover.prototype._onGround = false;
		PlatformerMover.prototype._velocity = null;


		return PlatformerMover;
	});