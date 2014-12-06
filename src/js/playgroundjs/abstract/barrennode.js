if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * Barren Node
 * ===================================*/
define([
        'playgroundjs/libs/signals/signal'
    ]
    , function (Signal, Node)
    {
        /**** PUBLIC ****/

        BarrenNode.prototype.name = "";

        Object.defineProperty(BarrenNode.prototype, "parent", {
            get: function () { return this._parent; },
            set: function(value)
            {
                if (value != this._parent)
                {
					if (this._parent) this._parent.removeChild(this);
					if (value && typeof value.addChild === "function") value.addChild(this);
                }
            }
        });

        Object.defineProperty(BarrenNode.prototype, "sParentChanged", {
            get: function () { return this._sParentChanged; }
        });


        function BarrenNode(name)
        {
            this.name = name ? name : "Node";
            this._sParentChanged = new Signal();
        }


        /**** PRIVATE ****/

        BarrenNode.prototype._sParentChanged = null;
        BarrenNode.prototype._parent = null;

        return BarrenNode;
    });