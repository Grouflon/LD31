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
		"worlds/loading"
    ]
	, function (Game, Resources, Sandbox, Loading)
    {
        // Game Parameters
        var game = new Game("container", 600, 600, "#333");
        game.debug = true;

		/*var xml = Resources.loadXML("level0", "data/maps/level0.oel", function()
		{
			game.world = new Level(xml.value);
		});*/

		game.world = new Loading();
        game.start();
	});