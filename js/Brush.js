/**
 * Created by KWfun on 5/18/2017.
 */
function Brush (game, key, frame) {

    this.base = frame;
    Phaser.Sprite.call(this, game, 655, 400, key, frame);
    game.add.existing(this);

    //set anchor/origin to middle
    this.anchor.set(0.5);

    //bunch of animations
    this.paintAnim = this.animations.add('paint', Phaser.Animation.generateFrameNames('brush_drawing', 1, 8, '_flipped', 1), 9, false);
    this.paintAnim.onComplete.add(this.paintFin, this);
    this.swapBP = this.animations.add('brushToPen', Phaser.Animation.generateFrameNames('brush_swap_bp', 1, 4, '_flipped', 1), 9, false);
    this.swapBP.onComplete.add(this.swapBPFin, this);
    this.swap1 = this.animations.add('penToBrush', Phaser.Animation.generateFrameNames('brush_swap_pb', 1, 4, '_flipped', 1), 9, false);
    this.swap1.onComplete.add(this.swap1Fin, this);
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