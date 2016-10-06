var game = new Phaser.Game(400,550, Phaser.AUTO,'', { preload: preload, create: create, update: update});

var player = null;
var roids = null;
var planet = 0;
var timer;
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
    game.scale.maxWidth = 800;
    game.scale.maxHeight = 1100;
    game.scale.pageAlignHorizontally = true;

    start();

}

function start () {

	planet = game.add.sprite(centerX,centerY,'planet');
	planet.anchor.set(0.5);
}

function update(){

}
