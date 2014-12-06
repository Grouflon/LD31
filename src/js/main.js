if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Main
 * ===================================*/
define([
        "playgroundjs/game",
        "sandbox",
        "playgroundjs/gameobject",
        "playgroundjs/graphics/circle",
        "playgroundjs/graphics/rectangle",
        "playgroundjs/colliders/circlecollider",
        "playgroundjs/colliders/aabbcollider",
        "playgroundjs/resources",
        "playgroundjs/sound",
        "components/mover"
    ]
	, function (Game, SandBox, GameObject, Circle, Rectangle, CircleCollider, AABBCollider, Resources, Sound, Mover)
    {
        // Game Parameters
        var game = new Game("container", 800, 600, "#000");
        game.debug = true;

		// Game start
        var sandbox = new SandBox();
        game.world = sandbox;

        var o = new GameObject("go", 0, 0);
        var o2 = new GameObject("go2", 400, 300);
		sandbox.addChild(o);
		sandbox.addChild(o2);

        var json = Resources.loadJSON("data", "data/data.json", function()
        {
            console.log(json.value);
        });

        var sound;
        var audio = Resources.loadAudio("data", "audio/Robert del Naja - VC.wav", function()
        {
            sound = new Sound(audio.value);
            //sound.play();
        });

        var c = new AABBCollider(50, 30, -25, -15);
        var c2 = new AABBCollider(10, 50, -5, -25);
        o.addChild(new Rectangle(50, 30, "#f00", -25, -15));
        o2.addChild(new Rectangle(10, 50, "#0f0", -5, -25));

        o.addChild(c);
        o2.addChild(c2);

        var mover = new Mover(200.0);
        o.addChild(mover);

        o.update = function(elapsed)
        {
            sandbox.setCamera(o.x - game.width / 2, o.y - game.height / 2);

            var go = this.collideFirst();
            if (go){ this._children[0].color = "#00f"; }
            else this._children[0].color = "#f00";
        };

        game.start();
	});