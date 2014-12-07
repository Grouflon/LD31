if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Obstacle GameObject
 * ===================================*/
define([
		"playgroundjs/gameobject",
		"playgroundjs/graphics/image",
		"playgroundjs/graphics/rectangle",
		"playgroundjs/colliders/aabbcollider",
		"playgroundjs/resources"
	]
	, function (GameObject, Image, Rectangle, AABBCollider, Resources)
	{
		Obstacle.prototype = Object.create(GameObject.prototype);
		/**** PUBLIC ****/

		function Obstacle(x, y)
		{
			GameObject.call(this, "Obstacle", x, y);

			this.addChild(new Image(Resources.get("door").value, -66, 12));
			this.addChild(new AABBCollider(30, 60, -30, 12, "exit"));
		}

		return Obstacle;
	});