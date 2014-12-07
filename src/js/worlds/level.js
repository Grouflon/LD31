if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Level world
 * ===================================*/
define([
		"playgroundjs/world",
		"gameobjects/player",
		"gameobjects/obstacle",
		"gameobjects/trap",
		"gameobjects/exit",
		"components/gamecontroller",
		"components/pausecontroller",
		"components/terraincollisionclamper",
		"events"
	]
	, function (World, Player, Obstacle, Trap, Exit, GameController, PauseController, TerrainCollisionClamper, Events)
	{
		Level.prototype = Object.create(World.prototype);
		/**** PUBLIC ****/

		Object.defineProperty(Level.prototype, "levelWidth", {
			get: function() { return this._levelWidth; }
		});

		Object.defineProperty(Level.prototype, "levelHeight", {
			get: function() { return this._levelHeight; }
		});

		function Level(levelData)
		{
			World.call(this, levelData.nodeName);
			this._data = levelData;
			this.addChild(new GameController);
			this.addChild(new PauseController);
			this.addChild(new TerrainCollisionClamper);
			this._generateLevel(this._data);
		}

		Level.prototype.begin = function()
		{
			this._generateEntities(this._data.childNodes[1]);
		};

		Level.prototype.update = function(elapsed)
		{

		};

		Level.prototype._update = function(elapsed)
		{
			if (this._firstRound)
			{
				elapsed = 0;
				this._firstRound = false;
			}
			World.prototype._update.call(this, elapsed);
		};

		Level.prototype.end = function(elapsed)
		{
			Events.sGameEnterPause.removeAll();
			Events.sGameExitPause.removeAll();
		};

		/**** PRIVATE ****/

		Level.prototype._generateLevel = function(node)
		{
			this._levelWidth = node.width;
			this._levelHeight = node.height;

			for (var i in node.childNodes)
			{
				switch (node.childNodes[i].nodeName)
				{
					case "terrain":
					{
						this._generateTerrain(node.childNodes[i]);
						break;
					}

					/*case "entities":
					{
						this._generateEntities(node.childNodes[i]);
						break;
					}*/

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
				if (tile.ty == 0)
				{
					this.addChild(new Obstacle(this._tileSize * tile.x, this._tileSize * tile.y, tile.tx));
				}
				else if (tile.ty == 1)
				{
					this.addChild(new Trap(this._tileSize * tile.x, this._tileSize * tile.y, this._tileSize, this._tileSize));
				}
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
						//this._player = new Player(parseFloat(entity.x), parseFloat(entity.y));
						this.addChild(new Player(parseFloat(entity.x), parseFloat(entity.y)));
						break;
					}

					case "exit":
					{
						//this._player = new Player(parseFloat(entity.x), parseFloat(entity.y));
						this.addChild(new Exit(parseFloat(entity.x), parseFloat(entity.y)));
						break;
					}

					default: break;
				}
			}
		};

		Level.prototype._firstRound = true;

		Level.prototype._levelWidth = 0;
		Level.prototype._levelHeight = 0;
		Level.prototype._data = null;
		//Level.prototype._player = null;
		Level.prototype._tileSize = 36;

		return Level;
	});