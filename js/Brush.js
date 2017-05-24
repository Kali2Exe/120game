/**
 * Created by KWfun on 5/18/2017.
 */
function Brush (game, key, frame) {

    this.base = frame;
    Phaser.Sprite.call(this, game, 655, 400, key, frame);
    game.add.existing(this);

    game.physics.arcade.enable(this);
    //set anchor/origin to middle
    this.anchor.set(0.5);

    /*this.radius = this.width / 4;
    this.body.setCircle(
        this.radius,
        (-this.radius + 0.5 * this.width +25/ this.scale.x),
        (-this.radius + 0.5 * this.height / this.scale.y)
    );*/

    //60, 60, 160, 25
    this.body.setSize(70, 70, 160, 25);
    //bunch of animations
    this.paintAnim = this.animations.add('paint', Phaser.Animation.generateFrameNames('brush_drawing', 1, 8, '_flipped', 1), 9, false);
    this.paintAnim.onComplete.add(this.paintFin, this);
    this.swapBP = this.animations.add('brushToPen', Phaser.Animation.generateFrameNames('brush_swap_bp', 1, 4, '_flipped', 1), 9, false);
    this.swapBP.onComplete.add(this.swapBPFin, this);
    this.swap1 = this.animations.add('penToBrush', Phaser.Animation.generateFrameNames('brush_swap_pb', 1, 4, '_flipped', 1), 9, false);
    this.swap1.onComplete.add(this.swap1Fin, this);
    this.stabAnim = this.animations.add('stabbing', Phaser.Animation.generateFrameNames('brush_pen_stabR', 1, 5, '', 1), 9, false);
    this.stabAnim.onComplete.add(this.stabFin, this);
}


Brush.prototype = Object.create(Phaser.Sprite.prototype);
Brush.prototype.constructor = Brush;

Brush.prototype.update = function() {
    
};

Brush.prototype.paintFin = function() {
    this.frameName = this.base;
};

Brush.prototype.swapBPFin = function() {
    this.frameName = "brush_pen_flipped";
};

Brush.prototype.swap1Fin = function() {
    this.frameName = this.base;
};

Brush.prototype.stabFin = function() {
    this.frameName = "brush_pen_flipped";
};