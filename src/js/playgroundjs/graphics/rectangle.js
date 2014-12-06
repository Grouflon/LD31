if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * Rectangle
 * ===================================*/
define([
        'playgroundjs/abstract/graphic'
    ]
    , function (Graphic) {
        Rectangle.prototype = Object.create(Graphic.prototype);
        /**** PUBLIC ****/

        function Rectangle(width, height, color, x, y)
        {
            Graphic.call(this, "Rectangle", x, y, color);
            this._canvas.width = width || 0;
            this._canvas.height = height || 0;
            this._preRender();
        }


        /**** PRIVATE ****/

        Rectangle.prototype._preRender = function() {
            this._ctx.fillStyle = this.color;
            this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
        };

        return Rectangle;
    });