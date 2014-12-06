if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Polygon
 * ===================================*/
define([
	'engine/utils/math/vector2'
]
	, function (Vector2) {
		function Poly(vertices) {
			this.vertices = this.vertices.concat(vertices);
		}

		Poly.prototype.vertices = [];

		Poly.prototype.translate = function(x, y) {
			for (var i in this.vertices) {
				this.vertices[i].x += x;
				this.vertices[i].y += y;
			}

			return this;
		};

		Poly.prototype.rotate = function(angle, x, y) {
			x = x || 0;
			y = y || 0;

			for (var i in this.vertices) {
				var vertex = this.vertices[i];
				var tempVertex = vertex.clone();
				var origin = new Vector2(x, y);

				tempVertex.subtract(origin);
				tempVertex.rotateBy(angle);
				tempVertex.add(origin);

				vertex.x = tempVertex.x;
				vertex.y = tempVertex.y;
			}

			return this;
		};

		Poly.prototype.scale = function(scale, x, y) {
			x = x || 0;
			y = y || 0;

			for (var i in this.vertices) {
				var vertex = this.vertices[i];
				var tempVertex = vertex.clone();
				var origin = new Vector2(x, y);

				tempVertex.subtract(origin);
				tempVertex.multiply(scale);
				tempVertex.add(origin);

				vertex.x = tempVertex.x;
				vertex.y = tempVertex.y;
			}
		};

		Poly.prototype.draw = function(context, x, y, color) {
			x = x || 0;
			y = y || 0;
			color = color || "#000";

			context.beginPath();
			context.moveTo(this.vertices[0].x + x, this.vertices[0].y + y);
			for (var i = 1; i < this.vertices.length; i++) {
				context.lineTo(this.vertices[i].x + x, this.vertices[i].y + y);
			}

			context.closePath();
			context.lineWidth = 1;
			context.strokeStyle = color;
			context.stroke();
		};

		Poly.prototype.clone = function() {
			var clonedVertices = [];

			for (var i in this.vertices) {
				clonedVertices.push(this.vertices[i].clone());
			}

			return new Poly(clonedVertices);
		};

		Object.defineProperty(Poly.prototype, 'edges', {
			get : function() {
				var edges = [];

				for (var i in this.vertices) {
					var next = i < this.vertices.length - 1 ? parseInt(i) + 1 : 0; // Index of next vertex, reset to 0 if last

					edges.push([
						this.vertices[i],
						this.vertices[next]
					]);
				}

				return edges;
			}
		});

		Object.defineProperty(Poly.prototype, 'centroid', {
			get : function() {
				var centroid = new Vector2();
				for (var i in this.vertices) {
					centroid.add(this.vertices[i]);
				}

				centroid.multiply(1 / this.vertices.length);
				return centroid;
			}
		});

		Object.defineProperty(Poly.prototype, 'aabb', {
			get : function() {
				var aabb = { min : { x : this.vertices[0].x, y : this.vertices[0].y }, max : { x : this.vertices[0].x, y : this.vertices[0].y } };

				for (var i in this.vertices) {
					var vertex = this.vertices[i];

					if (vertex.x < aabb.min.x) aabb.min.x = vertex.x;
					if (vertex.y < aabb.min.y) aabb.min.y = vertex.y;
					if (vertex.x > aabb.max.x) aabb.max.x = vertex.x;
					if (vertex.y > aabb.max.y) aabb.max.y = vertex.y;
				}

				return aabb;
			}
		});

		// TODO : centre du cercle comprenant tous les sommets

		return Poly;
	});