if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * ArrayHelper
 * ===================================*/
define([

]
	, function () {
		return {
			/**
			 * Creates a n dimensions array, n is the number of arguments of the function
			 * Ex : createNDimensional(2, 3) returns [[,,],[,,]]
			 * @param length, ...
			 * @returns {Array}
			 */
			createNDimensional : function(length) {
				var arr = new Array(length || 0),
					i = length;

				if (arguments.length > 1) {
					var args = Array.prototype.slice.call(arguments, 1);
					while(i--) arr[length-1 - i] = this.nDimensionalArray.apply(this, args);
				}

				return arr;
			},


			/**
			 * Fill an array with a specified value
			 * @param array
			 * @param value
			 */
			fill : function(array, value) {
				for (var i = 0; i < array.length; i++) {
					if (Array.isArray(array[i])) {
						this.fill(array[i], value);
					} else {
						array[i] = value;
					}
				}
			}
		};
	});