if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Sandbox world
 * ===================================*/
define([
		"playgroundjs/world",
		"gameobjects/player"
	]
	, function (World, Player)
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
		};

		return Sandbox;
	});