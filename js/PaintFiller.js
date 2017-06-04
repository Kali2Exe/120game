/**
 * Created by kevinwu on 5/4/17.
 */

function PaintFiller (game, key, frame, x, y) {
    //create paintFiller sprite
    //new Sprite(game, x, y, key, frame)
    //random x y location and uses PaintFiller image
    Phaser.Sprite.call(this, game, x, y, key, frame);
    game.add.existing(this);
    //set anchor/origin to middle
    //this.anchor.set(0.5);

    //the scale
    this.scale.x = 0.5;
    this.scale.y = 0.5;

    //add animation
    this.animations.add('bounce', Phaser.Animation.generateFrameNames('jelly', 1, 3, '', 1), 4, true);
    this.animations.play('bounce');

    //enable physics
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    //new radius as collision circle
    this.radius = this.width/1.50;
    this.body.setCircle(
        this.radius,
        (-this.radius + 0.5 * this.width / this.scale.x),
        (-this.radius + 0.5 * this.height / this.scale.y)
    );
    //this.body.velocity.x = game.rnd.integerInRange(0, 400);

}
//constructor
PaintFiller.prototype = Object.create(Phaser.Sprite.prototype);
PaintFiller.prototype.constructor = PaintFiller;

PaintFiller.prototype.update = function() {


};