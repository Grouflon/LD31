if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * Spatial Node
 * ===================================*/
define([
        'playgroundjs/abstract/node',
        'playgroundjs/utils/math/matrix3',
        'playgroundjs/utils/math/vector2'
    ]
    , function (Node, Matrix3, Vector2)
    {
        SpatialNode.prototype = Object.create(Node.prototype);
        /**** PUBLIC ****/

        Object.defineProperty(SpatialNode.prototype, "x",{
            get: function() { return this._x;},
            set: function(value) { this.translateTo(value, this._y); }
        });

        Object.defineProperty(SpatialNode.prototype, "y",{
            get: function() { return this._y;},
            set: function(value) { this.translateTo(this._x, value); }
        });

        Object.defineProperty(SpatialNode.prototype, "translation",{
            get: function() { return new Vector2(this.x, this.y)}
        });

        Object.defineProperty(SpatialNode.prototype, "rotation",{
            get: function() { return this._rotation;},
            set: function(value) { this.rotateTo(value); }
        });

        Object.defineProperty(SpatialNode.prototype, "xScale",{
            get: function() { return this._xScale;},
            set: function(value) { this.scaleTo(value, this._yScale); }
        });

        Object.defineProperty(SpatialNode.prototype, "yScale",{
            get: function() { return this._yScale;},
            set: function(value) { this.scaleTo(this._xScale, value); }
        });

        Object.defineProperty(SpatialNode.prototype, "scale",{
            get: function() { return new Vector2(this.xScale, this.yScale);}
        });

        Object.defineProperty(SpatialNode.prototype, "transformMatrix",{
            get: function() { return this._matrix.clone();}
        });

        Object.defineProperty(SpatialNode.prototype, "globalTransformMatrix",{
            get: function()
            {
                var m = Matrix3.getIdentity();
                var f = function(node)
                {
                    if (node.parent) f(node.parent);
                    if (node instanceof SpatialNode) m.multMatrix(node._matrix);
                };
                f(this);
                return m;
            }
        });

        Object.defineProperty(SpatialNode.prototype, "globalTranslation",{
            get: function()
            {
                return this.globalTransformMatrix.multVector(new Vector2);
            }
        });

        Object.defineProperty(SpatialNode.prototype, "globalScale",{
            get: function()
            {
                var v = new Vector2(1, 1);
                var f = function(node)
                {
                    if (node.parent) f(node.parent);
                    if (node instanceof SpatialNode)
                    {
                        v.x *= node.xScale;
                        v.y *= node.yScale;
                    }
                };
                f(this);
                return v;
            }
        });


        function SpatialNode(name, x, y, rotation, xScale, yScale)
        {
            Node.call(this, name);

            x = x != null ? x : 0.0;
            y = y != null ? y : 0.0;
            xScale = xScale ? xScale : 1.0;
            yScale = yScale ? yScale : 1.0;
            rotation = rotation ? rotation : 0.0;

            this._x = x;
            this._y = y;
            this._rotation = rotation;
            this._xScale = xScale;
            this._yScale = yScale;
            this._matrix = Matrix3.getTransform(this._x, this._y, this._rotation, this._xScale, this._yScale);
        }


        SpatialNode.prototype.translateBy = function(x, y)
        {
            if (x != 0 || y != 0)
            {
                this._matrix.multMatrix(Matrix3.getTranslation(x, y));
                this._x += x;
                this._y += y;
            }
        };

        SpatialNode.prototype.translateTo = function(x, y)
        {
            if (x != this.x || y != this.y)
                this.translateBy(x - this._x, y - this._y);
        };


        SpatialNode.prototype.rotateBy = function(r) {
            if (r % 360 != 0)
            {
                this._matrix.multMatrix(Matrix3.getRotation(r));
                this._rotation = (this._rotation + r + 360.0) % 360.0;
            }
        };

        SpatialNode.prototype.rotateTo = function(r)
        {
            if (r != this._rotation)
                this.rotateBy(r - this._rotation);
        };


        SpatialNode.prototype.scaleBy = function(x, y)
        {
            if (x != 1 || y != 1)
            {
                this._matrix.multMatrix(Matrix3.getScale(x, y));
                this._xScale *= x;
                this._yScale *= y;
            }
        };

        SpatialNode.prototype.scaleTo = function(x, y)
        {
            if (x != this._xScale || y != this._yScale)
                this.scaleBy(x / this._xScale, y / this._yScale)
        };


        /**** PRIVATE ****/

        SpatialNode.prototype._x = 0.0;
        SpatialNode.prototype._y = 0.0;
        SpatialNode.prototype._rotation = 0.0;
        SpatialNode.prototype._xScale = 1.0;
        SpatialNode.prototype._yScale = 1.0;

        SpatialNode.prototype._matrix = null;

        return SpatialNode;
    });