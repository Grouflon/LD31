if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * Text
 * ===================================*/
define([
        'playgroundjs/abstract/graphic'
    ]
    , function (Graphic) {
        Text.prototype = Object.create(Graphic.prototype);
        /**** PUBLIC ****/

        Object.defineProperty(Text.prototype, "height", {
            get : function() { return this._canvas.height; }
        });

        Object.defineProperty(Text.prototype, "width", {
            get : function() { return this._canvas.width; }
        });

        Object.defineProperty(Text.prototype, "text", {
            get : function() { return this._text; },
            set : function(value)
            {
                this._text = value;
                this._preRender();
            }
        });

        Object.defineProperty(Text.prototype, "font", {
            get : function() { return this._font; },
            set : function(value)
            {
                this._font = value;
                this._preRender();
            }
        });

        Object.defineProperty(Text.prototype, "size", {
            get : function() { return this._size; },
            set : function(value)
            {
                this._size = value;
                this._preRender();
            }
        });


        function Text(text, color, x, y) {
            Graphic.call(this, "Text", x, y, color);
            this._text = text;
            this._preRender();
        }


        /**** PRIVATE ****/

        Text.prototype._preRender = function()
        {
            this._ctx.font = this._size + "px " + this._font;
            var measure = this._ctx.measureText(this._text);
            this._canvas.height = this._size;
            this._canvas.width = measure.width;

            this._ctx.fillStyle = this.color;
            this._ctx.font = this._size + "px " + this._font;
            this._ctx.textBaseline = "top";
            this._ctx.fillStyle = this.color;
            this._ctx.fillText(this._text, 0, 0);
        };

        Text.prototype._text = null;
        Text.prototype._size = 23;
        Text.prototype._font = "munro";

        return Text;
    });