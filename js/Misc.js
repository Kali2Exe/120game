/**
 * kkeomane: heavily based on kevinwu's Enemy.js code.
 */

function Misc (game, key, frame) {
    //new Sprite(game, x, y, key, frame)
    //random x y location and uses Enemy image
    
    //set random spawn position and facing
    this.pX = 1000;
    this.pY = 100;

    //creates sprite for enemy
    Phaser.Sprite.call(this, game, this.pX, this.pY, key, frame);
    game.add.existing(this);

    //enable physics
    game.physics.arcade.enable(this);
    //this.body.collideWorldBounds = true;

    //set anchor/origin to middle
    this.anchor.set(0.5);


    //animation
    this.animations.add('schoolf', Phaser.Animation.generateFrameNames('school', 1, 2, '', 1), 2, true);
    this.animations.add('turtlef', Phaser.Animation.generateFrameNames('turtle', 1, 2, '', 1), 2, true);
    this.animations.add('whalef', Phaser.Animation.generateFrameNames('whale', 1, 2, '', 1), 2, true);
    

    if (random == 'null') {
    this.animations.play('schoolf');   
    random = Phaser.ArrayUtils.getRandomItem(['schoolf', 'turtlef', 'whalef'], 1)
    } else if (random == 'turtlef') {
    this.animations.play('turtlef');
    random = Phaser.ArrayUtils.getRandomItem(['turtlef', 'turtlef', 'whalef'], 1)
    } else if (random == 'whalef') {
    this.animations.play('whalef');
    random = Phaser.ArrayUtils.getRandomItem(['whalef', 'turtlef', 'whalef'], 1)
    } else {
    this.animations.play('schoolf');
    random = Phaser.ArrayUtils.getRandomItem(['whalef', 'turtlef', 'whalef'], 1)
    }

    //velocity
    this.body.velocity.setTo(-50, 0);

        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        //console.log("kill");

}

Misc.prototype = Object.create(Phaser.Sprite.prototype);
Misc.prototype.constructor = Misc;