/**
 * Created by kevinwu on 5/25/17.
 */
function ResourceBar (game, x, y, key, frame) {

    this.currentFrame = frame;

    //create resource bar
    Phaser.Sprite.call(this, game, x, y, key, frame);
    game.add.existing(this);

    this.anchor.set(0.5);
    this.scale.setTo(2, 2);

    //enable physics
    game.physics.arcade.enable(this);
    
}


ResourceBar.prototype = Object.create(Phaser.Sprite.prototype);
ResourceBar.prototype.constructor = ResourceBar;

ResourceBar.prototype.update = function() {


};

ResourceBar.prototype.barMeterCheck = function(player) {

    //dense logic for setting frames
    //checks at 0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100
    if (87.5 < player.paint && player.paint <= 100 && this.frameName != 'bar100') {
        this.frameName = 'bar100';
    } else if (75 < player.paint && player.paint <= 87.5 && this.frameName != 'bar87.5') {
        this.frameName = 'bar87.5';
    } else if (62.5 < player.paint && player.paint <= 75 && this.frameName != 'bar75') {
        this.frameName = 'bar75';
    } else if (50 < player.paint && player.paint <= 62.5 && this.frameName != 'bar62.5') {
        this.frameName = 'bar62.5';
    } else if (37.5 < player.paint && player.paint <= 50 && this.frameName != 'bar50') {
        this.frameName = 'bar50';
    } else if (25 < player.paint && player.paint <= 37.5 && this.frameName != 'bar37.5') {
        this.frameName = 'bar37.5';
    } else if (12.5 < player.paint && player.paint <= 25 && this.frameName != 'bar25') {
        this.frameName = 'bar25';
    } else if (0 < player.paint && player.paint <= 12.5 && this.frameName != 'bar12.5') {
        this.frameName = 'bar12.5';
    } else if (player.paint <= 0 && this.frameName != 'bar0') {
        this.frameName = 'bar0';
    }
};