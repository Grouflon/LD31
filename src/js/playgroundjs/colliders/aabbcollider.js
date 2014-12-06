if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * AABB Collider
 * =================================== */
define([
        'playgroundjs/abstract/collider'
    ]
    , function (Collider) {

        AABBCollider.prototype = Object.create(Collider.prototype);
        /**** PUBLIC ****/

        Object.defineProperty(AABBCollider.prototype, "width", {
            get: function() { return this._width; }
        });

        Object.defineProperty(AABBCollider.prototype, "height", {
            get: function() { return this._height; }
        });

        Object.defineProperty(AABBCollider.prototype, "AABB", {
            get: function() { return {
                min: {
                    x: Math.min(this._x, this._x + this._width),
                    y: Math.min(this._y, this._y + this._height)
                },
                max: {
                    x: Math.max(this._x, this._x + this._width),
                    y: Math.max(this._y, this._y + this._height)
                }
            };}
        });

		Object.defineProperty(AABBCollider.prototype, "globalAABB", {
			get: function()
			{
				var t = this.globalTranslation;
				var s = this.globalScale;
				return {
					min: {
						x: Math.min(t.x, t.x + this._width * s.x),
						y: Math.min(t.y, t.y + this._height * s.y)
					},
					max: {
						x: Math.max(t.x, t.x + this._width * s.x),
						y: Math.max(t.y, t.y + this._height * s.y)
					}
				};
			}
		});

        function AABBCollider(width, height, x, y, type)
        {
            Collider.call(this, x, y, type);
            this._shape = Collider.shapes.AABB;
            this._width = width;
            this._height = height;
        }


        /**** PRIVATE ****/

        AABBCollider.prototype._getGlobalShape = function()
        {
            var t = this.parent.globalTranslation;
            var t2 = this.globalTranslation;
            var s = this.globalScale;

            //console.log(this._x, this._y);

            //console.log(t.x, this._x, t2.x);
            /*console.log({
                shape: this._shape,
                min: {
                    x: Math.min(t.x + (this._x * s.x), t.x + ((this._x + this._width) * s.x)),
                    y: Math.min(t.y + (this._y * s.y), t.y + ((this._y + this._height) * s.y))
                },
                max: {
                    x: Math.max(t.x + (this._x * s.x), t.x + ((this._x + this._width) * s.x)),
                    y: Math.max(t.y + (this._y * s.y), t.y + ((this._y + this._height) * s.y))
                }
            });*/

            return {
                shape: this._shape,
                min: {
                    x: Math.min(t.x + (this._x * s.x), t.x + ((this._x + this._width) * s.x)),
                    y: Math.min(t.y + (this._y * s.y), t.y + ((this._y + this._height) * s.y))
                },
                max: {
                    x: Math.max(t.x + (this._x * s.x), t.x + ((this._x + this._width) * s.x)),
                    y: Math.max(t.y + (this._y * s.y), t.y + ((this._y + this._height) * s.y))
                }
            };
        };

        AABBCollider.prototype._width = 0.0;
        AABBCollider.prototype._height = 0.0;

        return AABBCollider;
    });