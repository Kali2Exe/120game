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
        this.load.atlasJSONHash('dead', 'spritesded.png', 'spritesded.json');
        this.load.atlasJSONHash('fishy', 'fishy.png', 'fishy.json');
        this.load.atlasJSONHash('jelly', 'jelly.png', 'jelly.json');
        this.load.atlasJSONHash('brushSon', 'brush.png', 'brush.json');
        this.load.atlasJSONHash('enemy', 'enemy.png', 'enemy.json');
        //this.load.atlasJSONHash('stab', 'stab.png', 'stab.json');

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
        this.load.image('bg2', 'BG-4.jpg');
        //vibrantcoral_1
        //this.load.image('player', 'ship.png');
        //this.load.image('coral', 'teset.png');
        this.load.image('greenB', 'border_green.png');
        this.load.image('barv2', 'barv2.png');
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
        this.text3 = game.add.text(600, 400, 'Press SHIFT to see tutorial', {fontSize: '32px', fill: 'white'});
        this.text3.anchor.set(0.5);


        //this.text6 = game.add.text(600, 20, 'Press 0 to toggle \ndebug/collision circles', {fontSize: '16px', fill: 'Red'});

        //set keys for playing game or for toggling debug/collision circles
        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.zeroKey = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
        this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

        // play Title music
        //this.playMusic();
    },

    update: function () {
        console.log('Title: update');

        //if you press Enter, you go to Play screen
        if (this.enterKey.justPressed()) {
            //this.firstMusic.stop();
            if (firstPlay) {
                this.state.start('Tutorial');
            } else {
                this.state.start('Play');
            }
        }
        //if press 0 (zero), toggle debugs
        if (this.zeroKey.justPressed()) {
            toggleDebug = !toggleDebug;
        }

        if(this.shiftKey.justPressed()) {
            this.state.start('Tutorial');
        }

    }

    /*playMusic: function() {
     console.log('Playing music');

     //plays music
     this.firstMusic = this.add.audio('firstMusic');
     this.firstMusic.play('', 0, 0.75, true);	// ('marker', start position, volume (0-1), loop)

     }*/


};

// Tutorial state
//use for other things
gameObj.Tutorial = function () {
};
gameObj.Tutorial.prototype = {
    preload: function () {

    },
    create: function () {
        console.log('Tutorial: create');

        this.text = game.add.text(600, 200, 'Tutorial!!! (Placeholder)', {fontSize: '64px', fill: 'white'});
        this.text.anchor.set(0.5);

        //placeholder image for tutorial screen
        //this.tutorialText = game.add.image(400, 150, 'atlas', 'gameOver');

        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.zeroKey = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
        this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    },
    update: function () {
        //if you press Enter, you go to Play screen
        if (this.enterKey.justPressed()) {
            //this.firstMusic.stop();
            this.state.start('Play');
        }
        //if press 0 (zero), toggle debugs
        if (this.zeroKey.justPressed()) {
            toggleDebug = !toggleDebug;
        }

        if(this.shiftKey.justPressed()) {
            this.state.start('Title');
        }

    }
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

        game.time.advancedTiming = true;

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.backgroundColor = '#ccffff';
        this.tileBack = game.add.tileSprite(0, 0, 1200, 800, 'bg2');
        //coral group for adding coral pictures
        this.coralfg = game.add.group();
        this.coralfg.enableBody = true;

        this.coralded = game.add.group();
        this.coralded.enableBody = false;

        //creating coral images
        this.count = 0;

        for (var i = 0; i < 6; i++) {
            this.count++;
            if (this.count < 10) {
                if (i < 2 || 3 < i) {
                    this.dedCoral = game.add.image(i*200, 400, 'dead', 'dedcoral_0'+ this.count);
                    game.add.existing(this.dedCoral);
                    this.coralded.add(this.dedCoral);
                    this.coralPic = new Coral(this, 'atlas', 'vibrantcoral_0' + this.count, i * 200, 400);
                    game.add.existing(this.coralPic);
                    this.coralfg.add(this.coralPic);
                }
            }

        }
        //second row of coral
        for (var j = 0; j < 6; j++) {
            this.count++;
            if (this.count < 10) {
                this.dedCoral = game.add.image(j*200, 600, 'dead', 'dedcoral_0'+ this.count);
                this.coralPic = new Coral(this, 'atlas', 'vibrantcoral_0' + this.count, j * 200, 600);
            } else {
                this.dedCoral = game.add.image(j*200, 600, 'dead', 'dedcoral_'+ this.count);
                this.coralPic = new Coral(this, 'atlas', 'vibrantcoral_' + this.count, j * 200, 600);
            }
            game.add.existing(this.dedCoral);
            this.coralded.add(this.dedCoral);
            game.add.existing(this.coralPic);
            this.coralfg.add(this.coralPic);
        }

        //need this to place coral under stuff
        game.world.moveDown(this.coralded);
        //game.world.moveUp(this.coralded);

        //adding coral text that will keep track of things
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

        //paint fillers
        this.paintFillGroup = game.add.group();
        this.paintFillGroup.enableBody = true;

        for (var nm = 0; nm < 2; nm++) {
            this.paintfill = new PaintFiller(this.game, 'jelly', 'jelly1', ((nm * 600) + 300), 200);
            //game.add.existing(this.paintfill);
            this.paintFillGroup.add(this.paintfill);
        }

        //enemy creater, spawner

        //enemy Spawner and shit
        this.enemyGroup = game.add.group();
        this.enemyGroup.enableBody = true;

        this.enemySpawner = game.time.create();
        this.enemySpawner.loop(15000, function() {
            this.enemyFish = new Enemy(game, 'enemy', 'enemyR1', 'enemy', 'eraserR1');
            this.enemyGroup.add(this.enemyFish);
        }, this);

        //need invisible walls....
        this.wallGroup = game.add.group();
        this.wallGroup.enableBody = true;
        this.wall1 = new Wall(this.game, 2, -5);
        this.wallGroup.add(this.wall1);
        this.wall2 = new Wall(this.game, game.world.width-2, -5);
        this.wallGroup.add(this.wall2);


        //when player goes over section, uses image highlight
        this.borderR = game.add.image(0, 0, 'greenB');
        this.borderR.visible = false;

        //adding player sprite
        this.player = new Player(this.game, 'fishy', 'fishy1', 'brushSon', 'brush_flipped');
        this.player.paintText = game.add.text(this.player.x, this.player.y-25, this.player.paint, {fontSize: '32px', fill: "red"});
        //this.player.addChild(this.player.paintText);


        this.tick = 0;

        //overlapping coral that will be healed
        this.affectedCoral = null;

        //debug toggles
        this.zeroKey = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);

        countOfDied = 0;
        this.countD = 0;

        //repeat event (delay, repeatCount, callback, context, arguments
        //testing purposes only: 3000
        //real game: 30000
        this.player.bringToTop();
        this.enemySpawner.start();

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
            if (countOfDied === 10) {
                this.state.start('GameOverScreen');
            } else {
                this.countD = 0;
                countOfDied = 0;
            }
        }

        /*this.enemyGroup.forEach(function (enemyA) {
            enemyA.body.velocity.setTo(enemyA.vel, enemyA.vel);
        });*/

        this.borderR.visible = false;

        //overlap and collide logic (see functions)
        game.physics.arcade.overlap(this.player, this.coralfg, this.highLightBorder, null, this);
        game.physics.arcade.overlap(this.player, this.paintFillGroup, this.fillPaintMeter, null, this);
        game.physics.arcade.overlap(this.enemyGroup, this.coralfg, this.attackedCoral, null, this);
        game.physics.arcade.collide(this.enemyGroup, this.wallGroup, this.collideWithWall);
        //change later to timer event
        //slow tick death for coral
        if (this.tick < game.time.now) {
            this.coralfg.forEach(function (coralA) {
                if (coralA.canHighLight && !coralA.healing) {
                    coralA.health--;
                }
                //coralA.healing = false;
            });
            this.tick = game.time.now + 1000; //5000

            //if player is highlighting a coral and healing it, for the system to work, this must be here
            /*if(this.affectedCoral != null) {
             this.affectedCoral.healing = false;
             }*/
        }

        //debug toggle
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


        if (player.paintMode && player.useKey.isDown && this.affectedCoral.health > 0 && this.affectedCoral.health < 100
                && player.paint > 0 && this.borderR.visible) {
            //this.affectedCoral = coralPic;
            this.affectedCoral.health += 0.4;
            this.affectedCoral.healing = true;
            player.paint -= 0.1;
            console.log("painting");
        } else if (!player.useKey.isDown && this.affectedCoral.health > 0 && this.affectedCoral.health <= 100) {
            this.affectedCoral.healing = false;
        }
    },

    //if overlap, fill paint again
    fillPaintMeter: function (player, paintJelly) {
        if (player.paint < 100) {
            player.paint += 0.8;
        }
    },

    //if enemy overlap coral, do attacking animation and coral health reduction
    attackedCoral: function(enemy, coral) {
        //enemy.body.velocity.setTo(50, 50);
        enemy.attack();
        if (coral.health > 0) {
            coral.health = coral.health -0.02;
        }
    },

    //if collide with wall, enemy turns left or right
    collideWithWall: function(enemy, wall) {
      enemy.leftFace = !enemy.leftFace;
      //console.log("hit");
    },

    render: function () {
        //game.debug.text(`Debugging Phaser ${Phaser.VERSION}`, 20, 20, 'yellow');
        game.debug.text('FPS: ' + game.time.fps, 20, 20, 'yellow');

        //if shift held, you can see hitcircle for bird

        //toggles ability to see all collision circles
        if (toggleDebug) {
            //game.debug.body(this.grazeRadius);

            game.debug.body(this.player);
            this.paintFillGroup.forEach(function (jelly) {
                game.debug.body(jelly);
            });
            this.enemyGroup.forEach(function (enemy) {
                game.debug.body(enemy);
            });
            this.wallGroup.forEach(function (wall) {
                game.debug.body(wall);
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



        //Press keys to go back to title or replay
        this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        //game over sound
        //this.deathM = this.add.audio('gameOverSound');
        //this.deathM.play('', 0, 1, false);	// ('marker', start position, volume (0-1), loop)
    },

    update: function () {
        //if shift pressed, go to Title.  if enter key pressed, go to Play state and play again.

        if (firstPlay === true) {
            firstPlay = false;
        }
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
game.state.add('Boot', gameObj.Boot);
game.state.add('Preloader', gameObj.Preloader);
game.state.add('Title', gameObj.Title);
game.state.add('Tutorial', gameObj.Tutorial);
game.state.add('Play', gameObj.Play);
game.state.add('GameOverScreen', gameObj.GameOverScreen);
game.state.start('Boot');

var toggleDebug = false;
var countOfDied = 0;
var firstPlay = true;