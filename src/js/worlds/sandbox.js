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
			var player = new Player(this.game.width / 2, this.game.height / 2 - 100);
			this.addChild(player);

			var o0 = new Obstacle(0, 400, 350, 20);
			var o1 = new Obstacle(450, 400, 350, 20);
			this.addChild(o0);
			this.addChild(o1);
			//this.addChild(o2);
		};

		Sandbox.prototype.update = function(elapsed)
		{
			//console.log(this.activeColliders.length);
		};

		return Sandbox;
	});