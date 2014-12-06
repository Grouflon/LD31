if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Level Manager
 * ===================================*/
define([
		"playgroundjs/resources",
		"worlds/level"
	]
	, function (Resources, Level)
	{
		return {

			init: function(game)
			{
				this._game = game;

				for (var i in this._levels)
				{
					Resources.loadXML("level" + i, this._levels[i]);
				}
			},

			setLevel: function(index)
			{
				this._game.world = new Level(Resources.get ("level" + (index % this._levels.length)).value);
			},

			nextLevel: function()
			{
				this.setLevel(this._currentLevel + 1);
			},

			/**** PRIVATE ****/

			_levels: [
				"data/maps/level0.oel"
			],
			_currentLevel: 0,
			_game: null
		}
	});