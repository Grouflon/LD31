if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Level Manager
 * ===================================*/
define([
		"playgroundjs/resources",
		"worlds/endscreen"
	]
	, function (Resources, EndScreen)
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
				if (index >= this._levels.length) this._game.world = new EndScreen;
				else
				{
					this._game.world = new this._Level(Resources.get ("level" + (index % this._levels.length)).value);
					this._currentLevel = index;
				}
			},

			nextLevel: function()
			{
				this.setLevel(this._currentLevel + 1);
			},

			/**** PRIVATE ****/

			_Level: null,
			_levels: [
				"data/maps/level0.oel",
				"data/maps/level1.oel",
				"data/maps/level2.oel",
				"data/maps/level3.oel",
				"data/maps/level4.oel"
			],
			_currentLevel: 0,
			_game: null
		};
	});