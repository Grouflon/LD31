if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * World
 * ===================================*/
define([
        'playgroundjs/world'
    ]
    , function (World) {
        SandBox.prototype = Object.create(World.prototype);

        /**** PUBLIC ****/

        function SandBox() {
            World.call(this, "Sand Box");
        }

        SandBox.prototype.begin = function() { console.log("begin"); };
        SandBox.prototype.end = function() { console.log("end"); };
        SandBox.prototype.update = function() {};

        return SandBox;
    });