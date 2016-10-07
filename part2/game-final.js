var game = new Phaser.Game(400,550, Phaser.AUTO,'', { preload: preload, create: create, update: update, render : render});

const startOffset = 70;

const piggySystems = [];
let piggies;

function preload() {
    game.load.image('piggy','./assets/piggy.png');
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

    game.input.onDown.add(startParticles);

}

function startParticles(pointer) {
    piggies = new ParticleSystem();
    piggies.show(pointer.x, pointer.y);
    piggySystems.push(piggies);
}


function update(){
    for (var i = 0; i < piggySystems.length; i++) {
        piggySystems[i].update();
    }
}

function render() {

}

function ParticleSystem() {
    this.piggies = [];
}

ParticleSystem.prototype.show = function(x, y) {
    for (var i = 0; i < 500; i++) {
        var piggy = game.add.sprite(0,0, 'piggy');

        piggy.anchor.set(0.5);

        piggy.x = x + game.rnd.between(-startOffset, startOffset);
        piggy.y = y + game.rnd.between(-startOffset, startOffset);
        piggy.velocityX = game.rnd.between(-5, 5);
        piggy.velocityY = game.rnd.between(-4, 1.2);
        piggy.angularVelocity = game.rnd.between(-5, 5);
        piggy.scale.set(game.rnd.between(0.5, 1.2));

        this.piggies.push(piggy);
    }
}

ParticleSystem.prototype.update = function() {
    this.piggies.forEach(function(piggy) {
        const halfPiggyWidth = piggy.width / 2;
        const halfPiggyHeight = piggy.height / 2;

        piggy.velocityY += 0.3;
        piggy.x += piggy.velocityX;
        piggy.y += piggy.velocityY;

        piggy.angle += piggy.angularVelocity;
        //piggy.rotation = Math.atan2(piggy.velocityY, piggy.velocityX);

        if(piggy.x > (400 - halfPiggyWidth) && piggy.velocityX > 0) {
            piggy.velocityX *= -0.8;
        }
        if(piggy.x < (0 + halfPiggyWidth) && piggy.velocityX < 0) {
            piggy.velocityX *= -0.8;
        }
        if(piggy.y > (550 - halfPiggyHeight) && piggy.velocityY > 0) {
            piggy.velocityY *= -0.8;
        }
    });
}
