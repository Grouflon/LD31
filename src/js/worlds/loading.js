if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Loading world
 * ===================================*/
define([
		"playgroundjs/world",
		"playgroundjs/resources",
		"playgroundjs/graphics/rectangle",
		"playgroundjs/graphics/text",
		"levelmanager"
	]
	, function (World, Resources, Rectangle, Text, LevelManager)
	{
		Loading.prototype = Object.create(World.prototype);
		/**** PUBLIC ****/

		function Loading()
		{
			World.call(this, "Loading");
		}

		Loading.prototype.begin = function()
		{
			this.addChild(new Rectangle(this.game.width, this.game.height, "#000"));
			this._text = new Text("Loading...", "#fff");
			this._text.x = this.game.width / 2 - this._text.width / 2;
			this._text.y = this.game.height / 2 - this._text.height / 2;
			this.addChild(this._text);
		};

		Loading.prototype.update = function(elapsed)
		{
			if (Resources.allResourcesLoaded) LevelManager.setLevel(0);
		};

		/**** PRIVATE ****/
		Loading.prototype._text = null;

		return Loading;
	});