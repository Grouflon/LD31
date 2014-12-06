if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * CameraTracking Component
 * ===================================*/
define([
		"playgroundjs/component"
	]
	, function (Component)
	{
		CameraTracking.prototype = Object.create(Component.prototype);

		CameraTracking.prototype.acceleration = 0.2;

		/**** PUBLIC ****/
		function CameraTracking()
		{
			Component.call(this, "CameraTracking");
		}

		CameraTracking.prototype.start = function()
		{

		};

		CameraTracking.prototype.update = function(elapsed)
		{
			var camera = this.parent.world.camera;
			camera.x = (this._parent.x - this.parent.game.width / 2) * this.acceleration + camera.x * (1 - this.acceleration);
			camera.y = (this._parent.y - this.parent.game.height / 2) * this.acceleration + camera.y * (1 - this.acceleration);
			this.parent.world.setCamera(camera.x, camera.y);
		};

		/**** PRIVATE ****/

		return CameraTracking;
	});