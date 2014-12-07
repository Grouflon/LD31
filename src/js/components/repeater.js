if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Repeater Component
 * ===================================*/
define([
		"playgroundjs/component"
	]
	, function (Component)
	{
		Repeater.prototype = Object.create(Component.prototype);

		/**** PUBLIC ****/
		function Repeater(clonePattern)
		{
			Component.call(this, "Repeater");
			this._clonePattern = clonePattern;
		}

		Repeater.prototype.start = function()
		{
			var i;
			this._topClones = this._clonePattern(0, -this.parent.world.game.height, this.parent);
			this._bottomClones = this._clonePattern(0, this.parent.world.game.height, this.parent);
			this._leftClones = this._clonePattern(-this.parent.world.game.width, 0, this.parent);
			this._rightClones = this._clonePattern(this.parent.world.game.width, 0, this.parent);

			for (i in this._topClones) { this._topClones[i].enabled = this._topClones[i].visible = false; }
			for (i in this._bottomClones) { this._bottomClones[i].enabled = this._bottomClones[i].visible = false; }
			for (i in this._leftClones) { this._leftClones[i].enabled = this._leftClones[i].visible = false; }
			for (i in this._rightClones) { this._rightClones[i].enabled = this._rightClones[i].visible = false; }
		};

		Repeater.prototype.update = function(elapsed)
		{
			for (i in this._topClones) { this._topClones[i].enabled = this._topClones[i].visible = false; }
			for (i in this._bottomClones) { this._bottomClones[i].enabled = this._bottomClones[i].visible = false; }
			for (i in this._leftClones) { this._leftClones[i].enabled = this._leftClones[i].visible = false; }
			for (i in this._rightClones) { this._rightClones[i].enabled = this._rightClones[i].visible = false; }

			var camAABB = this.parent.world.cameraAABB;
			var selfAABB = this.parent.collisionGlobalAABB;
			var i;

			camAABB.min.x += 16;
			camAABB.min.y += 16;
			camAABB.max.x -= 16;
			camAABB.max.y -= 16;

			// TOP OUT
			if ((selfAABB.min.y < camAABB.min.y) && (selfAABB.max.y > camAABB.min.y))
			{
				for (i in this._bottomClones) {	this._bottomClones[i].enabled = this._bottomClones[i].visible = true; }
			}
			else if ((selfAABB.min.y < camAABB.min.y) && (selfAABB.max.y < camAABB.min.y))
			{
				for (i in this._bottomClones) { this._bottomClones[i].enabled = this._bottomClones[i].visible = false; }
				this.parent.translateBy(0, this.parent.world.game.height);
			}

			// BOTTOM OUT
			if ((selfAABB.max.y > camAABB.max.y) && (selfAABB.min.y < camAABB.max.y))
			{
				for (i in this._topClones) { this._topClones[i].enabled = this._topClones[i].visible = true; }
			}
			else if ((selfAABB.max.y > camAABB.max.y) && (selfAABB.min.y > camAABB.max.y))
			{
				for (i in this._topClones) { this._topClones[i].enabled = this._topClones[i].visible = false; }
				this.parent.translateBy(0, -this.parent.world.game.height);
			}

			// LEFT OUT
			if ((selfAABB.min.x < camAABB.min.x) && (selfAABB.max.x > camAABB.min.x))
			{
				for (i in this._rightClones) { this._rightClones[i].enabled = this._rightClones[i].visible = true; }
			}
			else if ((selfAABB.min.x < camAABB.min.x) && (selfAABB.max.x < camAABB.min.x))
			{
				for (i in this._rightClones) { this._rightClones[i].enabled = this._rightClones[i].visible = false; }
				this.parent.translateBy(this.parent.world.game.width, 0);
			}

			// RIGHT OUT
			if ((selfAABB.max.x > camAABB.max.x) && (selfAABB.min.x < camAABB.max.x))
			{
				for (i in this._leftClones) { this._leftClones[i].enabled = this._leftClones[i].visible = true; }
			}
			else if ((selfAABB.max.x > camAABB.max.x) && (selfAABB.min.x > camAABB.max.x))
			{
				for (i in this._leftClones) { this._leftClones[i].enabled = this._leftClones[i].visible = false; }
				this.parent.translateBy(-this.parent.world.game.width, 0);
			}

			//console.log(this._parent.x, this._parent.y);
		};

		/**** PRIVATE ****/
		Repeater.prototype._topClones = null;
		Repeater.prototype._bottomClones = null;
		Repeater.prototype._leftClones = null;
		Repeater.prototype._rightClones = null;
		Repeater.prototype._clonePattern = null;

		return Repeater;
	});