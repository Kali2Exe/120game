/**
 * Created by kevinwu on 5/4/17.
 */

function Coral (game, frame, x, y) {
    //new Sprite(game, x, y, key, frame)
    //random x y location and uses Coral image
    Phaser.Sprite.call(this, game, x, y, frame);

    //set anchor/origin to middle
    //this.anchor.set(0.5);

    //the scale is random
    this.scale.x = 1;
    this.scale.y = 1;

    //enable physics and set to random velocity
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;


    //more information about coral
    this.health = 100;
    this.status = 'healthy';
    this.statColor = 'green';

    this.canHighLight = true;

}


//constructor
Coral.prototype = Object.create(Phaser.Sprite.prototype);
Coral.prototype.constructor = Coral;

Coral.prototype.update = function() {

    if (25 < this.health && this.health <= 50) {
        this.status = 'warning';
        this.statColor = 'orange';
    } else if (0 < this.health && this.health <= 25) {
        this.status = 'danger';
        this.statColor = 'red';
    } else if (this.health <= 0) {
        this.status = 'dead';
        this.statColor = 'white';
        this.canHighLight = false;
    }
    //game.physics.arcade.overlap(player, this.bulletG4, this.lose, null, this);
    //wraps around world
    //game.world.wrap(this, 0, true);


};
