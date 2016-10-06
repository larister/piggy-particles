var game = new Phaser.Game(400,550, Phaser.AUTO,'', { preload: preload, create: create, update: update, render : render});

function preload() {

    game.load.image('player','./assets/red-asteroid.png');
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
	player = game.add.sprite(0,0, 'player');
	player.anchor.set(0.5);
}

function update(){

}

function render () {

}
