if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Sandbox world
 * ===================================*/
define([
		"playgroundjs/world"
	]
	, function (World)
	{
		Sandbox.prototype = Object.create(World.prototype);
		/**** PUBLIC ****/

		function Sandbox()
		{
			World.call(this, "Sandbox");
		}

		return Sandbox;
	});