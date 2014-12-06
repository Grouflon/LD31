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
		PlatformerMover.prototype.speed = 300.0;
		PlatformerMover.prototype.jumpImpulse = 1600.0;
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
			this._onGround = false;
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
			var xDiff = this._velocity.x * elapsed;
			var yDiff = this._velocity.y * elapsed;
			var x = this._parent.x + xDiff;
			var y = this._parent.y + yDiff;
			var AABB = this.parent.collisionGlobalAABB;
			AABB.min.x += xDiff;
			AABB.min.y += yDiff;
			AABB.max.x += xDiff;
			AABB.max.y += yDiff;

			var collisionX = false;
			var collisionY = false;

			var collision;
			var collisionAABB;

			while (collision = this.parent.collideFirst(x, null, this.collideTypes))
			{
				collisionAABB = collision.collisionGlobalAABB;
				x += xDiff >= 0 ? collisionAABB.min.x - AABB.max.x : collisionAABB.max.x - AABB.min.x;
				collisionX = true;
			}
			if (collisionX) this._collideX(MathFunctions.sign(xDiff));
			this.parent.translateTo(x, this.parent.y);

			while (collision = this.parent.collideFirst(null, y, this.collideTypes))
			{
				collisionAABB = collision.collisionGlobalAABB;
				y += yDiff >= 0 ? collisionAABB.min.y - AABB.max.y : collisionAABB.max.y - AABB.min.y;
				collisionY = true;
			}
			if (collisionY) this._collideY(MathFunctions.sign(yDiff));
			this.parent.translateTo(this.parent.x, y);
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
			//	CALCULATING DESIRED VELOCITY
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
			if (this._jump && this._onGround) this._velocity.y -= this.jumpImpulse;
			this._velocity.y += this.gravity * elapsed;
		};

		PlatformerMover.prototype._left = false;
		PlatformerMover.prototype._right = false;
		PlatformerMover.prototype._jump = false;
		PlatformerMover.prototype._onGround = false;
		PlatformerMover.prototype._velocity = null;


		return PlatformerMover;
	});