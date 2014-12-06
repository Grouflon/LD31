if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Plugins - put here everything that is extending javascript
 * ===================================*/
define([

]
	, function () {

		requestAnimFrameFallback();
		bindFallback();

		/**
		 * Fallback function for requestAnimFrame on every browser
		 */
		function requestAnimFrameFallback() {
			window.requestAnimFrame = (function(){
				return  window.requestAnimationFrame   ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame    ||
					function( callback ){
						window.setTimeout(callback, 1000 / 60);
					};
			})();
		}

		/**
		 * Fallback function for function.bind on every browser
		 */
		function bindFallback() {
			// fallback for javascript 1.8.5 Function.prototype.bind
			// found here : http://devdocs.io/javascript/global_objects/function/bind
			if (!Function.prototype.bind) {
				Function.prototype.bind = function (oThis) {
					if (typeof this !== "function") {
						// closest thing possible to the ECMAScript 5 internal IsCallable function
						throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
					}

					var aArgs = Array.prototype.slice.call(arguments, 1),
						fToBind = this,
						fNOP = function () {},
						fBound = function () {
							return fToBind.apply(this instanceof fNOP && oThis
								? this
								: oThis,
								aArgs.concat(Array.prototype.slice.call(arguments)));
						};

					fNOP.prototype = this.prototype;
					fBound.prototype = new fNOP();

					return fBound;
				};
			}
		}
	});