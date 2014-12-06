if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Level world
 * ===================================*/
define([
		"playgroundjs/world",
		"gameobjects/player",
		"gameobjects/obstacle"
	]
	, function (World, Player, Obstacle)
	{
		Level.prototype = Object.create(World.prototype);
		/**** PUBLIC ****/

		function Level(levelData)
		{
			World.call(this, levelData.nodeName);
			this._data = levelData;
		}

		Level.prototype.begin = function()
		{
			this._generateLevel(this._data);
			/*var player = new Player(this.game.width / 2 - 200, this.game.height / 2 - 100);
			this.addChild(player);

			var o0 = new Obstacle(0, 400, 350, 20);
			var o1 = new Obstacle(450, 400, 350, 20);
			this.addChild(o0);
			this.addChild(o1);*/
		};

		Level.prototype.update = function(elapsed)
		{
			//console.log(this.activeColliders.length);
		};

		/**** PRIVATE ****/

		Level.prototype._generateLevel = function(node)
		{
			for (var i in node.childNodes)
			{
				switch (node.childNodes[i].nodeName)
				{
					case "terrain":
					{
						this._generateTerrain(node.childNodes[i]);
						break;
					}

					case "entities":
					{
						this._generateEntities(node.childNodes[i]);
						break;
					}

					default: break;
				}
			}
		};

		Level.prototype._generateTerrain = function(node)
		{
			var tile;
			for (var i in node.childNodes)
			{
				tile = node.childNodes[i];
				this.addChild(new Obstacle(this._tileSize * tile.x, this._tileSize * tile.y, this._tileSize, this._tileSize));
			}
		};

		Level.prototype._generateEntities = function(node)
		{
			var entity;
			for (var i in node.childNodes)
			{
				entity = node.childNodes[i];
				switch (entity.nodeName)
				{
					case "spawn":
					{
						this._player = new Player(parseFloat(entity.x), parseFloat(entity.y));
						this.addChild(this._player);
						break;
					}

					default: break;
				}
			}
		};

		Level.prototype._data = null;
		Level.prototype._player = null;
		Level.prototype._tileSize = 32;

		return Level;
	});