if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
/* ===================================
 * Collision Functions
 * ===================================*/
define([

    ]
    , function () {
        return {
            circleCircle: function(x0, y0, r0, x1, y1 ,r1)
            {
                return Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2) <= Math.pow(r0 + r1, 2);
            },

            AABBAABB: function(x0min, y0min, x0max, y0max, x1min ,y1min, x1max, y1max)
            {
                return !(
                    x0max <= x1min ||
                    x0min >= x1max ||
                    y0max <= y1min ||
                    y0min >= y1max
                );
            }
        };
    });