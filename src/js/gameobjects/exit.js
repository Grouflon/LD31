if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Obstacle GameObject
 * ===================================*/
define([
		"playgroundjs/gameobject",
		"playgroundjs/graphics/rectangle",
		"playgroundjs/colliders/aabbcollider"
	]
	, function (GameObject, Rectangle, AABBCollider)
	{
		Obstacle.prototype = Object.create(GameObject.prototype);
		/**** PUBLIC ****/

		function Obstacle(x, y)
		{
			GameObject.call(this, "Obstacle", x, y);

			this.addChild(new Rectangle(32, 64, "#0ff", -16, 0));
			this.addChild(new AABBCollider(32, 64, -16, 0, "exit"));
		}

		return Obstacle;
	});