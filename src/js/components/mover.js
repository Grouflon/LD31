if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * Mover
 * ===================================*/
define([
        'playgroundjs/component',
        "playgroundjs/input/keyboard",
        "playgroundjs/utils/keys",
        "playgroundjs/utils/math/vector2"
    ]
    , function (Component, Keyboard, Keys, Vector2)
    {
        Mover.prototype = Object.create(Component.prototype);

        /**** PUBLIC ****/

        Mover.prototype.speed = 10.0;

        function Mover(speed)
        {
            Component.call(this, "Mover");
            this.speed = speed || 10.0;
        }


        Mover.prototype.update = function(elapsed)
        {
            var direction = new Vector2;
            if (Keyboard.check(Keys.A)) direction.x -= 1;
            if (Keyboard.check(Keys.D)) direction.x += 1;
            if (Keyboard.check(Keys.W)) direction.y -= 1;
            if (Keyboard.check(Keys.S)) direction.y += 1;
            direction.normalize();

            this.parent.x += direction.x * this.speed * elapsed;
            this.parent.y += direction.y * this.speed * elapsed;
        };


        /**** PRIVATE ****/

        return Mover;
    });