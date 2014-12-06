if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * World
 * ===================================*/
define([
        'playgroundjs/abstract/node',
        'playgroundjs/abstract/spatialnode',
        'playgroundjs/utils/math/matrix3',
        'playgroundjs/utils/math/vector2',
        'playgroundjs/abstract/graphic',
        'playgroundjs/abstract/collider'
    ]
    , function (Node, SpatialNode, Matrix3, Vector2, Graphic, Collider) {
        World.prototype = Object.create(Node.prototype);
        Object.defineProperty(World.prototype, "parent", {
            get: function () { return this._parent }
        });

        /**** PUBLIC ****/

        World.prototype.enabled = true;

        Object.defineProperty(World.prototype, "game", {
            get: function () { return this._game; }
        });

        Object.defineProperty(World.prototype, "camera", {
            get: function () { return this._camera.clone(); }
        });

        Object.defineProperty(World.prototype, "activeColliders", {
            get : function() {
                var colliders = [];
                var f = function(node)
                {
                    if (typeof node.enabled !== "undefined" && !node.enabled) return;
                    if (node instanceof Collider) colliders.push(node);
                    if (node instanceof Node) {
                        for (var i in node._children) f(node._children[i]);
                    }
                };
                f(this);
                return colliders;
            }
        });


        function World(name) {
            Node.call(this, name);
            this._camera = new Vector2;
        }

        World.prototype.setCamera = function(x, y)
        {
            this._camera.x = x || 0.0;
            this._camera.y = y || 0.0;
        };

        /** Override these functions for custom behavior **/
        World.prototype.begin = function() {};
        World.prototype.update = function(elapsed) {};
        //World.prototype.draw = function(ctx) {};
        World.prototype.end = function() {};


        /**** PRIVATE ****/

        World.prototype._update = function(elapsed)
        {
            var recUpdate = function(node)
            {
                if (typeof node.enabled !== "undefined" && !node.enabled) return;
                if (typeof node._start === "function") node._start();
                if (typeof node.update === "function") node.update(elapsed);
                if (node instanceof Node)
                {
                    for (var i in node._children) recUpdate(node._children[i]);
                }
            };
            recUpdate(this);

            // TODO: safe destroy
        };


        World.prototype._draw = function(ctx)
        {
            var graphics = [];
            var i;

            var recDraw = function(node, m)
            {
                if (node instanceof SpatialNode) m.multMatrix(node.transformMatrix);
                if (node instanceof Graphic && node.visible)
                {
                    graphics.push({ g: node, m: m });
                }
                if (node instanceof Node)
                {
                    for (i in node._children)
                    {
                        recDraw(node._children[i], m.clone());
                    }
                }
            };
            recDraw(this, Matrix3.getIdentity());

            ctx.save();
            ctx.translate(-this._camera.x, -this._camera.y);
            graphics.sort(function(a, b) { return a.g.layer <= b.g.layer ? -1 : 1; });
            for (i in graphics)
            {
                graphics[i].g.draw(ctx, graphics[i].m);
            }
            ctx.restore();
        };

        World.prototype._game = null;
        World.prototype._camera = null;


        /*Object.defineProperty(World.prototype, "camera", {
            get : function() {
                return this._camera;
            },
            set : function(value) {
                if (value instanceof Camera) {
                    if (this._camera) this._camera.parent = null;
                    value.parent = this;
                    this._camera = value;
                } else {
                    console.error('Type Error : ' + value + 'must inherit Camera');
                }
            }
        });*/

        /*Object.defineProperty(World.prototype, "gameObjects", {
            get : function() {
                return this.deepChildren.filter(function(child) {
                    return child instanceof GameObject;
                });
            }
        });

        Object.defineProperty(World.prototype, "colliders", {
            get : function() {
                var colliders = [];
                this.deepChildren.forEach(function(child) {
                    if (child instanceof Collider) {
                        colliders.push(child);
                    }
                });
                return colliders;
            }
        });

        Object.defineProperty(World.prototype, "sortedGraphics", {
            get : function() {
                return this.deepChildren.filter(function(child) {
                    return child instanceof Graphic;
                }).sort(function(a, b) {
                    if (a.layer < b.layer)
                        return -1;
                    if (a.layer > b.layer)
                        return 1;
                    return 0;
                });
            }
        });*/

        /*World.prototype.getCollidersByType = function(type) {
            if (!type || (Array.isArray(type) && !type.length)) {
                return this.colliders;
            } else {
                if (!Array.isArray(type)) type = [type];

                return this.colliders.filter(function(child) {
                    return type.indexOf(child.type) >= 0;
                });
            }
        };

        World.prototype.collideRect = function(x, y, width, height, type) {


            var colliders = this.getCollidersByType(type);

            var rectCollider = new BoxCollider(width, height, x, y);
            var result = [];
            colliders.forEach(function(collider) {
                if (rectCollider.collidesWith(collider)) {
                    result.push(collider.gameObject);
                }
            }.bind(this));
            return result;
        };

        Object.defineProperty(World.prototype, "world", {});
        delete World.prototype["world"];
        World.prototype._camera = null;*/

        return World;
    });