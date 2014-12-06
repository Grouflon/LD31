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

        function CircleCollider(radius, x, y)
        {
            Collider.call(this, x, y);
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