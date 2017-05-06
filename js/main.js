
// define global game container object
var gameObj = { };


//Title Screen
gameObj.Play  = function() {

};
gameObj.Play.prototype = {
    preload: function () {
        //console.log('Play: preload');
        //load assets
        this.load.path = 'assets/img/';
		this.load.image('player', 'ship.png');
		this.load.image('coral', 'teset.png');
        this.load.image('greenB', 'border_green.png');

    },

    //in create of Title, create the Title Screen with scrolling image
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.backgroundColor = '#4da6ff';

        //coral group for adding coral pictures
        this.coralfg = game.add.group();
        this.coralfg.enableBody = true;

        this.coralPic = new Coral(this, 'coral', 400, 400);
        game.add.existing(this.coralPic);
        this.coralfg.add(this.coralPic);
        this.coralPic = new Coral(this, 'coral', 600, 400);
        game.add.existing(this.coralPic);
        this.coralfg.add(this.coralPic);

        //test status text: will have to change later as part of coral
        this.statusText = game.add.text(700, 500, this.coralPic.status, {fontSize: '32px', fill: this.coralPic.statColor});
        this.statusText.anchor.set(0.5);

        this.healthText = game.add.text(600, 400, this.coralPic.health, {fontSize: '32px', fill: this.coralPic.statColor});
        //this.healthText.anchor.set(0.5);

        //when player goes over section, uses image highlight
        this.borderR = game.add.image(0, 0, 'greenB');
        this.borderR.visible = false;

        this.player = new Player(this, 'player');
        game.add.existing(this.player);

        this.tick = 0;

    },

    update: function () {
        this.borderR.visible = false;
        game.physics.arcade.overlap(this.player, this.coralfg, this.highLightBorder, null, this);

        //slow tick death for coral
        if (this.tick < game.time.now) {
            this.coralfg.forEach(function(coralA) {
                if (coralA.canHighLight) {
                    coralA.health--;
                }
            });
            this.tick = game.time.now + 500;
        }

        //this.coralfg.forEach(function(coralB) {
            //});
            //update status of text
            this.statusText.text = this.coralPic.status;
            this.statusText.addColor(this.coralPic.statColor, 0);

            this.healthText.text = this.coralPic.health;
            this.healthText.addColor(this.coralPic.statColor, 0);

    },

    highLightBorder: function(player, coralPic) {
        this.borderR.x = coralPic.x;
        this.borderR.y = coralPic.y;
        this.borderR.visible = true;
    }

};

// init game
var game = new Phaser.Game(1200, 800, Phaser.AUTO);
game.state.add('Play', gameObj.Play);
game.state.start('Play');