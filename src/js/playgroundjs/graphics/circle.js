if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * Circle
 * ===================================*/
define([
        'playgroundjs/abstract/graphic'
    ]
    , function (Graphic) {
        Circle.prototype = Object.create(Graphic.prototype);
        /**** PUBLIC ****/

        Object.defineProperty(Circle.prototype, "radius", {
            get: function() { return this._radius; },
            set: function(value)
            {
                this._radius = value;
                this.width = value * 2;
                this.height = value * 2;
                this._preRender();
            }
        });

        Object.defineProperty(Circle.prototype, "height", {
            get : function() { return this._canvas.height; }
        });

        Object.defineProperty(Circle.prototype, "width", {
            get : function() { return this._canvas.width; }
        });


        function Circle(radius, color, x, y) {
            Graphic.call(this, "Circle", x, y, color);
            this.radius = radius;
            this._preRender();
        }


        /**** PRIVATE ****/

        Circle.prototype._preRender = function() {
            this._ctx.fillStyle = this.color;
            this._ctx.beginPath();
            this._ctx.arc(this._radius, this._radius, this._radius, 0, 2 * Math.PI, false);
            this._ctx.fill();
            this._ctx.closePath();
        };

        Circle.prototype._radius = 0.0;

        return Circle;
    });