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
        var game = new Game("container", 600, 600, "#501c41");
        game.debug = true;
		Resources.loadImage("tileset", "images/tileset.png");
		Resources.loadImage("bot_sprite", "images/bot_sprite.png");
		Resources.loadImage("door", "images/door.png");
		Resources.loadImage("start_screen", "images/splash_screen.png");
		Resources.loadImage("end_screen", "images/end_screen.png");
		LevelManager.init(game, Level);
		game._canvas.style.setProperty("background", "linear-gradient(to bottom, #501c41 0%,#263332 85%)");

		game.world = new Loading();
        game.start();
	});