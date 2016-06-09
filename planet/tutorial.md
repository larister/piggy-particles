## Introduction to game development in JavaScript ##


### Quick history ###

While it has been theoretically possible to make JavaScript games using only DOM elements for decades, Adobe Flash and its browser plugin remained the preferred way of gaming within a browser and "web games" and "flash games" were synonyms for a while.
In 2007 a standard was created to give people the ability to draw graphics, along with a new element, the <canvas> tag.
Since then, Canvas has not been restricted to games we've been using it for a variety of purposes outside of game development, ranging from real-time audio visualisations to charts and preloaders.
Later, in 2011 the Khronos Group started working on WebGL, an implementation of OpenGL ES 2.0 in the browser in JavaScript, it offers us fast, hardware-accelerated graphics capabilities for an artistic freedom that wasn't possible since the old flash days.
When it first became available, WebGL didn't work on many computers and didn't perform well on mobile devices, thankfully for us this time is now over, and fully-fledged cross-platform games frameworks have arrived and are calling for you to use them.

### Phaser ###

Phaser is a free, open-source and comprehensive HTML5 game framework built on top of pixi.js, the open-source rendering engine. It offers you everything you need get started making games with a minimal overhead. It was built and is currently maintained by Photon Storm Ltd in the UK.

We are going to use Phaser throughout this tutorial to create a cross-platform running game.

### Set-up ###

References : (If you need help, not required)

The main repository can be found on github: http://github.com/photonstorm/phaser

The documentation is here : http://phaser.io/docs

The examples are here : http://phaser.io/examples

---

You need to have a web server on your computer to use Phaser, you can get one by:
- Downloading Wamp on windows or Mamp on a mac
- on a UNIX computer, run ` python -m SimpleHTTPServer` from the folder where your game is
- using the `http-server` module on node.js/npm

### Getting started ###

Include the phaser.js file and use this code:

```
var game = new Phaser.Game(400,550, Phaser.AUTO,'', { preload: preload, create: create, update: update, render : render});

var hero = null;
var pipes = null;
var planet = null;
var centerX = 200;
var centerY = 225;
var angle = 0;

function preload() {

    game.load.image('player','assets/red-asteroid.png');
    game.load.image('enemy','assets/grey-asteroid.png');
    game.load.image('planet','assets/exo-planet.png');
    game.load.image('background','assets/space-background.png');
}

function create(){

	game.stage.backgroundColor = '#060010';

	//Starts the arcade physics
	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.minWidth = 200;
    game.scale.minHeight = 225;
    game.scale.maxWidth = 400;
    game.scale.maxHeight = 550;
    game.scale.pageAlignHorizontally = true;

    start();

}

function start () {

}

function update(){

}

```

Also available as a codepen:
http://codepen.io/photonstorm/pen/KHCDk

### All of this for an IMAGE??? ###

I know that the example above is not really impressive, but hang on, we'll get there.
First of all we need to be able to control our runner and then make it interact with other objects, this is where a very important concept of game development comes into play, Physics!
Don't worry, you don't have to look up the Laws of Motion, the framework will do it all for you.
With code and physics, we refer to the physical representation of a game object as a *physics body* that will be affected by gravity, collide with other objects, etc.

Let's create a player and set-up a physics body:

```
hero = game.add.sprite(100, 200, 'hero');
hero.anchor.set(0.5);

// Enables the physics calculations on this sprite
game.physics.arcade.enable(hero);

hero.body.gravity.y = 700;

hero.body.collideWorldBounds = true;
```
