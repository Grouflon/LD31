if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * Component
 * ===================================*/
define([
        'playgroundjs/abstract/barrennode'
    ]
    , function (BarrenNode)
    {
        Component.prototype = Object.create(BarrenNode.prototype);

        /**** PUBLIC ****/

		Component.prototype.enabled = true;

        function Component(name)
        {
            BarrenNode.call(this, name);
        }


        /** Override these functions for custom behavior **/
        Component.prototype.start = function() {};
        Component.prototype.update = function(elapsed) {};
        Component.prototype.destroyed = function() {};


        /**** PRIVATE ****/

        Component.prototype._start = function()
        {
            if (!this._started)
            {
                this._started = true;
                this.start();
            }
        };

		Component.prototype._destroy = function()
		{
			this.parent = null;
			this.destroyed();
		};

        Component.prototype._toDestroy = false;
        Component.prototype._started = false;

        return Component;
    });