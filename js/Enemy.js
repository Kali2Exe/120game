/**
 * Created by kevinwu on 5/4/17.
 */

function Enemy (game, frame, x, y) {
    //new Sprite(game, x, y, key, frame)
    //random x y location and uses Enemy image
    Phaser.Sprite.call(this, game, x, y, frame);

    //set anchor/origin to middle
    this.anchor.set(0.5);

    //the scale is random
    this.scale.x = 1;
    this.scale.y = 1;

    //enable physics and set to random velocity
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
	
    //this.body.velocity.x = game.rnd.integerInRange(0, 400);

}
//constructor
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;
var xspeed = 2;
var yspeed = 2;
Enemy.prototype.update = function() {
	
	this.x += xspeed;
	if(this.x >= game.world.width-80 || this.x <= 80){ //80 = half of sprite width
		xspeed = -xspeed;
	}
	this.y += yspeed;
	if(this.y >= game.world.height-80 || this.y <= 80){//80 = half of sprite height
		yspeed = -yspeed;
	}
	
	


    //wraps around world
    //game.world.wrap(this, 0, true);


};
