if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * Circle Collider
 * =================================== */
define([
        'playgroundjs/abstract/collider'
    ]
    , function (Collider) {

        CircleCollider.prototype = Object.create(Collider.prototype);
        /**** PUBLIC ****/

        CircleCollider.prototype.radius = 0.0;

		Object.defineProperty(CircleCollider.prototype, "globalAABB", {
			get: function()
			{
				var t = this.globalTranslation;
				var s = this.globalScale;
				return {
					min: {
						x: Math.min(t.x + (this._x - this._radius) * s.x, t.x + (this._x + this._radius) * s.x),
						y: Math.min(t.y + (this._y - this._radius) * s.y, t.y + (this._y + this._radius) * s.y)
					},
					max: {
						x: Math.max(t.x + (this._x - this._radius) * s.x, t.x + (this._x + this._radius) * s.x),
						y: Math.max(t.y + (this._y - this._radius) * s.y, t.y + (this._y + this._radius) * s.y)
					}
				};
			}
		});

        function CircleCollider(radius, x, y, type)
        {
            Collider.call(this, x, y, type);
            this.radius = radius;
            this._shape = Collider.shapes.CIRCLE;
        }


        /**** PRIVATE ****/

        CircleCollider.prototype._getGlobalShape = function()
        {
            var t = this.globalTranslation;
            var s = this.globalScale;

            return {
                shape: this._shape,
                x: t.x,
                y: t.y,
                r: this.radius * Math.max(s.x, s.y)
            };
        };

        return CircleCollider;
    });