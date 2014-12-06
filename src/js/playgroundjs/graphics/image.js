if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * Image
 * ===================================*/
define([
        'playgroundjs/abstract/graphic'
    ]
    , function (Graphic)
    {
        Image.prototype = Object.create(Graphic.prototype);

        /**** PUBLIC ****/

        function Image(image, x, y)
		{
			Graphic.call(this, "Image", x, y);

            this._canvas.width = this._image.width;
            this._canvas.height = this._image.height;
            this._image = image;
            this._preRender();
        }


        /**** PRIVATE ****/

		Image.prototype._preRender = function()
		{
            this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
            this._ctx.drawImage(this._image, 0, 0, this._image.width, this._image.height, 0, 0, this._canvas.width, this._canvas.height);

            // TODO: optimize with compositing
            var imageData = this._ctx.getImageData(0, 0, this._canvas.width, this._canvas.height);
            for (var i = 0; i < imageData.data.length; i += 4) {
                if (imageData.data[i + 3] != 0) {
                    imageData.data[i] *= (this._color.r / 255);
                    imageData.data[i + 1] *= (this._color.g / 255);
                    imageData.data[i + 2] *= (this._color.b / 255);
                }
            }
            this._ctx.putImageData(imageData, 0, 0);
		};

		Image.prototype._image = null;

        return Image;
    });