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
		"worlds/level"
    ]
	, function (Game, Resources, Sandbox, Level)
    {
        // Game Parameters
        var game = new Game("container", 800, 600, "#333");
        game.debug = true;

		var xml = Resources.loadXML("level0", "data/maps/level0.oel", function()
		{
			game.world = new Level(xml.value);
		});

        game.start();
	});