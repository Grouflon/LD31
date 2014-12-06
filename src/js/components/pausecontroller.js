if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * PauseController Component
 * ===================================*/
define([
		"playgroundjs/component",
		"playgroundjs/gameobject",
		"playgroundjs/input/keyboard",
		"playgroundjs/utils/keys",
		"playgroundjs/graphics/rectangle",
		"playgroundjs/graphics/text",
		"levelmanager",
		"events"
	]
	, function (Component, GameObject, Keyboard, Keys, Rectangle, Text, LevelManager, Events)
	{
		PauseController.prototype = Object.create(Component.prototype);

		/**** PUBLIC ****/
		function PauseController()
		{
			Component.call(this, "PauseController");


		}

		PauseController.prototype.start = function()
		{
			this._graphicsContainer = new GameObject("PauseMenuContainer");
			this._graphicsContainer.enabled = false;
			this.parent.addChild(this._graphicsContainer);

			var overlay = new Rectangle(this.parent.game.width, this.parent.game.height, "#000");
			overlay.alpha = 0.7;
			overlay.layer = 100;

			this._menuItems = [
				new Text("CONTINUE", "#fff"),
				new Text("RESTART", "#fff")
			];

			for (var i in this._menuItems)
			{
				this._menuItems[i].x = this.parent.game.width / 2 - this._menuItems[i].width / 2;
				this._menuItems[i].y = this.parent.game.height / 2 - 50 + 50 * i;
				this._menuItems[i].layer = 101;
				this._graphicsContainer.addChild(this._menuItems[i]);
			}

			this._graphicsContainer.addChild(overlay);
		};

		PauseController.prototype.update = function(elapsed)
		{
			this._graphicsContainer.translateTo(this.parent.camera.x, this.parent.camera.y);
			if (Keyboard.pressed(Keys.ESCAPE)) this.togglePause();

			if (this._pause)
			{
				if (Keyboard.pressed(Keys.UP) || Keyboard.pressed(Keys.W)) this._currentMenuItem = (this._currentMenuItem + this._menuItems.length - 1) % this._menuItems.length;
				if (Keyboard.pressed(Keys.DOWN) || Keyboard.pressed(Keys.S)) this._currentMenuItem = (this._currentMenuItem + this._menuItems.length + 1) % this._menuItems.length;

				for (var i in this._menuItems)
				{
					if (i == this._currentMenuItem) this._menuItems[i].color = "#fff";
					else this._menuItems[i].color = "#aaa";
				}
			}
		};

		PauseController.prototype.togglePause = function()
		{
			if (this._pause) this.deactivatePause();
			else this.activatePause();
		};

		PauseController.prototype.activatePause = function()
		{
			this._graphicsContainer.enabled = true;
			this._pause = true;
			this._currentMenuItem = 0;
			Events.sGameEnterPause.dispatch();
		};

		PauseController.prototype.deactivatePause = function()
		{
			this._graphicsContainer.enabled = false;
			this._pause = false;
			Events.sGameExitPause.dispatch();
		};

		/**** PRIVATE ****/
		PauseController.prototype._pause = false;
		PauseController.prototype._graphicsContainer = null;
		PauseController.prototype._menuItems = null;
		PauseController.prototype._currentMenuItem = 0;

		return PauseController;
	});