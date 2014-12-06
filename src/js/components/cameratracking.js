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

		CameraTracking.prototype.acceleration = 0.15;
		CameraTracking.prototype.offset = 60;

		/**** PUBLIC ****/
		function CameraTracking()
		{
			Component.call(this, "CameraTracking");
		}

		CameraTracking.prototype.start = function()
		{
			this.parent.world.setCamera(this._parent.x - this.parent.game.width / 2, this._parent.y - this.parent.game.height / 2);
		};

		CameraTracking.prototype.update = function(elapsed)
		{
			var camera = this.parent.world.camera;
			var desiredCamera = new Vector2;
			desiredCamera.x = this._parent.x - this.parent.game.width / 2 + this.offset * this.parent.facing;
			desiredCamera.y = this._parent.y - this.parent.game.height / 2;
			camera.x = desiredCamera.x * this.acceleration + camera.x * (1 - this.acceleration);
			camera.y = desiredCamera.y * this.acceleration + camera.y * (1 - this.acceleration);
			this.parent.world.setCamera(camera.x, camera.y);
		};

		/**** PRIVATE ****/

		return CameraTracking;
	});