if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Ease
 * Found on the flashpunk library : https://github.com/Draknek/FlashPunk/blob/master/net/flashpunk/utils/Ease.as
 * ===================================*/
define([

]
	, function () {
		var Ease = {
			/** Quadratic in. */
			quadIn : function(t) {
				return t * t;
			},

			/** Quadratic out. */
			quadOut : function(t) {
				return -t * (t - 2);
			},

			/** Quadratic in and out. */
			quadInOut : function(t)	{
				return t <= .5 ? t * t * 2 : 1 - (--t) * t * 2;
			},

			/** Cubic in. */
			cubeIn : function(t)	{
				return t * t * t;
			},

			/** Cubic out. */
			cubeOut : function(t) {
				return 1 + (--t) * t * t;
			},

			/** Cubic in and out. */
			cubeInOut : function(t) {
				return t <= .5 ? t * t * t * 4 : 1 + (--t) * t * t * 4;
			},

			/** Quart in. */
			quartIn : function(t) {
				return t * t * t * t;
			},

			/** Quart out. */
			quartOut : function(t) {
				return 1 - (t-=1) * t * t * t;
			},

			/** Quart in and out. */
			quartInOut : function(t) {
				return t <= .5 ? t * t * t * t * 8 : (1 - (t = t * 2 - 2) * t * t * t) / 2 + .5;
			},

			/** Quint in. */
			quintIn : function(t) {
				return t * t * t * t * t;
			},

			/** Quint out. */
			quintOut : function(t) {
				return (t = t - 1) * t * t * t * t + 1;
			},

			/** Quint in and out. */
			quintInOut : function(t) {
				return ((t *= 2) < 1) ? (t * t * t * t * t) / 2 : ((t -= 2) * t * t * t * t + 2) / 2;
			},

			/** Sine in. */
			sineIn : function(t) {
				return -Math.cos(Ease.PI2 * t) + 1;
			},

			/** Sine out. */
			sineOut : function(t)
			{
				return Math.sin(Ease.PI2 * t);
			},

			/** Sine in and out. */
			sineInOut : function(t) {
				return -Math.cos(Ease.PI * t) / 2 + .5;
			},

			/** Bounce in. */
			bounceIn : function(t) {
				t = 1 - t;
				if (t < Ease.B1) return 1 - 7.5625 * t * t;
				if (t < Ease.B2) return 1 - (7.5625 * (t - Ease.B3) * (t - Ease.B3) + .75);
				if (t < Ease.B4) return 1 - (7.5625 * (t - Ease.B5) * (t - Ease.B5) + .9375);
				return 1 - (7.5625 * (t - Ease.B6) * (t - Ease.B6) + .984375);
			},

			/** Bounce out. */
			bounceOut : function(t) {
				if (t < Ease.B1) return 7.5625 * t * t;
				if (t < Ease.B2) return 7.5625 * (t - Ease.B3) * (t - Ease.B3) + .75;
				if (t < Ease.B4) return 7.5625 * (t - Ease.B5) * (t - Ease.B5) + .9375;
				return 7.5625 * (t - Ease.B6) * (t - Ease.B6) + .984375;
			},

			/** Bounce in and out. */
			bounceInOut : function(t) {

				if (t < .5)
				{
					t = 1 - t * 2;
					if (t < Ease.B1) return (1 - 7.5625 * t * t) / 2;
					if (t < Ease.B2) return (1 - (7.5625 * (t - Ease.B3) * (t - Ease.B3) + .75)) / 2;
					if (t < Ease.B4) return (1 - (7.5625 * (t - Ease.B5) * (t - Ease.B5) + .9375)) / 2;
					return (1 - (7.5625 * (t - Ease.B6) * (t - Ease.B6) + .984375)) / 2;
				}
				t = t * 2 - 1;
				if (t < Ease.B1) return (7.5625 * t * t) / 2 + .5;
				if (t < Ease.B2) return (7.5625 * (t - Ease.B3) * (t - Ease.B3) + .75) / 2 + .5;
				if (t < Ease.B4) return (7.5625 * (t - Ease.B5) * (t - Ease.B5) + .9375) / 2 + .5;
				return (7.5625 * (t - Ease.B6) * (t - Ease.B6) + .984375) / 2 + .5;
			},

			/** Circle in. */
			circIn : function(t)
			{
				return -(Math.sqrt(1 - t * t) - 1);
			},

			/** Circle out. */
			circOut : function(t) {
				return Math.sqrt(1 - (t - 1) * (t - 1));
			},

			/** Circle in and out. */
			circInOut : function(t)	{
				return t <= .5 ? (Math.sqrt(1 - t * t * 4) - 1) / -2 : (Math.sqrt(1 - (t * 2 - 2) * (t * 2 - 2)) + 1) / 2;
			},

			/** Exponential in. */
			expoIn : function(t) {
				return Math.pow(2, 10 * (t - 1));
			},

			/** Exponential out. */
			expoOut : function(t) {
				return -Math.pow(2, -10 * t) + 1;
			},

			/** Exponential in and out. */
			expoInOut : function(t) {
				return t < .5 ? Math.pow(2, 10 * (t * 2 - 1)) / 2 : (-Math.pow(2, -10 * (t * 2 - 1)) + 2) / 2;
			},

			/** Back in. */
			backIn : function(t) {
				return t * t * (2.70158 * t - 1.70158);
			},

			/** Back out. */
			backOut : function(t) {
				return 1 - (--t) * (t) * (-2.70158 * t - 1.70158);
			},

			/** Back in and out. */
			backInOut : function(t)	{
				t *= 2;
				if (t < 1) return t * t * (2.70158 * t - 1.70158) / 2;
				t --;
				return (1 - (--t) * (t) * (-2.70158 * t - 1.70158)) / 2 + .5;
			},

			// Easing constants.
			PI : Math.PI,
			PI2 : Math.PI / 2,
			B1 : 1 / 2.75,
			B2 : 2 / 2.75,
			B3 : 1.5 / 2.75,
			B4 : 2.5 / 2.75,
			B5 : 2.25 / 2.75,
			B6 : 2.625 / 2.75

			/**
			 * Operation of in/out easers:
			 *
			 * in(t)
			 *		return t;
			 * out(t)
			 * 		return 1 - in(1 - t);
			 * inOut(t)
			 * 		return (t <= .5) ? in(t * 2) / 2 : out(t * 2 - 1) / 2 + .5;
			 */
			};
		return Ease
	});