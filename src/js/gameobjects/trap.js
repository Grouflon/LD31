if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Obstacle GameObject
 * ===================================*/
define([
		"playgroundjs/gameobject",
		"playgroundjs/graphics/sprite",
		"playgroundjs/colliders/aabbcollider",
		"playgroundjs/resources"
	]
	, function (GameObject, Sprite, AABBCollider, Resources)
	{
		Obstacle.prototype = Object.create(GameObject.prototype);
		/**** PUBLIC ****/

		function Obstacle(x, y)
		{
			GameObject.call(this, "Obstacle", x, y);

			var sprite = new Sprite(Resources.get("tileset").value, 36, 36);
			sprite.setFrame(8);
			this.addChild(sprite);
			this.addChild(new AABBCollider(36, 36, 0, 0, "trap"));
		}

		return Obstacle;
	});