if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * Game Object
 * ===================================*/
define([
        'playgroundjs/abstract/spatialnode',
        'playgroundjs/world',
        'playgroundjs/abstract/collider'
    ]
    , function (SpatialNode, World, Collider)
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
                if (!this.world) return this.world.game;
                return null;
            }
        });

        Object.defineProperty(GameObject.prototype, "activeColliders", {
            get : function() {
                var colliders = [];
                for (var i in this._children)
                {
                    if (this._children[i] instanceof Collider && this._children[i].enabled) colliders.push(this._children[i]);
                }
                return colliders;
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


        GameObject.prototype.collideFirst = function(x, y, types)
        {
            if (!this.world || !this.enabled) return null;

            x = x || this._x;
            y = y || this._y;
            var selfColliders = this.activeColliders;
            var allColliders = this.world.activeColliders;
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
                        return allColliders[j];
                    }
                }
            }
            this.translateTo(tempX, tempY);
            return null;
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