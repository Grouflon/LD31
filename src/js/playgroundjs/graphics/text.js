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
				if (value != this._text)
				{
					this._text = value;
					this._preRender();
				}
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

		Object.defineProperty(Text.prototype, "lineHeight", {
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
			var lines = this._text.split("\n");
			var i;
			this._canvas.width = 0;
			this._ctx.font = this._size + "px " + this._font;
			var measure;
			for (i in lines)
			{
				measure = this._ctx.measureText(lines[i]);
				this._canvas.width = Math.max(measure.width, this._canvas.width);
			}
            this._canvas.height = Math.max(this._size, this._lineHeight * lines.length);

            this._ctx.font = this._size + "px " + this._font;
            this._ctx.textBaseline = "top";
            this._ctx.fillStyle = this.color;
			for (i in lines)
			{
				this._ctx.fillText(lines[i], 0, i * this._lineHeight);
			}
        };

        Text.prototype._text = null;
        Text.prototype._size = 23;
        Text.prototype._lineHeight = 26;
        Text.prototype._font = "munro";

        return Text;
    });