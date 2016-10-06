var game = new Phaser.Game(400,550, Phaser.AUTO,'', { preload: preload, create: create, update: update, render : render});

var player = null;
var roids = null;
var planet = 0;
var timer;
var centerX = 200;
var centerY = 225;
var planetRadius = 72;
var angle = 0;
var GRAVITATIONAL_CONSTANT = 1;/* this depends on what feels right for your game */;

function preload() {

    game.load.image('player','./assets/red-asteroid.png');
    game.load.image('enemy','./assets/grey-asteroid.png');
    game.load.image('planet','./assets/red-planet.png');
    game.load.image('background','./assets/space-background.png');
    game.load.image('particle','./assets/particle.png')
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

	game.physics.arcade.enable(planet);

	planet.body.setCircle(planetRadius);

	player = game.add.sprite(0,0, 'player');
	player.anchor.set(0.5);

	// Enables the physics calculations on these sprites
	game.physics.arcade.enable(player);

	roids = game.add.group();

	roids.enableBody = true;
	roids.physicsBodyType = Phaser.Physics.ARCADE;

	roids.createMultiple(40,'enemy');

	timer = game.time.events.loop(1500,newEnemy,this);

  emitter = game.add.emitter(0, 0, 100);
  emitter.gravity = 0;
  emitter.makeParticles('particle');
}

function newEnemy(){

	var roid = roids.getFirstDead();
	roid.anchor.set(0.5);
	var isTop = (Math.random() >= 0.5);

	var x = game.rnd.between(0,400);
	var y = 0;

	if(isTop){
		y = Math.random() * 40;
	}
	else{
		y = game.rnd.between(450,550);
	}

	roid.reset(x,y);

	var angle = game.physics.arcade.moveToXY(roid,centerX + game.rnd.between(-50,50),centerY,50);

	roid.rotation = angle;
}

function onFail() {
	game.paused = true;
  console.log('hey');
}

function onHit (player,roid) {

	game.camera.shake(0.02,100);
  emitter.x = roid.x;
  emitter.y = roid.y;
  emitter.start(true, 2000, null, 10);

  roid.kill();
}

function update(){

  game.physics.arcade.collide(player,roids,null,onHit);
  game.physics.arcade.collide(planet,roids,null,onFail);

  var pointer = game.input.activePointer;

  if(pointer.isDown)
  {
  	if(pointer.x < centerX)
  	{
  		angle += 0.1;
  	}
  	else{
  		angle -= 0.1;
  	}
  }

   player.body.x = centerX + Math.cos(angle) * 120;
   player.body.y = centerY + Math.sin(angle) * 120;

}

function render () {
	game.debug.body(planet)
}
