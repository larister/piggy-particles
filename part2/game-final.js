var game = new Phaser.Game(400,550, Phaser.AUTO,'', { preload: preload, create: create, update: update, render : render});

var player = null;
var roids = null;
var planet = 0;
var timer;
var centerX = 200;
var centerY = 225;
var angle = 0;
var activeObjects = [];
var planets = [];
var GRAVITATIONAL_CONSTANT = 1;/* this depends on what feels right for your game */;

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

	game.physics.arcade.enable(planet);

	planet.body.setCircle(80);

  planets.push(planet);

	player = game.add.sprite(0,0, 'player');
	player.anchor.set(0.5);

	// Enables the physics calculations on these sprites
	game.physics.arcade.enable(player);

	roids = game.add.group();

	roids.enableBody = true;
	roids.physicsBodyType = Phaser.Physics.ARCADE;

	roids.createMultiple(40,'enemy');

	timer = game.time.events.loop(2500,newEnemy,this);
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

  activeObjects.push(roid);

	// var angle = game.physics.arcade.moveToXY(roid,centerX,centerY,50);
  //
	// roid.rotation = angle;

}

function onFail() {
	game.paused = true;
}

function onHit (player,roid) {

	roid.kill();
	game.camera.shake(0.02,100);
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

   for (var i = 0; i < activeObjects.length; i++) {
     var asteroid = activeObjects[i];

     for (var j = 0; j < planets.length; j++) {
       var planet = planets[j];
       var dx = planet.x - asteroid.x;
       var dy = planet.y - asteroid.y;
       var distanceSquared = dx * dx + dy * dy;
       var distance = Math.sqrt(distanceSquared);
       var acceleration = GRAVITATIONAL_CONSTANT * planet.mass / distanceSquared;
       asteroid.velocity.x += acceleration * (dx / distance);
       asteroid.velocity.y += acceleration * (dy / distance);
     }
   }

  //  for (var projectile in projectiles) {
  //    for (var planet in planets) {
  //      var dx = planet.x - projectile.x;
  //      var dy = planet.y - projectile.y;
  //      var distanceSquared = dx * dx + dy * dy;
  //      var distance = Math.sqrt(distanceSquared);
  //      var acceleration = GRAVITATIONAL_CONSTANT * planet.mass / distanceSquared;
  //      projectile.velocityX += acceleration * (dx / distance);
  //      projectile.velocityY += acceleration * (dy / distance);
  //    }
  //    projectile.x += projectile.velocityX;
  //    projectile.y += projectile.velocityY;
  //  }

}

function render () {
	game.debug.body(planet)
}
