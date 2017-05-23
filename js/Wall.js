/**
 * Created by KWfun on 5/22/2017.
 */
function Wall (game, x, y) {

    Phaser.Sprite.call(this, game, x, y);
    game.add.existing(this);

    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    //set anchor/origin to middle;
    this.anchor.set(0.5);
    this.body.setSize(2, 810, 0, 0);
    this.body.immovable = true;
}


Wall.prototype = Object.create(Phaser.Sprite.prototype);
Wall.prototype.constructor = Wall;

Wall.prototype.update = function() {


};
