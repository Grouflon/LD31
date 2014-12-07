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

		/**** PUBLIC ****/
		function GameController()
		{
			Component.call(this, "GameController");
			Events.sPlayerDead.addOnce(this._onPlayerDead.bind(this));
			Events.sPlayerExit.addOnce(this._onPlayerExit.bind(this));
			Events.sGameEnterPause.add(this._onEnterPause.bind(this));
			Events.sGameExitPause.add(this._onExitPause.bind(this));
		}

		GameController.prototype.start = function()
		{

		};

		GameController.prototype.update = function(elapsed)
		{

		};

		/**** PRIVATE ****/

		GameController.prototype._onEnterPause = function(game)
		{
			this.parent.game.timeScale = 0.0;
		};

		GameController.prototype._onExitPause = function(game)
		{
			this.parent.game.timeScale = 1.0;
		};

		GameController.prototype._onPlayerDead = function()
		{
			LevelManager.restartLevel();
		};

		GameController.prototype._onPlayerExit = function()
		{
			LevelManager.nextLevel();
		};



		return GameController;
	});