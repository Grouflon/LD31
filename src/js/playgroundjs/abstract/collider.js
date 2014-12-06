if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * Collider
 * =================================== */
define([
        'playgroundjs/abstract/spatialnode',
        'playgroundjs/utils/math/collisions'
    ]
    , function (SpatialNode, Collisions) {

        Collider.prototype = Object.create(SpatialNode.prototype);
        /**** PUBLIC ****/

        Collider.prototype.enabled = true;
        Collider.prototype.type = null;

        function Collider(x, y)
        {
            SpatialNode.call(this, "Collider", x, y);
        }

        Collider.prototype.collidesWith = function(collider)
        {
            var selfShape = this._getGlobalShape();
            var otherShape = collider._getGlobalShape();


            switch (selfShape.shape)
            {
                case Collider.shapes.CIRCLE:
                {
                    switch (otherShape.shape)
                    {
                        case Collider.shapes.CIRCLE :
                        {
                            return Collisions.circleCircle(selfShape.x, selfShape.y, selfShape.r, otherShape.x, otherShape.y, otherShape.r);
                        }
                        default: { return false; }
                    }
                }

                case Collider.shapes.AABB:
                {
                    switch (otherShape.shape)
                    {
                        case Collider.shapes.AABB :
                        {
                            return Collisions.AABBAABB(selfShape.min.x, selfShape.min.y, selfShape.max.x, selfShape.max.y, otherShape.min.x, otherShape.min.y, otherShape.max.x, otherShape.max.y);
                        }
                        default: { return false; }
                    }
                }
                default: { return false; }
            }
        };

        /**** PRIVATE ****/
        Collider.prototype._getGlobalShape = function() { return null; };
        Collider.prototype._shape = null;

        /**** STATIC ****/
        Collider.shapes = {
            CIRCLE: 0,
            AABB: 1
        };

        return Collider;
    });