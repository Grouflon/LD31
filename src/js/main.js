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
		"levelmanager",
		"worlds/level"
    ]
	, function (Game, Resources, Sandbox, Loading, LevelManager, Level)
    {
        // Game Parameters
        var game = new Game("container", 600, 600, "#333");
        game.debug = true;
		Resources.loadImage("tileset", "images/tileset.png");
		LevelManager.init(game, Level);

		game.world = new Loading();
        game.start();
	});