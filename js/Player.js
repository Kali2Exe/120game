/**
 * Created by KWfun on 4/29/2017.
 */

//creates a Player object
//player also needs another frame for second image
function Player(game, key, frame, key2, frame2) {
    //new Sprite(game, x, y, key, frame)
    //random x y location and uses Player image

    //Phaser.Sprite.call(this, game, 600, 400, key2, 'brush');
    //game.add.existing(this);

    this.weapon = new Brush(game, key2, frame2);

    Phaser.Sprite.call(this, game, 600, 400, key, frame);
    game.add.existing(this);

    //this.addChild(this.weapon);

    //set anchor/origin to middle
    this.anchor.set(0.5);

    //the scale is random
    this.scale.x = 1;
    this.scale.y = 1;

    //fish animation
    this.animations.add('swim1', Phaser.Animation.generateFrameNames('fishy', 1, 5, '', 1), 9, true);
    this.animations.play('swim1');

    //enable physics and set to random velocity
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    this.body.drag.set(250);
    this.body.acceleration.set(8);
    this.body.maxVelocity.set(400);
    //this.body.minVelocity = 0;

    this.radius = this.width / 6;
    this.body.setCircle(
        this.radius,
        (-this.radius + 0.5 * this.width +25/ this.scale.x),
        (-this.radius + 0.5 * this.height / this.scale.y)
    );
    //this.body.velocity.x = game.rnd.integerInRange(0, 400);

    this.cursors = game.input.keyboard.createCursorKeys();
    this.changeKey = game.input.keyboard.addKey(Phaser.Keyboard.C);

    this.useKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
    this.paintMode = true;
    this.speed = 10;
    //this.painting = false;
    //this.swording = false;

    this.paint = 100;
    this.paintText = "";

    this.leftFace = false;
}
//constructor
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {

    /*//if R key is pressed, set to opposite velocity
     if (game.input.keyboard.justPressed(Phaser.Keyboard.R)) {
     this.body.velocity.x = -this.body.velocity.x;
     //
     */
    //wraps around world
    //game.world.wrap(this, 0, true);
    //this.health.toFixed(0)

    //leftFace logic for correct setting of meter and brush sprite

    //this.painting = false;
    //this.swording = false;

    //movement controls
    if (this.cursors.left.isDown) {
        //this.x -= this.speed;
        this.body.velocity.x = -200;
        //this.body.acceleration.x = -8;
        this.scale.x = -1;

        this.weapon.scale.x = -1;

        this.leftFace = true;
        //when char flips, then the image will also flip

    } else if (this.cursors.right.isDown) {
        //If press right, go right
        //this.x += this.speed;
        this.body.velocity.x = 200;
        //this.body.acceleration.x = 8;
        this.scale.x = 1;

        this.weapon.scale.x = 1;

        this.leftFace = false;

    }

    if (this.cursors.down.isDown) {
        //If press down, move down
        //this.y += this.speed;
        this.body.velocity.y = 200;
        //this.body.acceleration.y = 8;

    } else if (this.cursors.up.isDown) {
        //If press up, go up
        //this.y -= this.speed;
        this.body.velocity.y = -200;
        //this.body.acceleration.y = -8;
    }

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
    }

    this.body.acceleration = -50;

    //change key control
    if (this.changeKey.justPressed()) {
        //change sprites
        //false = sword mode
        if (this.paintMode) {
            this.weapon.animations.play('brushToPen');
            this.paintMode = false;
        } else {
            this.weapon.animations.play('penToBrush');
            this.paintMode = true;
        }
    }

    //paintMeter Check
    if (100 < this.paint) {
        this.paint = 100;
    } else if (this.paint < 0) {
        this.paint = 0;
    }
    if (this.useKey.isDown && this.paintMode) {
        this.weapon.animations.play('paint');
    } else if (this.useKey.isDown && !this.paintMode) {
        //this.swording = true;
        //for sword mode
        //this.weapon.animations.play('attack');
    }


    //game.physics.arcade.overlap(this, Coral, Coral.hightlightThis(), null, this);
};