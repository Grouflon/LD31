if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * Resources manager
 * ===================================*/
define([
        "playgroundjs/resources/resource"
    ]
    , function (Resource)
    {
        var Resources = {};

        /**** STATIC ****/

		Object.defineProperty(Resources, "allResourcesLoaded", {
			get: function() {
				for (var i in this._resources) { if (!this._resources[i].loaded) return false; }
				return true
			}
		});

        Resources.loadImage = function(name, path, callback)
        {
            return this._load(Resource.types.IMAGE, name, path, callback);
        };

        Resources.loadJSON = function(name, path, callback)
        {
            return this._load(Resource.types.JSON, name, path, callback);
        };

		Resources.loadXML = function(name, path, callback)
		{
			return this._load(Resource.types.XML, name, path, callback);
		};

        Resources.loadAudio = function(name, path, callback)
        {
            return this._load(Resource.types.AUDIO, name, path, callback);
        };


        Resources.get = function(name)
        {
            if (this._resources.hasOwnProperty(name)) return this._resources[name];
            else return null;
        };


        /**** PRIVATE STATIC ****/
        Resources._load = function(type, name, path, callback)
        {
            var res = new Resource(type, name, path);
            if (callback) res.sLoaded.addOnce(callback);
            this._resources[name] = res;
            return res;
        };

        Resources._resources = {};


        return Resources;
    });