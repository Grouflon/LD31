if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Sandbox world
 * ===================================*/
define([
		"playgroundjs/world",
		"gameobjects/player",
		"gameobjects/obstacle"
	]
	, function (World, Player, Obstacle)
	{
		Sandbox.prototype = Object.create(World.prototype);
		/**** PUBLIC ****/

		function Sandbox()
		{
			World.call(this, "Sandbox");
		}

		Sandbox.prototype.begin = function()
		{
			var player = new Player(this.game.width / 2, this.game.height / 2);
			this.addChild(player);

			var o0 = new Obstacle(100, 400, 500, 20);
			this.addChild(o0);
		};

		return Sandbox;
	});