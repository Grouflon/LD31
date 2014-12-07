if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * CameraTracking Component
 * ===================================*/
define([
		"playgroundjs/component",
		"playgroundjs/utils/math/vector2"
	]
	, function (Component, Vector2)
	{
		CameraTracking.prototype = Object.create(Component.prototype);

		/**** PUBLIC ****/
		CameraTracking.prototype.acceleration = 0.15;
		CameraTracking.prototype.offset = 60;

		function CameraTracking()
		{
			Component.call(this, "CameraTracking");
		}

		CameraTracking.prototype.start = function()
		{
			var levelWidth = this.parent.world.levelWidth;
			var levelHeight = this.parent.world.levelHeight;
			var viewportWidth = this.parent.game.width;
			var viewportHeight = this.parent.game.height;

			var camera = new Vector2(this._parent.x - this.parent.game.width / 2, this._parent.y - this.parent.game.height / 2);
			camera.x = Math.min(Math.max(camera.x, 0), levelWidth - viewportWidth);
			camera.y = Math.min(Math.max(camera.y, 0), levelHeight - viewportHeight);
			this.parent.world.setCamera(camera.x, camera.y);
		};

		CameraTracking.prototype.update = function(elapsed)
		{
			var levelWidth = this.parent.world.levelWidth;
			var levelHeight = this.parent.world.levelHeight;
			var viewportWidth = this.parent.game.width;
			var viewportHeight = this.parent.game.height;
			var camera = this.parent.world.camera;
			var desiredCamera = new Vector2;
			desiredCamera.x = this._parent.x - viewportWidth / 2 + this.offset * this.parent.facing;
			desiredCamera.y = this._parent.y - viewportHeight / 2;
			desiredCamera.x = Math.min(Math.max(desiredCamera.x, 0), levelWidth - viewportWidth);
			desiredCamera.y = Math.min(Math.max(desiredCamera.y, 0), levelHeight - viewportHeight);

			camera.x = desiredCamera.x * this.acceleration + camera.x * (1 - this.acceleration);
			camera.y = desiredCamera.y * this.acceleration + camera.y * (1 - this.acceleration);
			this.parent.world.setCamera(camera.x, camera.y);
		};

		/**** PRIVATE ****/

		return CameraTracking;
	});