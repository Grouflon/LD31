if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Vector2 | 2 Dimensional Vector class
 * ===================================*/
define([

]
	, function () {
		/**
		 * Constructor
		 * @param x		X component of the vector
		 * @param y		Y component of the vector
		 * @constructor
		 */
		function Vector2(x, y) {
			this.x = x || 0;
			this.y = y || 0;
		}

		Vector2.prototype = {
			/**
			 * Angle of this Vector in radians
			 * @returns {Number}
			 */
			get angleR() {
				var normalized = this.normalized;
				var angle = Math.acos(normalized.x);
				if (normalized.y < 0)
				{
					angle += 2*(Math.PI - angle);
				}
				return angle;
			},
			set angleR(value) {
				this.rotateBy(-this.angleR).rotateBy(value);
			},

			/**
			 * Angle of this Vector in degrees
			 * @returns {Number}
			 */
			get angleD() {
				return this.angleR * 180 / Math.PI;
			},
			set angleD(value) {
				this.angleR = value * 180 / Math.PI;
			},

			/**
			 * Magnitude of the vector
			 * @returns {Number}
			 */
			get magnitude() { return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)); },
			set magnitude(value) { this.normalize().multiply(value); },

			/**
			 * Get a normalized copy of this vector
			 * @returns {Vector2}
			 */
			get normalized() {
				return this.clone().normalize();
			},

			/**
			 * Get a left perpendicular copy of this vector
			 * @returns {Vector2}
			 */
			get perpendicularLeft() {
				return new Vector2(this.y, -this.x);
			},

			/**
			 * Get a right perpendicular copy of this vector
			 * @returns {Vector2}
			 */
			get perpendicularRight() {
				return new Vector2(-this.y, this.x);
			},

			/**
			 * Get an opposite copy of this vector
			 * @returns {Vector2}
			 */
			get opposite() {
				return new Vector2(-this.x, -this.y);
			},

			/**
			 * Normalize this vector
			 * @returns {Vector2}	a reference to itself
			 */
			normalize : function() {
				var magnitude = this.magnitude;
				if (magnitude != 0)
				{
					this.x /= magnitude;
					this.y /= magnitude;
				} else {
					this.x = 0;
					this.y = 0;
				}
				return this;
			},

			/**
			 * Put x and y values to 0
			 */
			reset : function() {
				this.x = this.y = 0;
				return this;
			},

			/**
			 * Add a Vector to this one
			 * @param vector		Vector to add
			 * @returns {Vector2}	a reference to itself
			 */
			add : function(vector) {
				this.x += vector.x;
				this.y += vector.y;
				return this;
			},

			/**
			 * Subtract a Vector from this one
			 * @param	vector			Vector to subtract.
			 * @returns {Vector2}	a reference to itself
			 */
			subtract : function(vector) {
				this.x -= vector.x;
				this.y -= vector.y;
				return this;
			},

			/**
			 * Multiply this Vector by a number
			 * @param n
			 * @returns {Vector2}	a reference to itself
			 */
			multiply : function(n) {
				this.x *= n;
				this.y *= n;
				return this;
			},

			/**
			 * Scale this Vector by a Vector.
			 * @param	vector			Multiply by v.
			 * @return	{Vector2}	a reference to itself
			 */
			scaleBy : function(vector) {
				this.x *= vector.x;
				this.y *= vector.y;
				return this;
			},

			/**
			 * Rotate the Vector by an angle.
			 * @param	a			Rotation angle in Radians.
			 * @return	{Vector2}	a reference to itself
			 */
			rotateBy : function(a) {
				var tempX = this.x;
				var tempY = this.y;
				this.x = tempX * Math.cos(a) - tempY * Math.sin(a);
				this.y = tempX * Math.sin(a) + tempY * Math.cos(a);
				return this;
			},

			/**
			 * Project this Vector on another Vector.
			 * @param	vector			Vector to project on.
			 * @return	{Vector2}	a reference to itself
			 */
			projectOn : function(vector) {
				var projectedVector = vector.normalized.multiply(Vector2.dot(vector.normalized, this));
				this.x = projectedVector.x;
				this.y = projectedVector.y;
				return this;
			},

			/**
			 * Calculates the distance between two vectors.
			 * @param	vector		Distant vector.
			 * @return	{number}	Distance between the two vectors.
			 */
			distanceTo : function(vector) {
				var distanceVector = Vector2.subtract(vector, this);
				return distanceVector.magnitude;
			},

			draw : function(context, x, y, scale, color, lineWidth) {
				x = x || 0;
				y = y || 0;
				scale = scale || 1;
				color = color || '#000';
				lineWidth = lineWidth || 1;

				context.strokeStyle = color;
				context.lineWidth = lineWidth;

				context.beginPath();
				context.moveTo(x, y);
				context.lineTo(x + (this.x * scale), y + (this.y * scale));
				context.stroke();
			},

			clone : function() {
				return new Vector2(this.x, this.y);
			},

            print : function() {
                console.log("{" + this.x.toFixed(2) + ", " + this.y.toFixed(2) +"}");
            }
		};

		/**
		 * STATIC CONSTANTS & METHODS
		 */
		Vector2.UP = function() { return new Vector2(1, 0); };
		Vector2.LEFT = function() { return new Vector2(-1, 0); };
		Vector2.UP = function() { return new Vector2(0, -1); };
		Vector2.DOWN = function() { return new Vector2(0, 1); };

		/**
		 * Return the sum of 2 Vectors
		 * @param	v1			Base Vector
		 * @param	v2			Vector to add
		 * @return	{Vector2}	The sum of the 2 Vectors
		 */
		Vector2.add = function(v1, v2) {
			return new Vector2(v1.x + v2.x, v1.y + v2.y);
		};

		/**
		 * Return the difference of 2 Vectors
		 * @param	v1			Base Vector
		 * @param	v2			Vector to subtract
		 * @return	{Vector2}	The difference between the 2 Vectors
		 */
		Vector2.subtract = function(v1, v2) {
			return new Vector2(v1.x - v2.x, v1.y - v2.y);
		};

		/**
		 * Multiply a Vector by a number
		 * @param	v			Vector to multiply
		 * @param	n			Multiply by n
		 * @return	{Vector2}	The resulting Vector
		 */
		Vector2.multiply = function(v, n)
		{
			return new Vector2(v.x * n, v.y * n);
		};

		/**
		 * Returns the product of 2 Vectors
		 * @param	v1			Base Vector.
		 * @param	v2			vector to scale By.
		 * @return	{Vector2}	The resulting Vector
		 */
		Vector2.scale = function(v1, v2) {
			return new Vector2(v1.x * v2.x, v1.y * v2.y);
		};

		/**
		 * Calculates the distance between two vectors.
		 * @param	v1			First Vector2.
		 * @param	v2			Second Vector2.
		 * @return	{number}	Distance between the two vectors.
		 */
		Vector2.distanceBetween = function(v1, v2) {
			return v1.distanceTo(v2);
		};

		/**
		 * Calculates the angle between two vectors.
		 * @param	v1			First Vector2.
		 * @param	v2			Second Vector2.
		 * @return	{number}	Distance between the two vectors.
		 */
		Vector2.angleBetween = function(v1, v2) {
			//var sign:int = v1.x*v2.y - v1.y*v2.x < 0 ? 1 : -1;
			return /*sign * */ Math.acos(Vector2.dot(v1.normalized, v2.normalized));
		};

		/**
		 * Project one Vector along another.
		 * @param	v1			Vector to project.
		 * @param	v2			Vector to project on.
		 * @return	{Vector2}	projected Vector.
		 */
		Vector2.project = function(v1, v2) {
			return v2.normalized.multiply(Vector2.dot(v2.normalized, v1));
		};

		/**
		 * Calculate the dot product of two vectors.
		 * @param	v1			Vector 1.
		 * @param	v2			Vector 2.
		 * @return	{number} dot product.
		 */
		Vector2.dot = function(v1, v2) {
			return (v1.x * v2.x + v1.y * v2.y);
		};

		/**
		 * Calculate the wedge product of two vectors. if > 0, v2 is left from v1
		 * @param	v1			Vector 1.
		 * @param	v2			Vector 2.
		 * @return	{number}	wedge product.
		 */
		Vector2.wedge = function(v1, v2) {
			return (v1.x * v2.y - v1.y * v2.x);
		};


		return Vector2;
	});