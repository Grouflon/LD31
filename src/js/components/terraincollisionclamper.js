if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * TerrainCollisionClamper Component
 * ===================================*/
define([
		"playgroundjs/component",
		"playgroundjs/utils/math/collisions"
	]
	, function (Component, Collisions)
	{
		TerrainCollisionClamper.prototype = Object.create(Component.prototype);

		/**** PUBLIC ****/
		function TerrainCollisionClamper()
		{
			Component.call(this, "TerrainCollisionClamper");
		}

		TerrainCollisionClamper.prototype.start = function()
		{

		};

		TerrainCollisionClamper.prototype.update = function(elapsed)
		{
			var colliders = this.parent.world.colliders;
			var terrainTypes = ["solid", "trap"];
			var AABB;
			var cameraAABB = this.parent.world.cameraAABB;
			for (var i in colliders){
				if (terrainTypes.indexOf(colliders[i].type) >= 0)
				{
					AABB = colliders[i].globalAABB;
					if (Collisions.AABBAABB(AABB.min.x, AABB.min.y, AABB.max.x, AABB.max.y, cameraAABB.min.x, cameraAABB.min.y, cameraAABB.max.x, cameraAABB.max.y))
					{
						colliders[i].enabled = true;
					}
					else colliders[i].enabled = false;
				}
			}
		};

		/**** PRIVATE ****/

		return TerrainCollisionClamper;
	});