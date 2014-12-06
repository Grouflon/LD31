if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * GameController Component
 * ===================================*/
define([
		"playgroundjs/component",
		"levelmanager",
		"events"
	]
	, function (Component, LevelManager, Events )
	{
		GameController.prototype = Object.create(Component.prototype);
		GameController.prototype.acceleration = 0.15;
		GameController.prototype.offset = 60;

		/**** PUBLIC ****/
		function GameController()
		{
			Component.call(this, "GameController");
			Events.sPlayerDead.addOnce(this._onPlayerDead.bind(this))
		}

		GameController.prototype.start = function()
		{

		};

		GameController.prototype.update = function(elapsed)
		{

		};

		/**** PRIVATE ****/

		GameController.prototype._onPlayerDead = function()
		{
			LevelManager.restartLevel();
		};

		return GameController;
	});