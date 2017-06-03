/**
 * Created by kevinwu on 5/25/17.
 */
function Effect (game, x, y, key, frame, word) {

    this.word = word;

    Phaser.Sprite.call(this, game, x, y, key, frame);
    game.add.existing(this);

    game.physics.arcade.enable(this);
    this.visible = false;

    //assign animations depending on effect word
    if (word === 'white') {
        this.animations.add('white_glow', Phaser.Animation.generateFrameNames('highlight', 1, 6, '', 1), 6, false);
    } else if (word === 'green') {
        //console.log('got green');
        this.animations.add('green_glow', Phaser.Animation.generateFrameNames('highlight_green_', 1, 6, '', 1), 6, false);
    } else if (word ==='heal') {
        this.animations.add('heal', Phaser.Animation.generateFrameNames('plus', 1, 9, '', 1), 7, false);
    } else if (word === 'sparkle') {
        this.animations.add('sparkle', Phaser.Animation.generateFrameNames('sparkles', 1, 7, '', 1), 7, false);
    } else if (word === 'slash') {
        this.animations.add('slash', Phaser.Animation.generateFrameNames('slash', 1, 4, '', 1), 7, false);
    } else if (word === 'warning') {
        this.animations.add('warning', Phaser.Animation.generateFrameNames('warning', 4, 13, '', 1), 1.25, false);
    }
    
}


Effect.prototype = Object.create(Phaser.Sprite.prototype);
Effect.prototype.constructor = Effect;

Effect.prototype.update = function() {


};

