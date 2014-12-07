if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Speech GameObject
 * ===================================*/
define([
		"playgroundjs/gameobject",
		"playgroundjs/colliders/aabbcollider"
	]
	, function (GameObject, AABBCollider)
	{
		Speech.prototype = Object.create(GameObject.prototype);
		/**** PUBLIC ****/

		Object.defineProperty(Speech.prototype, "value", {
			get: function()	{ return this._value; }
		});

		function Speech(value, x, y, width, height)
		{
			GameObject.call(this, "Speech", x, y);
			this._value = value;
			this.addChild(new AABBCollider(width, height, 0, 0, "speech"));
		}

		/**** PRIVATE ****/

		Speech.prototype._value = "";

		return Speech;
	});