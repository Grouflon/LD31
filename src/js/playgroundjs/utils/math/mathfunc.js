if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Math Functions
 * ===================================*/
define([

]
	, function () {
		return {
			clamp : function(n, min, max) {
				return Math.max(Math.min(n, max), min);
			},

			r2d : function(angle) {
				return angle * 180 / Math.PI;
			},

			d2r : function(angle) {
				return angle * Math.PI / 180;
			}/*,

			linesIntersects : function(xA1, yA1, xA2, yA2, xB1, yB1, xB2, yB2) {
				var denominator = ((xA2 - xA1) * (yB2 - yB1)) - ((yA2 - yA1) * (xB2 - xB1));
				var numerator1 = ((yA1 - yB1) * (xB2 - xB1)) - ((xA1 - xB1) * (yB2 - yB1));
				var numerator2 = ((yA1 - yB1) * (xA2 - xA1)) - ((xA1 - xB1) * (yA2 - yA1));

				if (denominator == 0) return numerator1 == 0 && numerator2 == 0;

				var r = numerator1 / denominator;
				var s = numerator2 / denominator;

				return (r >= 0 && r <= 1) && (s >= 0 && s <= 1);
			}*/
		};
	});