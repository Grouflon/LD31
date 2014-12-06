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

		function Obstacle(x, y, width, height)
		{
			GameObject.call(this, "Obstacle", x, y);

			this.addChild(new Rectangle(width, height, "#003"));
			this.addChild(new AABBCollider(width, height, 0, 0, "solid"));
		}

		return Obstacle;
	});