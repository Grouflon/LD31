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
		"worlds/level"
	]
	, function (World, Resources, Rectangle, Text, Level)
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

			Resources.loadXML("level", "data/maps/level0.oel", this._resourceLoaded.bind(this));
			Resources.loadImage("tileset", "images/tileset.png", this._resourceLoaded.bind(this));
		};

		Loading.prototype.update = function(elapsed)
		{

		};

		/**** PRIVATE ****/

		Loading.prototype._resourceLoaded = function()
		{
			this._loadedResourcesCount++;
			if (this._loadedResourcesCount == Loading.prototype._totalResourcesCount)
			{
				this.game.world = new Level(Resources.get("level").value);
			}
		};

		Loading.prototype._text = null;
		Loading.prototype._totalResourcesCount = 2;
		Loading.prototype._loadedResourcesCount = 0;

		return Loading;
	});