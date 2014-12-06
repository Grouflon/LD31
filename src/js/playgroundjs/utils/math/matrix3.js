if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * 3x3 Matrix
 * ===================================*/
define([
        "playgroundjs/utils/math/mathfunc",
        "playgroundjs/utils/math/vector2"
    ]
    , function (MathFunc, Vector2)
    {
        /**** PUBLIC ****/

        function Matrix3(m00, m10, m20, m01, m11, m21, m02, m12, m22)
        {
            this._values = [m00, m10, m20, m01, m11, m21, m02, m12, m22];
        }


        Matrix3.prototype.multMatrix = function(m)
        {
            if (!m instanceof Matrix3) return;
            var i, j, k;
            var values = [0, 0, 0, 0, 0, 0, 0, 0, 0];

            for (i = 0; i < 3; i++)
            for (j = 0; j < 3; j++)
            for (k = 0; k < 3; k++)
            {
                values[i + 3*j] += this._values[i + 3*k] * m._values[k + 3*j];
            }
            this._values = values;
            return this;
        };


        Matrix3.prototype.multVector = function(v)
        {
            if (!v instanceof Vector2) return null;
            var vec = [v.x, v.y, 1.0];


            return new Vector2(
                this._values[0]*vec[0] + this._values[3]*vec[1] + this._values[6]*vec[2],
                this._values[1]*vec[0] + this._values[4]*vec[1] + this._values[7]*vec[2]
            );
        };


        Matrix3.prototype.get = function(i, j)
        {
            return this._values[i + j*3];
        };


        Matrix3.prototype.clone = function()
        {
            return new Matrix3( this._values[0],
                                this._values[1],
                                this._values[2],
                                this._values[3],
                                this._values[4],
                                this._values[5],
                                this._values[6],
                                this._values[7],
                                this._values[8]);
        };


        Matrix3.prototype.print = function()
        {
            console.log(
                this._values[0].toFixed(2) + ", " + this._values[3].toFixed(2) + ", " + this._values[6].toFixed(2) + "\n" +
                this._values[1].toFixed(2) + ", " + this._values[4].toFixed(2) + ", " + this._values[7].toFixed(2) + "\n" +
                this._values[2].toFixed(2) + ", " + this._values[5].toFixed(2) + ", " + this._values[8].toFixed(2)
            );
        };


        /**** PRIVATE ****/

        Matrix3.prototype._values = null;


        /**** STATIC ****/

        Matrix3.getIdentity = function() { return new Matrix3(1, 0, 0, 0, 1, 0, 0, 0, 1); };
        Matrix3.getTranslation = function(x, y) { return new Matrix3(1, 0, 0, 0, 1, 0, x, y, 1); };
        Matrix3.getScale = function(x, y) { return new Matrix3(x, 0, 0, 0, y, 0, 0, 0, 1); };
        Matrix3.getRotation = function(r) { return new Matrix3(Math.cos(MathFunc.d2r(r)), Math.sin(MathFunc.d2r(r)), 0, -Math.sin(MathFunc.d2r(r)), Math.cos(MathFunc.d2r(r)), 0, 0, 0, 1); };

        Matrix3.getTransform = function(x, y, rotation, xScale, yScale)
        {
            var m = Matrix3.getTranslation(x, y);
            m.multMatrix(Matrix3.getRotation(rotation));
            m.multMatrix(Matrix3.getScale(xScale, yScale));
            return m;
        };

        return Matrix3;
    });