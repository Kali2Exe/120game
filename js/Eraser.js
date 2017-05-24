/**
 * Created by KWfun on 5/21/2017.
 */
function Eraser (game, key, frame, x, y) {

    this.base = frame;
    Phaser.Sprite.call(this, game, x, y, key, frame);
    game.add.existing(this);

    //set anchor/origin to middle;
    this.anchor.set(0.5);

    //bunch of animations
    this.eraseAnim = this.animations.add('erase', Phaser.Animation.generateFrameNames('eraserR', 2, 3, '', 1), 4, false);
    this.eraseAnim.onComplete.add(this.eraseFin, this);

    //this is needed to bring eraser behind the enemy sprite.
    this.moveDown();
    this.moveDown();
    this.moveDown();
    this.moveDown();
    this.moveDown();
    this.moveDown();

}


Eraser.prototype = Object.create(Phaser.Sprite.prototype);
Eraser.prototype.constructor = Eraser;

Eraser.prototype.update = function() {

};

Eraser.prototype.eraseFin = function() {
    this.frameName = this.base;
};