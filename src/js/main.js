if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Main
 * ===================================*/
define([
        "playgroundjs/game",
		"worlds/sandbox"
    ]
	, function (Game, Sandbox)
    {
        // Game Parameters
        var game = new Game("container", 800, 600, "#333");
        game.debug = true;

		game.world = new Sandbox;
        game.start();
	});