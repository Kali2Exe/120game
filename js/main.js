
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
        this.load.atlasJSONHash('atlas', 'sprites.png', 'sprites.json');

        this.load.image('bg', 'vibrantbg.png');
        //vibrantcoral_1
		this.load.image('player', 'ship.png');
		//this.load.image('coral', 'teset.png');
        this.load.image('greenB', 'border_green.png');

    },

    //in create of Title, create the Title Screen with scrolling image
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //game.stage.backgroundColor = '#4da6ff';
        this.background = game.add.tileSprite(0, 0, 1200, 800, 'bg');

        //coral group for adding coral pictures
        this.coralfg = game.add.group();
        this.coralfg.enableBody = true;

        //6 x 4 image place
        this.count = 0;
        for (var i = 0; i < 4; i++ ) {
            for (var j = 0; j < 6; j++){
                this.count++;
                this.coralPic = new Coral(this, 'atlas', 'vibrantcoral_' + this.count, j*200, i*200);
                game.add.existing(this.coralPic);
                this.coralfg.add(this.coralPic);
            }
        }

        /*this.coralPic = new Coral(this, 'coral', 400, 400);
        game.add.existing(this.coralPic);
        this.coralfg.add(this.coralPic);
        this.coralPic = new Coral(this, 'coral', 600, 400);
        game.add.existing(this.coralPic);
        this.coralfg.add(this.coralPic);*/

        this.coralfg.forEach(function(coralA) {
            coralA.statusText = game.add.text(coralA.x + 100, coralA.y + 100, coralA.status, {fontSize: '32px', fill: coralA.statColor});
            coralA.statusText.anchor.set(0.5);
            coralA.healthText = game.add.text(coralA.x, coralA.y, coralA.health, {fontSize: '32px', fill: coralA.statColor});

        });
        //test status text: will have to change later as part of coral
        //this.healthText.anchor.set(0.5);

        //when player goes over section, uses image highlight
        this.borderR = game.add.image(0, 0, 'greenB');
        this.borderR.visible = false;

        this.player = new Player(this, 'player');
        game.add.existing(this.player);

        this.tick = 0;
        this.overlap = false;

        //overlapping coral that will be healed
        this.affectedCoral = null;

    },

    update: function () {
        this.borderR.visible = false;
        this.overlap = false;

        //slow tick death for coral
        if (this.tick < game.time.now) {
            this.coralfg.forEach(function(coralA) {
                if (coralA.canHighLight && !coralA.healing) {
                    coralA.health--;
                }
                //coralA.healing = false;
            });
            this.tick = game.time.now + 1000;

            //if player is highlighting a coral and healing it, for the system to work, this must be here
            if(this.affectedCoral != null) {
             this.affectedCoral.healing = false;
           }
        }

        game.physics.arcade.overlap(this.player, this.coralfg, this.highLightBorder, null, this);

        //this.coralfg.forEach(function(coralB) {
            //});
            //update status of text
        this.coralfg.forEach(function(coralB) {
            coralB.statusText.text = coralB.status;
            coralB.statusText.addColor(coralB.statColor, 0);

            coralB.healthText.text = coralB.health.toFixed(0);
            coralB.healthText.addColor(coralB.statColor, 0);
        });

    },

    highLightBorder: function(player, coralPic) {
        if (coralPic.canHighLight) {
            this.borderR.x = coralPic.x;
            this.borderR.y = coralPic.y;
            this.borderR.visible = true;
        }

        if (player.paintMode && player.useKey.isDown && coralPic.health > 0) {
            this.affectedCoral = coralPic;
            coralPic.health += 0.05;
            coralPic.healing = true;
            console.log("painting");
        }
    }

};

// init game
var game = new Phaser.Game(1200, 800, Phaser.AUTO);
game.state.add('Play', gameObj.Play);
//game.state.add('Preload', gameObj.Preload);
//game.state.add('Title', gameObj.Title);
//game.state.add('GameOver', gameObj.gameOver);
game.state.start('Play');