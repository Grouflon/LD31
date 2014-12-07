if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * Node
 * ===================================*/
define([
        'playgroundjs/abstract/barrennode',
        'playgroundjs/libs/signals/signal'
    ]
    , function (BarrenNode, Signal)
    {
        Node.prototype = Object.create(BarrenNode.prototype);

        /**** PUBLIC ****/

        Object.defineProperty(Node.prototype, "sChildAdded", {
           get: function() { return this._sChildAdded; }
        });

        Object.defineProperty(Node.prototype, "children", {
            get: function() { return this._children.concat(); }
        });

        Object.defineProperty(Node.prototype, "child_count", {
            get: function() { return this._children.length; }
        });

        function Node(name)
        {
            BarrenNode.call(this, name);
            this._children = [];
            this._sChildAdded = new Signal();
        }


        Node.prototype.addChild = function(node)
        {
            if (node == this) { console.error(this.name + ": a node cannot be its own child."); return; }
            if (this.isChild(node)) return;

            if (node instanceof BarrenNode)
            {
                node._parent = this;
                node._sParentChanged.dispatch();
                this._children.push(node);

                node.sParentChanged.addOnce(function() { this._onChildUnparented(node); }.bind(this));
                this._sChildAdded.dispatch(node);
            }
            else console.error(this.name + ": cannot add as a child an object that is not a node.");
        };

		Node.prototype.removeChild = function(node)
		{
			if (!this.isChild(node)) return;

			if (node instanceof BarrenNode)
			{
				node._parent = null;
				node._sParentChanged.dispatch();
			}
			else console.error(this.name + ": cannot remove as a child an object that is not a node.");
		};


        Node.prototype.isChild = function(node)
        {
            if (node instanceof BarrenNode)
            {
                for(var i in this._children)
                {
                    if (this._children[i] == node) return true;
                }
            }
            return false;
        };

		Node.prototype.indexOf = function(node)
		{
			if (node instanceof BarrenNode)
			{
				for(var i in this._children)
				{
					if (this._children[i] == node) return i;
				}
			}
			return -1;
		};


        Node.prototype.isDeepChild = function(node)
        {
            if (node instanceof BarrenNode)
            {
                for (var i in this._children)
                {
                    if (this._children[i] == node) return true;
                    else
                    {
                        if (this._children[i] instanceof Node && this._children[i].isDeepChild(node)) return true;
                    }
                }
            }
            return false;
        };


        Node.prototype.find = function(name) {
            var result = [];

            if (name)
            {
                for (var i in this._children) {
                    if (this._children[i].name === name) result.push(this._children[i]);
                }
            }
            return result;
        };


        Node.prototype.findByClass = function(clss) {
            var result = [];

            if (clss)
            {
                for (var i in this._children) {
                    if (this._children[i] instanceof clss) result.push(this._children[i]);
                }
            }
            return result;
        };


        Node.prototype.deepFind = function(name) {
            var result = [];

            if (name)
            {
                for (var i in this._children) {
                    if (this._children[i].name === name) result.push(this._children[i]);
                    if (this._children[i] instanceof Node) result = result.concat(this._children[i].deepFind(name));
                }
            }
            return result;
        };


        Node.prototype.deepFindByClass = function(clss) {
            var result = [];

            if (clss)
            {
                for (var i in this._children) {
                    if (this._children[i] instanceof clss) result.push(this._children[i]);
                    if (this._children[i] instanceof Node) result = result.concat(this._children[i].deepFindByClass(clss));
                }
            }
            return result;
        };


        Node.prototype.findFirst = function(name) {
            if (name)
            {
                for (var i in this._children) {
                    if (this._children[i].name === name) return this._children[i];
                }
            }
            return null;
        };


        Node.prototype.findFirstByClass = function(clss) {
            if (clss)
            {
                for (var i in this._children) {
                    if (this._children[i] instanceof clss) return this._children[i];
                }
            }
            return null;
        };


        Node.prototype.deepFindFirst = function(name) {
            if (name)
            {
                for (var i in this._children) {
                    if (this._children[i].name === name) return this._children[i];
                    if (this._children[i] instanceof Node)
                    {
                        var r = this._children[i].deepFindFirst(name);
                        if (r) return r;
                    }
                }
            }
            return null;
        };


        Node.prototype.deepFindFirstByClass = function(clss) {
            if (clss)
            {
                for (var i in this._children) {
                    if (this._children[i] instanceof clss) return this._children[i];
                    if (this._children[i] instanceof Node)
                    {
                        var r = this._children[i].deepFindFirstByClass(clss);
                        if (r) return r;
                    }
                }
            }
            return null;
        };


        /**** PRIVATE ****/

        Node.prototype._onChildUnparented = function(child)
        {
            var childIndex = this._children.indexOf(child);
            this._children.splice(childIndex, 1);
        };


        Node.prototype._sChildAdded = null;
        Node.prototype._children = null;

        return Node;
    });