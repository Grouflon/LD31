if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * Resource
 * ===================================*/
define([
        "playgroundjs/libs/signals/signal",
        "playgroundjs/utils/data"
    ]
    , function (Signal, Data) {
        /**** PUBLIC ****/

        Object.defineProperty(Resource.prototype, "name", { get: function () { return this._name; }});
        Object.defineProperty(Resource.prototype, "type", { get: function () { return this._type; }});
        Object.defineProperty(Resource.prototype, "loaded", { get: function () { return this._loaded; }});
        Object.defineProperty(Resource.prototype, "value", { get: function () { return this._value; }});
        Object.defineProperty(Resource.prototype, "sLoaded", { get: function () { return this._sLoaded; }});
        Object.defineProperty(Resource.prototype, "sLoadFailed", { get: function () { return this._sLoadFailed; }});

        function Resource(type, name, path) {
            this._sLoaded = new Signal();
            this._sLoadFailed = new Signal();
            this._name = name;
            this._type = type;

            switch (this._type) {
                case Resource.types.IMAGE:
                {
                    this._value = new Image();
                    this._value.src = path;
                    this._value.onload = this._onLoad.bind(this);
                    this._value.onerror = this._onLoadError.bind(this);
                    break;
                }

                case Resource.types.JSON:
                {
                    Data.loadJSON(path, function(data)
                    {
                        this._value = data;
                        this._onLoad();
                    }.bind(this));
                    break;
                }

                case Resource.types.AUDIO:
                {
                    this._value = new Audio(path);
                    this._value.autoplay = false;
                    console.log("lala");
                    this._value.addEventListener("canplaythrough", function()
                    {
                        this._onLoad();
                    }.bind(this));
                    break;
                }
            }
        }


        /**** PRIVATE ****/

        Resource.prototype._onLoad = function ()
        {
            this._loaded = true;
            this._sLoaded.dispatch();
        };


        Resource.prototype._onLoadError = function ()
        {
            console.error("Failed to load resource \"" + this.name + "\".");
            this._sLoadFailed.dispatch();
        };

        Resource.prototype._name = null;
        Resource.prototype._type = null;
        Resource.prototype._value = null;
        Resource.prototype._loaded = false;
        Resource.prototype._sLoaded = null;
        Resource.prototype._sLoadFailed = null;

        /**** STATIC ****/

        Resource.types = {
            IMAGE: 0,
            AUDIO: 1,
            JSON: 2
        };


        return Resource;
    });