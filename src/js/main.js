if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Main
 * ===================================*/
define([
        "playgroundjs/game"
    ]
	, function (Game)
    {
        // Game Parameters
        var game = new Game("container", 800, 600, "#000");
        game.debug = true;
        game.start();
	});