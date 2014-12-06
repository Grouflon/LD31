if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Main
 * ===================================*/
define([
        "playgroundjs/game",
		"playgroundjs/resources",
		"worlds/sandbox",
		"worlds/loading",
		"levelmanager"
    ]
	, function (Game, Resources, Sandbox, Loading, LevelManager)
    {
        // Game Parameters
        var game = new Game("container", 600, 600, "#333");
        game.debug = true;
		Resources.loadImage("tileset", "images/tileset.png");
		LevelManager.init(game);

		game.world = new Loading();
        game.start();
	});