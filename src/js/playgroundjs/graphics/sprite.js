if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Sprite
 * ===================================*/
define([
		'playgroundjs/graphics/image',
		'playgroundjs/utils/math/matrix3'
	]
	, function (Image, Matrix3)
	{
		Sprite.prototype = Object.create(Image.prototype);

		/**** PUBLIC ****/

		Object.defineProperty(Sprite.prototype, "width", { get: function() { return this._frameWidth; }});
		Object.defineProperty(Sprite.prototype, "height", { get: function() { return this._frameHeight; }});

		function Sprite(image, frameWidth, frameHeight, x, y)
		{
			this.name = "Sprite";
			this._frameWidth = frameWidth;
			this._frameHeight = frameHeight;
			this._cursor = {
				x: 0,
				y: 0,
				width: this._frameWidth,
				height: this._frameHeight
			};

			Image.call(this, image, x, y);

            this._columns = Math.ceil(this._image.width / this._frameWidth);
            this._rows = Math.ceil(this._image.height / this._frameHeight);
            this._frameCount = this._columns * this._rows;
		}


		Sprite.prototype.addAnim = function(name, frames, fps, loop) {
			// Makes all frames indexes valid
			var i;
			for (i in frames) {
				frames[i] = frames[i] % this._frameCount;
				if (frames[i] < 0) frames[i] += this._frameCount;
			}

			// Add animation
			this._animations[name] = {
				name: name,
				frames: frames,
				fps: fps,
				loop: loop
			}
		};

		Sprite.prototype.setFrame = function(id)
		{
			this.stop();
			this._cursor = this._getFrameCursor(id);
		};


		Sprite.prototype.play = function(anim, startFrame) {
			if (this._currentAnim != this._animations[anim] || this._complete) {
				startFrame = startFrame || 0;
				this._currentAnim = this._animations[anim];
				this._currentFrame = startFrame;
				this._deltaTime = 0;
				this._complete = false;
			}
		};


		Sprite.prototype.stop = function() {
			this._complete = true;
			this._deltaTime = 0;
		};


		Sprite.prototype.update = function(elapsed) {
			if (this._currentAnim && !this._complete) {
				var deltaFrames;

				this._deltaTime += elapsed;
				deltaFrames = Math.floor(this._currentAnim.fps * this._deltaTime);
				this._deltaTime -= deltaFrames / this._currentAnim.fps;
				this._currentFrame += deltaFrames;

				if (this._currentAnim.loop) {
					this._currentFrame %= this._currentAnim.frames.length;
				} else {
					if (this._currentFrame >= this._currentAnim.frames.length) {
						this._currentFrame = this._currentAnim.frames.length - 1;
						this._complete = true;
					}
				}

				this._cursor = this._getFrameCursor(this._currentAnim.frames[this._currentFrame]);
			}
		};


		Sprite.prototype.draw = function(context, transformMatrix) {
			if (!transformMatrix instanceof Matrix3) transformMatrix = null;

			// TODO : give transform back to graphic. see graphic.js
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
			context.drawImage(this._canvas, this._cursor.x, this._cursor.y, this._cursor.width, this._cursor.height, 0, 0, this._cursor.width, this._cursor.height);
			context.restore();
		};


		Sprite.prototype.getFrameIndex = function(column, row) {
			column = column || 0;
			row = row || 0;

			return ((row % this._rows) * (this._columns - 1)) + (column % this._columns);
		};


		/**** PRIVATE ****/

		Sprite.prototype._getFrameCursor = function(index) {
			var row,
				column;

			index = index % this._frameCount;
			if (index < 0) index += this._frameCount;



			row = Math.floor(index / this._columns);
			column = index - (row * this._columns);

			return {
				x: column * this._cursor.width,
				y: row * this._cursor.height,
				width: this._frameWidth,
				height: this._frameHeight
			}
		};

		Sprite.prototype._frameWidth = 0;
		Sprite.prototype._frameHeight = 0;
		Sprite.prototype._rows = 0;
		Sprite.prototype._columns = 0;
		Sprite.prototype._frameCount = 0;
		Sprite.prototype._animations = {};
		Sprite.prototype._currentAnim = null;
		Sprite.prototype._currentFrame = 0;
		Sprite.prototype._deltaTime = 0;
		Sprite.prototype._complete = false;
		Sprite.prototype._cursor = null;
		Sprite.prototype._complete = false;

		return Sprite;
	});