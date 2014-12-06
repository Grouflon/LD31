if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * Game Object
 * ===================================*/
define([
        'playgroundjs/abstract/spatialnode',
        'playgroundjs/world',
        'playgroundjs/abstract/collider',
        'playgroundjs/abstract/graphic'
    ]
    , function (SpatialNode, World, Collider, Graphic)
    {
        GameObject.prototype = Object.create(SpatialNode.prototype);
        /**** PUBLIC ****/

        GameObject.prototype.enabled = true;

        Object.defineProperty(GameObject.prototype, "world", {
           get: function()
           {
               if (!this._world)
               {
                   var w = null;
                   var f = function(node)
                   {
                       if (node instanceof World) w = node;
                       else if (node.parent) f(node.parent);
                   };
                   f(this);
                   this._world = w;
               }
               return this._world;
           }
        });

        Object.defineProperty(GameObject.prototype, "game", {
            get: function()
            {
                if (this.world) return this.world.game;
                return null;
            }
        });

        Object.defineProperty(GameObject.prototype, "activeColliders", {
            get: function() {
                var colliders = [];
                for (var i in this._children)
                {
                    if (this._children[i] instanceof Collider && this._children[i].enabled) colliders.push(this._children[i]);
                }
                return colliders;
            }
        });

		Object.defineProperty(GameObject.prototype, "activeGraphics", {
			get: function() {
				var graphics = [];
				for (var i in this._children)
				{
					if (this._children[i] instanceof Graphic && this._children[i].enabled) graphics.push(this._children[i]);
				}
				return graphics;
			}
		});

		Object.defineProperty(GameObject.prototype, "collisionGlobalAABB", {
			get: function() {
				var colliders = this.activeColliders;
				var aabb;
				var i;
				var minx = null,
					miny = null,
					maxx = null,
					maxy = null;

				for (i in colliders)
				{
					aabb = colliders[i].globalAABB;
					minx = minx ? Math.min(aabb.min.x, minx) : aabb.min.x;
					miny = miny ? Math.min(aabb.min.y, miny) : aabb.min.y;
					maxx = maxx ? Math.max(aabb.max.x, maxx) : aabb.max.x;
					maxy = maxy ? Math.max(aabb.max.y, maxy) : aabb.max.y;
				}

				return {
					min: {
						x: minx,
						y: miny
					},
					max: {
						x: maxx,
						y: maxy
					}
				};
			}
		});


        function GameObject(name, x, y)
        {
            SpatialNode.call(this, name, x, y);
            this._sParentChanged.add(function()
            {
                this._world = null;
            }.bind(this));
        }

        /** Override these functions for custom behavior **/
        GameObject.prototype.start = function() {};
        GameObject.prototype.update = function(elapsed) {};


        GameObject.prototype.collideFirst = function(x, y, types, sample)
        {
            if (!this.world || !this.enabled) return null;

            x = x || this._x;
            y = y || this._y;
            var selfColliders = this.activeColliders;
            var allColliders = sample ? sample : this.world.activeColliders;
            var tempX = this.x;
            var tempY = this.y;
            var i, j;

            this.translateTo(x, y);

            if (types && typeof types != "array") types = [types];
            else types = null;

            for (i in selfColliders)
            {
                for (j in allColliders)
                {
                    if (allColliders[j].parent != this)
                    if (!types || types.indexOf(allColliders[j].type) >= 0)
                    if (selfColliders[i].collidesWith(allColliders[j])) {
                        this.translateTo(tempX, tempY);
                        return allColliders[j].parent;
                    }
                }
            }
            this.translateTo(tempX, tempY);
            return null;
        };

		GameObject.prototype.collide = function(x, y, types, sample)
		{
			if (!this.world || !this.enabled) return null;

			x = x || this._x;
			y = y || this._y;
			var selfColliders = this.activeColliders;
			var allColliders = sample ? sample : this.world.activeColliders;
			var tempX = this.x;
			var tempY = this.y;
			var i, j;
			var result = [];

			this.translateTo(x, y);

			if (types && typeof types != "array") types = [types];
			else types = null;

			for (i in selfColliders)
			{
				for (j in allColliders)
				{
					if (allColliders[j].parent != this)
					if (!types || types.indexOf(allColliders[j].type) >= 0)
					if (selfColliders[i].collidesWith(allColliders[j])) {
						result.push(allColliders[j].parent);
					}
				}
			}
			this.translateTo(tempX, tempY);
			return result;
		};

		/**
		 * Called when the GameObject collides along the X axis during a moveBy call
		 * Override to add logic
		 * @param gameObject	{GameObject}	Collided GameObject
		 * @returns 			{boolean}		Validate or invalidate the collision
		 */
		GameObject.prototype.moveCollideX = function(gameObject) {
			return true;
		};

		/**
		 * Called when the GameObject collides along the Y axis during a moveBy call
		 * Override to add logic
		 * @param gameObject	{GameObject}	Collided GameObject
		 * @returns 			{boolean}		Validate or invalidate the collision
		 */
		GameObject.prototype.moveCollideY = function(gameObject) {
			return true;
		};


        /**** PRIVATE ****/

        GameObject.prototype._start = function()
        {
            if (!this._started)
            {
                this._started = true;
                this.start();
            }
        };

        GameObject.prototype._started = false;
        GameObject.prototype._world = null;

        return GameObject;
    });