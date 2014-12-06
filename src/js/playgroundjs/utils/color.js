if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Color
 * ===================================*/
define([

	]
	, function () {
		// TODO : multiple contructors for hex, rgba, tsl etc...
		function Color() {

			// Hexadecimal color
			if (arguments.length == 1 && typeof arguments[0] === "string") {
				this.hex = arguments[0];
			}

			// rgb(a) color
			/*if (arguments.length == 3 || arguments.length == 4) {

			}*/
		}

		Color.prototype.r = 0;
		Color.prototype.g = 0;
		Color.prototype.b = 0;

		Object.defineProperty(Color.prototype, "hex", {
			get : function() {
				var r = this.r.toString(16);
				var g = this.g.toString(16);
				var b = this.b.toString(16);

				if (r.length == 1) r = "0" + r;
				if (g.length == 1) g = "0" + g;
				if (b.length == 1) b = "0" + b;

				return "#" + r + g + b;
			},
			set : function(value) {
				var rgba = Color.hexToRGBA(value);
				this.r = rgba.r;
				this.g = rgba.g;
				this.b = rgba.b;
			}
		});

		Color._formatA = /^#([0-9a-fA-F]{1}){3,4}/;	// #rgb(a) format
		Color._formatB = /^#([0-9a-fA-F]{2}){3,4}/;	// #rrggbb(aa) format

		Color.validateHex = function(hex) {
			var regexp,
				rgbaColor,
				r,
				g,
				b,
				a;

			try {
				// Detect hex format
				if (hex.length == 4 || hex.length == 5) {
					regexp = Color._formatA;
				} else if (hex.length == 7 || hex.length == 9) {
					regexp = Color._formatB;
				} else {
					throw ('wrong color format');
				}

				// Check color format
				if (!hex.match(regexp)) {
					throw ('wrong color format');
				} else {
					// Switch formatA to formatB
					if (regexp == Color._formatA) {
						r = hex[1];
						g = hex[2];
						b = hex[3];
						if (hex.length == 5) a = hex[4];

						rgbaColor = '#' + r + r + g + g + b + b;

						if (a) rgbaColor += a + a;
					}
					return rgbaColor ? rgbaColor : hex;
				}
			} catch(error) {
				console.error(hex + ' : invalid color format');
			}
		};

		Color.hexToRGBA = function(hex) {
			var rgba;

			hex = Color.validateHex(hex);

			if (hex) {
				rgba = {
					r : parseInt(hex.substr(1, 2), 16),
					g : parseInt(hex.substr(3, 2), 16),
					b : parseInt(hex.substr(5, 2), 16)/*,
					a : parseInt(hex.substr(7, 2), 16)*/
				};

				//if (!rgba.a) rgba.a = 255;
			}

			return rgba
		};

		return Color;
	});