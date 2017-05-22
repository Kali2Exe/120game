/**
 * Created by kevinwu on 5/4/17.
 */

function Enemy (game, key, frame, x, y, key2, frame2) {
    //new Sprite(game, x, y, key, frame)
    //random x y location and uses Enemy image

    console.log(x);
    this.leftFace = null;
    if (x <= 600) {
        this.leftFace = false;
    } else {
        this.leftFace = true;
    }

    //eraser
    this.eraser = new Eraser(game, key2, frame2, x, y);
    //game.add.existing(this.eraser);
    //Enemy Sprite
    Phaser.Sprite.call(this, game, x, y, key, frame);
    game.add.existing(this);

    //set anchor/origin to middle
    this.anchor.set(0.5);

    //scale of fish and direction it faces
    if (this.leftFace) {
        this.scale.x = -1;
        this.eraser.scale.x = -1;
        this.eraser.x = this.x + 46;
        this.eraser.y = this.y - 32;
    } else {
        this.scale.x = 1;
        this.eraser.scale.x = 1;
        this.eraser.x = this.x - 46;
        this.eraser.y = this.y - 32;
    }
    this.scale.y = 1;
    this.eraser.scale.y = 1;

    this.animations.add('swimE', Phaser.Animation.generateFrameNames('enemyR', 1, 4, '', 1), 5, true);
    this.animations.play('swimE');

    //enable physics and set to random velocity
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    //velocity st
    this.body.velocity.setTo(100);

    this.body.bounce.setTo(1);
    //this.body.velocity.x = game.rnd.integerInRange(0, 400);

    this.health = 100;


}
//constructor
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {


    if (this.leftFace) {
        this.scale.x = -1;
        this.eraser.scale.x = -1;
        this.eraser.x = this.x - 46;
        this.eraser.y = this.y + 32;
    } else {
        this.scale.x = 1;
        this.eraser.scale.x = 1;
        this.eraser.x = this.x + 46;
        this.eraser.y = this.y + 32;
    }

    /*
    if (!this.leftFace) {
        //rightface
        this.weapon.x = this.x+65;
        this.weapon.y = this.y;

        this.paintText.text = this.paint.toFixed(0);
        this.paintText.x = this.x;
        this.paintText.y = this.y-65;
    } else  {
        //leftface
        this.weapon.x = this.x-65;
        this.weapon.y = this.y;

        this.paintText.text = this.paint.toFixed(0);
        this.paintText.x = this.x-40;
        this.paintText.y = this.y-65;
    }*/
    //wraps around world
    //game.world.wrap(this, 0, true);


    //body touching

    if (this.health <= 0) {
        this.kill();
    }

};

Enemy.prototype.attack = function() {
    this.eraser.animations.play('erase');
};
