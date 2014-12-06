if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * Graphic
 * ===================================*/
define([
        'playgroundjs/abstract/spatialnode',
        'playgroundjs/utils/math/vector2',
        'playgroundjs/utils/math/matrix3',
        'playgroundjs/utils/color'
    ]
    , function (SpatialNode, Vector2, Matrix3, Color)
    {
        Graphic.prototype = Object.create(SpatialNode.prototype);

        /**** PUBLIC ****/
        Graphic.prototype.visible = true;   /** {Boolean}	Rendered by the world. */
        Graphic.prototype.scrollX = 1.0;    /** {Number}	Rendered by the world. */
        Graphic.prototype.scrollY = 1.0;    /** {Number}	Rendered by the world. */
        Graphic.prototype.layer = 0;        /** {Number}	Rendering layer, the higher, the foremost. */
        Graphic.prototype.alpha = 1.0;      /** {Number}	Alpha channel. 1.0 is visible, 0.0 is transparent. */

        Object.defineProperty(Graphic.prototype, "width", {
            get : function() {
                return this._canvas.width;
            },
            set : function(value) {
                this._canvas.width = value;
                this._preRender();
            }
        });

        Object.defineProperty(Graphic.prototype, "height", {
            get : function() {
                return this._canvas.height;
            },
            set : function(value) {
                this._canvas.height = value;
                this._preRender();
            }
        });

        /** {Color}	Color of the graphic */
        Object.defineProperty(Graphic.prototype, "color", {
            get : function() {
                return this._color.hex;
            },
            set : function(value) {
                this._color.hex = value;
                this._preRender();
            }
        });


        function Graphic(name, x, y, color, rotation, xScale, yScale)
        {
            SpatialNode.call(this, name, x, y, rotation, xScale, yScale);
            this._canvas = document.createElement("canvas");
            this._ctx = this._canvas.getContext("2d");
            this._color = new Color(color || "#fff");
        }



        /**
         * Draws the graphic on a canvas.
         * @param context	        2DContext of the canvas.
         * @param transformMatrix	3x3 Transform matrix to apply to the context;
         */
        Graphic.prototype.draw = function(context, transformMatrix)
        {

            if (!transformMatrix instanceof Matrix3) transformMatrix = null;
            /*var x = Math.round(this.absX);
            var y = Math.round(this.absY);

            x += this.world.camera.x * (1 - this.scrollX);
            y += this.world.camera.y * (1 - this.scrollY);*/

            context.save();
            context.globalAlpha = this.alpha;
            if (transformMatrix)
            {
                context.transform(
                    transformMatrix.get(0,0),
                    transformMatrix.get(1,0),
                    transformMatrix.get(0,1),
                    transformMatrix.get(1,1),
                    transformMatrix.get(0,2),
                    transformMatrix.get(1,2)
                );
            }
			// TODO: Isolate drawing from transform, for more granular inheritance
            context.drawImage(this._canvas, 0, 0);
            context.restore();
        };


        /**** PRIVATE ****/

        Graphic.prototype._preRender = function() {};   /** Write child drawing algorithm here */
        Graphic.prototype._canvas = null;               /** {HTMLCanvasElement}	Unaltered graphic canvas. */
        Graphic.prototype._ctx = null;                  /** {HTMLCanvasElement}	Unaltered graphic canvas context. */
        Graphic.prototype._color = null;                /** {Color}	Color of the graphic */

        return Graphic;
    });