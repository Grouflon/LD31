if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Draw
 * ===================================*/
define([
]
	, function () {
		return {

			rectangle : function(context, x, y, width, height, color) {
				color = color || "#000";
				context.fillStyle = color;
				context.fillRect(Math.round(x), Math.round(y), Math.round(width), Math.round(height));
			},

			circle : function(context, x, y, radius, color /*options*/) {
				// TODO : add options to draw many types of circle
				context.strokeStyle = color || "#000";

				context.beginPath();
				context.arc(x, y, radius, 0, 2 * Math.PI, false);
				context.stroke();
				context.closePath();
			},

			point : function(context, x, y, color) {
				color = color || "#000";

				x = Math.round(x);
				y = Math.round(y);

				context.fillStyle = color;
				context.fillRect(x, y, 1, 1);

				context.fillRect(x, y - 10, 1, 8);
				context.fillRect(x, y + 3, 1, 8);

				context.fillRect(x - 10, y, 8, 1);
				context.fillRect(x + 3, y, 8, 1);

			}
		}
	});