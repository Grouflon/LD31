if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * AABB
 * ===================================*/
define([
	'engine/utils/math/vector2'
	]
	, function (Vector2) {
		function AABB(x1, y1, x2, y2) {
			this.min = new Vector2(Math.min(x1, x2), Math.min(y1, y2));
			this.max = new Vector2(Math.max(x1, x2), Math.max(y1, y2));
		}

		AABB.prototype.min = null;
		AABB.prototype.max = null;

		AABB.prototype.testAABB = function(aabb) {
			return !(
				aabb.max.x <= this.min.x ||
				aabb.min.x >= this.max.x ||
				aabb.max.y <= this.min.y ||
				aabb.min.y >= this.max.y
			);
		};

		AABB.prototype.testPoint = function(x, y) {
			return (x > this.min.x && x < this.max.x)
				&& (y > this.min.y && y < this.max.y);
		};

		return AABB;
	});