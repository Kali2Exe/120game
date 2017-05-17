// define global game container object
var gameObj = {};

// Boot
//Boot loads in the atlas
gameObj.Boot = function () {
};
gameObj.Boot.prototype = {
    init: function () {
        console.log('Boot: init');
        //when you click out of browser, the game will pause
        this.stage.disableVisibilityChange = false;
    },
    preload: function () {
        console.log('Boot: preload');
        //main use of Boot to load atlas from assets/img
        this.load.path = 'assets/img/';
        this.load.atlasJSONHash('atlas', 'sprites.png', 'sprites.json');
        this.load.atlasJSONHash('fishy', 'fishy.png', 'fishy.json');
        this.load.atlasJSONHash('jelly', 'jelly.png', 'jelly.json');

        this.good = true;

    },
    create: function () {
        //go to Preloader state after Boot.preload is done
        if (this.good) {
            this.state.start('Preloader');
        }
    }
};

// Preloader state
//use for other things
gameObj.Preloader = function () {
};
gameObj.Preloader.prototype = {
    preload: function () {
        console.log('Preloader: preload');

        this.load.image('bg', 'vibrantbg.png');
        //vibrantcoral_1
        this.load.image('player', 'ship.png');
        //this.load.image('coral', 'teset.png');
        this.load.image('greenB', 'border_green.png');
        //custom load screen.  loads image1 from atlas
        //this.add.image(0,0, 'atlas', 'loadimage1');

        // add preloader image2 and set as preloader sprite (auto-crops sprite)
        //this.preloadBar = this.add.sprite(0, 0,'atlas', 'loadimage2');
        //this.load.setPreloadSprite(this.preloadBar);

    },
    create: function () {
        console.log('Preloader: create');
        // disable preload bar crop while we wait for mp3 decoding
        //this.preloadBar.cropEnabled = false;
    },
    update: function () {
        // wait for first mp3 to properly decode
        /*if(this.cache.isSoundDecoded('firstMusic')) {
         this.state.start('Title');
         }*/
        this.state.start('Title');
    }
};

//Title Screen
gameObj.Title = function () {

};

gameObj.Title.prototype = {
    preload: function () {
        console.log('Title: preload');
        //assets already loaded beforehand

    },

    //in create of Title, create the Title Screen with scrolling image
    create: function () {
        console.log('Title: create');

        //add background image of moving stars
        this.background = game.add.tileSprite(0, 0, 1200, 800, 'bg');
        //this.background.scale.set(2, 2);


        //add the Title and Text instructions on how to play
        this.text = game.add.text(600, 200, 'Day at the Bleach (prototype)', {fontSize: '64px', fill: 'red'});
        this.text.anchor.set(0.5);
        this.text.scale.set(0.5, 0.5);
        this.text2 = game.add.text(600, 300, 'Press ENTER to play', {fontSize: '32px', fill: 'white'});
        this.text2.anchor.set(0.5);
        this.text3 = game.add.text(600, 400, 'arrows keys to move', {fontSize: '32px', fill: 'white'});
        this.text3.anchor.set(0.5);
        this.text4 = game.add.text(600, 500, 'x to heal', {fontSize: '32px', fill: 'white'});
        this.text4.anchor.set(0.5);

        //this.text6 = game.add.text(600, 20, 'Press 0 to toggle \ndebug/collision circles', {fontSize: '16px', fill: 'Red'});

        //set keys for playing game or for toggling debug/collision circles
        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.zeroKey = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);

        // play Title music
        //this.playMusic();
    },

    update: function () {
        console.log('Title: update');

        //if you press Enter, you go to Play screen
        if (this.enterKey.justPressed()) {
            //this.firstMusic.stop();
            this.state.start('Play');
        }
        //if press 0 (zero), toggle debugs
        if (this.zeroKey.justPressed()) {
            toggleDebug = !toggleDebug;
        }

    }

    /*playMusic: function() {
     console.log('Playing music');

     //plays music
     this.firstMusic = this.add.audio('firstMusic');
     this.firstMusic.play('', 0, 0.75, true);	// ('marker', start position, volume (0-1), loop)

     }*/


};


//Play Screen
gameObj.Play = function () {

};
gameObj.Play.prototype = {
    preload: function () {
        //console.log('Play: preload');
        //load assets

    },

    //in create of Title, create the Title Screen with scrolling image
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.backgroundColor = '#4da6ff';

        //coral group for adding coral pictures
        this.coralfg = game.add.group();
        this.coralfg.enableBody = true;

        //6 x 4 image place
        this.count = 0;

        for (var i = 0; i < 6; i++) {
            this.count++;
            if (this.count < 10) {
                if (i < 2 || 3 < i) {
                    this.coralPic = new Coral(this, 'atlas', 'vibrantcoral_0' + this.count, i * 200, 400);
                    game.add.existing(this.coralPic);
                    this.coralfg.add(this.coralPic);
                }
            }

        }

        for (var j = 0; j < 6; j++) {
            this.count++;
            if (this.count < 10) {
                this.coralPic = new Coral(this, 'atlas', 'vibrantcoral_0' + this.count, j * 200, 600);
            } else {
                this.coralPic = new Coral(this, 'atlas', 'vibrantcoral_' + this.count, j * 200, 600);
            }
            game.add.existing(this.coralPic);
            this.coralfg.add(this.coralPic);
        }


        /*this.coralPic = new Coral(this, 'coral', 400, 400);
         game.add.existing(this.coralPic);
         this.coralfg.add(this.coralPic);
         this.coralPic = new Coral(this, 'coral', 600, 400);
         game.add.existing(this.coralPic);
         this.coralfg.add(this.coralPic);*/

        this.coralfg.forEach(function (coralA) {
            coralA.statusText = game.add.text(coralA.x + 100, coralA.y + 100, coralA.status, {
                fontSize: '32px',
                fill: coralA.statColor
            });
            coralA.statusText.anchor.set(0.5);
            coralA.healthText = game.add.text(coralA.x, coralA.y, coralA.health, {
                fontSize: '32px',
                fill: coralA.statColor
            });

        });
        //test status text: will have to change later as part of coral
        //this.healthText.anchor.set(0.5);

        this.paintFillGroup = game.add.group();
        this.paintFillGroup.enableBody = true;

        for (var nm = 0; nm < 2; nm++) {
            this.paintfill = new PaintFiller(this.game, 'jelly', 'jelly1', ((nm * 600) + 300), 200);
            game.add.existing(this.paintfill);
            this.paintFillGroup.add(this.paintfill);
        }

        //adding player sprite
        this.player = new Player(this.game, 'fishy', 'fishy1');
        game.add.existing(this.player);
        this.player.paintText = game.add.text(this.player.x, this.player.y-25, this.player.paint, {fontSize: '32px', fill: "red"});
        //this.player.addChild(this.player.paintText);


        //when player goes over section, uses image highlight
        this.borderR = game.add.image(0, 0, 'greenB');
        this.borderR.visible = false;

        this.tick = 0;

        //overlapping coral that will be healed
        this.affectedCoral = null;

        //debug toggles
        this.zeroKey = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);

        countOfDied = 0;
        this.countD = 0;

    },

    update: function () {

        //change later to timer event
        //number of dead coral check
        if (this.countD % 120 == 0) {
            this.coralfg.forEach(function (coralA) {
                if (!coralA.canHighLight) {
                    countOfDied += 1;
                    console.log('how many died');
                    console.log(countOfDied);
                }
                //coralA.healing = false;
            });
            if (countOfDied === 24) {
                this.state.start('GameOverScreen');
            } else {
                this.countD = 0;
                countOfDied = 0;
            }
        }

        this.borderR.visible = false;

        game.physics.arcade.overlap(this.player, this.coralfg, this.highLightBorder, null, this);
        game.physics.arcade.overlap(this.player, this.paintFillGroup, this.fillPaintMeter, null, this);
        //change later to timer event
        //slow tick death for coral
        if (this.tick < game.time.now) {
            this.coralfg.forEach(function (coralA) {
                if (coralA.canHighLight && !coralA.healing) {
                    coralA.health--;
                }
                //coralA.healing = false;
            });
            this.tick = game.time.now + 500;

            //if player is highlighting a coral and healing it, for the system to work, this must be here
            /*if(this.affectedCoral != null) {
             this.affectedCoral.healing = false;
             }*/
        }

        //this.coralfg.forEach(function(coralB) {
        //});
        //update status of text

        if (this.zeroKey.justPressed()) {
            toggleDebug = !toggleDebug;
        }

        this.countD += 1;
    },

    //if player overlap coral, highlight it
    //if player press use key and has paint, heal
    highLightBorder: function (player, coralPic) {

        //needed to fix healing:  if coral not same coral you are overlapping before, switch
        if (this.affectedCoral == null) {
            this.affectedCoral = coralPic;
        }
        if (this.affectedCoral != coralPic) {
            this.affectedCoral.healing = false;
            this.affectedCoral = coralPic;
        }

        if (this.affectedCoral.canHighLight) {
            this.borderR.x = this.affectedCoral.x;
            this.borderR.y = this.affectedCoral.y;
            this.borderR.visible = true;
        }


        if (player.paintMode && player.useKey.isDown && this.affectedCoral.health > 0 && player.paint > 0 && this.borderR.visible) {
            //this.affectedCoral = coralPic;
            this.affectedCoral.health += 0.1;
            this.affectedCoral.healing = true;
            player.paint -= 0.2;
            console.log("painting");
        }
    },

    fillPaintMeter: function (player, paintJelly) {
        if (player.paint < 100) {
            player.paint += 0.4;
        }
    },

    render: function () {
        //game.debug.text(`Debugging Phaser ${Phaser.VERSION}`, 20, 20, 'yellow');
        game.debug.text('FPS: ' + game.time.fps, 20, 1180, 'yellow');

        //if shift held, you can see hitcircle for bird

        //toggles ability to see all collision circles
        if (toggleDebug) {
            //game.debug.body(this.grazeRadius);

            game.debug.body(this.player);
            this.paintFillGroup.forEach(function (jelly) {
                game.debug.body(jelly);
            });
        }

    }

};

//GameOver Screen
gameObj.GameOverScreen = function () {

};
gameObj.GameOverScreen.prototype = {

    preload: function () {

    },

    //create() makes the GameOver screen.  Shows Game Over and options to play more or go to the title screen
    create: function () {
        //this.endGround = game.add.image(0, 0, 'atlas', 'backgroundGREY');

        this.background = game.add.tileSprite(0, 0, 1200, 800, 'bg');
        //Text that shows game over and key presses to go back to a screen or replay
        this.gameOverText = game.add.text(600, 250, 'Game Over', {fontSize: '64px', fill: 'red'});
        this.gameOverText.anchor.set(0.5);
        //this.gameOverText.scale.set(0.5, 0.5);

        //this.goText = game.add.text(400, 250, 'Final Score: ' + globalScore.toFixed(1), {fontSize: '32px', fill: 'yellow'});
        //this.goText.anchor.set(0.5);

        this.exitT1 = game.add.text(600, 375, 'Press Shift to Title Screen', {fontSize: '64px', fill: 'red'});
        this.exitT1.anchor.set(0.5);
        this.exitT2 = game.add.text(600, 475, 'Press Enter to Replay', {fontSize: '64px', fill: 'red'});
        this.exitT2.anchor.set(0.5);


        //death animation of bird that plays over and over.  Just looks cute

        //Press keys to go back to title or replay
        this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        //game over sound
        //this.deathM = this.add.audio('gameOverSound');
        //this.deathM.play('', 0, 1, false);	// ('marker', start position, volume (0-1), loop)
    },

    update: function () {
        //if shift pressed, go to Title.  if enter key pressed, go to Play state and play again.
        if (this.shiftKey.justPressed()) {
            //this.deathM.stop();
            this.state.start('Title');
        } else if (this.enterKey.justPressed()) {
            //this.deathM.stop();
            this.state.start('Play');
        }
    }

};

// init game
var game = new Phaser.Game(1200, 800, Phaser.AUTO);
game.state.add('Play', gameObj.Play);
game.state.add('Boot', gameObj.Boot);
game.state.add('Preloader', gameObj.Preloader);
game.state.add('Title', gameObj.Title);
game.state.add('GameOverScreen', gameObj.GameOverScreen);
game.state.start('Boot');

var toggleDebug = false;
var countOfDied = 0;