/**
 * Created by kevinwu on 5/4/17.
 */

function Coral (game, key, frame, x, y) {
    //new Sprite(game, x, y, key, frame)
    //random x y location and uses Coral image
    Phaser.Sprite.call(this, game, x, y, key, frame);


    //the scale
    this.scale.x = 1;
    this.scale.y = 1;

    this.x = x;
    this.y = y;

    //enable physics
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;


    //more information about coral: health, stat, and statText
    this.health = 100;
    this.status = 'healthy';
    this.statColor = 'LimeGreen';

    this.canHighLight = true;

    this.statusText = "";
    this.healthText = "";

    this.healing = false;

}


//constructor
Coral.prototype = Object.create(Phaser.Sprite.prototype);
Coral.prototype.constructor = Coral;

Coral.prototype.update = function() {

    //alpha goes to 0 to 1
    //this.alpha = this.health/100; //old
    this.alpha = (100 * Math.pow(0.97, 100-this.health))/100;

    //ensures that health is within bounds
    if (100 < this.health) {
        this.health = 100;
    } else if (this.health < 0) {
        this.health = 0;
    }

    //health status's range
    if (50 < this.health && this.health <= 100) {
        this.status = 'healthy';
        this.statColor = 'Green';
    }
    else if (25 < this.health && this.health <= 50) {
        this.status = 'warning';
        this.statColor = 'orange';
    } else if (0 < this.health && this.health <= 25) {
        this.status = 'danger';
        this.statColor = 'red';
    } else if (this.health <= 0) {
        this.status = 'dead';
        this.statColor = 'white';
        this.canHighLight = false;

        //maybe play sound
    }

    //updates health and status Text
    this.statusText.text = this.status;
    this.statusText.addColor(this.statColor, 0);

    this.healthText.text = this.health.toFixed(0);
    this.healthText.addColor(this.statColor, 0);



};
