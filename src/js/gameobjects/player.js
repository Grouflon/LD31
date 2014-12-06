if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Player GameObject
 * ===================================*/
define([
		"playgroundjs/gameobject",
		"playgroundjs/graphics/rectangle"
	]
	, function (GameObject, Rectangle)
	{
		Player.prototype = Object.create(GameObject.prototype);
		/**** PUBLIC ****/

		function Player(x, y)
		{
			GameObject.call(this, "Player", x, y);

			this.addChild(new Rectangle(20, 40, "#fff", -10, -40));
		}

		return Player;
	});