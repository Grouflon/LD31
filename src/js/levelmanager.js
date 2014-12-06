if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Level Manager
 * ===================================*/
define([
		"playgroundjs/resources"
	]
	, function (Resources)
	{
		return {

			init: function(game, Level)
			{
				this._game = game;
				this._Level = Level;

				for (var i in this._levels)
				{
					Resources.loadXML("level" + i, this._levels[i]);
				}
			},

			restartLevel: function()
			{
				this.setLevel(this._currentLevel);
			},

			setLevel: function(index)
			{
				this._game.world = new this._Level(Resources.get ("level" + (index % this._levels.length)).value);
			},

			nextLevel: function()
			{
				this.setLevel(this._currentLevel + 1);
			},

			/**** PRIVATE ****/

			_Level: null,
			_levels: [
				"data/maps/level0.oel"
			],
			_currentLevel: 0,
			_game: null
		};
	});