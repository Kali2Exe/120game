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
        this.stage.disableVisibilityChange = true; //orig value = false;
    },
    preload: function () {

        //CENTER THE GAME
        //game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE; //EXACT_FIT, SHOW_ALL
        this.game.scale.pageAlignHorizontally = true;
        //this.game.scale.pageAlignVertically = true;
        //this.game.scale.refresh();

        console.log('Boot: preload');
        //main use of Boot to load atlas from assets/img
        this.load.path = 'assets/img/';
        this.load.atlasJSONHash('atlas', 'sprites.png', 'sprites.json');
        this.load.atlasJSONHash('dead', 'spritesded.png', 'spritesded.json');
        this.load.atlasJSONHash('fishy', 'fishy.png', 'fishy.json');
        this.load.atlasJSONHash('jelly', 'jelly.png', 'jelly.json');
        this.load.atlasJSONHash('brushSon', 'brush.png', 'brush.json');
        this.load.atlasJSONHash('enemy', 'enemy.png', 'enemy.json');
        this.load.atlasJSONHash('effects', 'effects.png', 'effects.json');
        this.load.atlasJSONHash('slash', 'slash.png', 'slash.json');
        this.load.atlasJSONHash('bubbles', 'bubblesV2.png', 'bubbles.json');        
        this.load.atlasJSONHash('bar', 'resourcebar.png', 'resourcebar.json');
        this.load.atlasJSONHash('warning', 'warning.png', 'warning.json');
        this.load.image('creditstext', 'credits_text.png');
        this.load.image('credits', 'CREDITS.png');
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
        this.load.image('bg5', 'BG-desat.jpg');
        this.load.image('tutorial1', 'tutorial1.png');
        this.load.image('tutorial2', 'tutorial2.png');
        this.load.image('tutorial3', 'tutorial3.png');
        this.load.image('titlebg', 'TitleV2.jpg');
        //load static gameover image
        this.load.image('gameoverbg', 'gameover.png');                
        //vibrantcoral_1
        //this.load.image('player', 'ship.png');
        //this.load.image('coral', 'teset.png');
        this.load.image('greenB', 'border_green.png');
        this.load.image('barv2', 'barv2.png');
        //custom load screen.  loads image1 from atlas
        //this.add.image(0,0, 'atlas', 'loadimage1');

        //audio stuff
        this.load.path = 'assets/audio/bgm/';
        //add bgm
        this.load.audio('bgm1', 'hawaiiansdream.mp3'); 
        this.load.audio('bgm2', 'lastbreeze.mp3');
        this.load.audio('bgm3', 'sease.mp3');
        this.load.audio('bgm4', 'rideon.mp3');       
        this.load.audio('bgm5', 'sad.mp3');                 
        // add preloader image2 and set as preloader sprite (auto-crops sprite)
        //this.preloadBar = this.add.sprite(0, 0,'atlas', 'loadimage2');
        //this.load.setPreloadSprite(this.preloadBar);

        //sfx stuff
        this.load.path = 'assets/audio/sfx/';
        //add sfx

        this.load.audio('splat', 'impactsplat02.wav');
        this.load.audio('bub', 'impactsplat07.wav');
        this.load.audio('magical1', 'magical1.wav');
        //this.load.audio('sparkle', 'sparkle.ogg');
        this.load.audio('swish1', 'swish1.wav');
        this.load.audio('swish2', 'swish2.wav');
        this.load.audio('heal1', 'heal1.wav');
        this.load.audio('drink', 'drink.wav');
        this.load.audio('switch', 'switch.wav');




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

        //black fade thingy
        this.camera.flash('#000000');

        //SOUND STUFF
        //add bgm
        this.bgm1Sound = game.add.audio('bgm1'); 

        //add sfx
        this.magical1Sfx = game.add.audio('magical1');
        this.sparkle1Sfx = game.add.audio('sparkle');


        //play bgm
        this.bgm1Sound.play('',0,0.7,true,false); //play(marker, position, volume, loop, forceRestart)

        //add background image for title screen
        this.background = game.add.tileSprite(0, 0, 1200, 800, 'titlebg');
        //this.background.scale.set(2, 2);

        /*
        //add credits 'button'
        this.cred = game.add.sprite(1050,750,'creditstext');

        //enable image input on the credit button
        this.cred.inputEnabled = true;  

        //credits screen when the button is pressed
        this.cred.events.onInputDown.add(this.creditstart,this);
        */

        //this.text6 = game.add.text(600, 20, 'Press 0 to toggle \ndebug/collision circles', {fontSize: '16px', fill: 'Red'});

        //set keys for playing game or for toggling debug/collision circles
        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.zeroKey = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
        this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

        // play Title music
        //this.playMusic();
    },
    /*
    creditstart: function() {
        //stops start menu bgm music
        this.bgmSound.stop();

        //play "click" sound
        //this.goSound.play(); 

        //goes into the actual game
        this.state.start('CreditsScreen');
    },
    */
    update: function () {
        console.log('Title: update');

        //if you press Enter, you go to Play screen
        if (this.enterKey.justPressed()) {
            //this.firstMusic.stop();

            //play sfx on enter key
            this.magical1Sfx.play('',0,1,false,true);
            if (firstPlay) {
                this.state.start('Tutorial');

                //stop title bgm
                this.bgm1Sound.stop();

            } else {
                this.state.start('Play');

                //stop title bgm
                this.bgm1Sound.stop();

            }
        }
        //if press 0 (zero), toggle debugs
        if (this.zeroKey.justPressed()) {
            toggleDebug = !toggleDebug;
        }

        if(this.shiftKey.justPressed()) {
            this.magical1Sfx.play('',0,1,false,true);

            this.state.start('Tutorial');
            
            //stop title bgm
            this.bgm1Sound.stop();
        }

    }

    /*playMusic: function() {
     console.log('Playing music');

     //plays music
     this.firstMusic = this.add.audio('firstMusic');
     this.firstMusic.play('', 0, 0.75, true);   // ('marker', start position, volume (0-1), loop)

     }*/


};

// Tutorial state
//use for other things
gameObj.Tutorial = function () {
};

var tutstate = 1;

gameObj.Tutorial.prototype = {
    preload: function () {

    },
    create: function () {

        console.log('Tutorial: create');

        //black fade thingy
        this.camera.flash('#000000');

        //SOUND STUFF
        //add bgm
        this.bgm4Sound = game.add.audio('bgm4'); 

        //add sfx
        this.switchSfx = game.add.audio('switch'); 
        this.magical1Sfx = game.add.audio('magical1');




        //play bgm
        this.bgm4Sound.play('',0,0.5,true,false); //play(marker, position, volume, loop, forceRestart)

    /*
        this.text = game.add.text(600, 200, 'Tutorial!!! (Placeholder)', {fontSize: '64px', fill: 'white'});
        this.text.anchor.set(0.5);
    */
        
        //add background image of tutorial screen
        this.background = game.add.tileSprite(0, 0, 1200, 800, 'tutorial1');

    	this.cursors = game.input.keyboard.createCursorKeys();
        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.zeroKey = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
        this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        //this.player = new Player(this.game, 'fishy', 'fishy1', 'brushSon', 'brush_flipped');
    },
    update: function () {
        //if you press Enter, you go to Play screen
        if (this.enterKey.justPressed()) {
            this.magical1Sfx.play('',0,1,false,true);
            this.state.start('Play');

            //stop bgm
            this.bgm4Sound.stop();
        }

        //if press 0 (zero), toggle debugs
        if (this.zeroKey.justPressed()) {
            toggleDebug = !toggleDebug;
        }

        if(this.shiftKey.justPressed()) {
            this.state.start('Title');

            //stop bgm
            this.bgm4Sound.stop();
        }

        if(this.cursors.right.justPressed() && tutstate == 1) {
            this.switchSfx.play('',0,1,false,true);
        	tutstate = 2;
        	this.background = game.add.tileSprite(0, 0, 1200, 800, 'tutorial2');
        } else if (this.cursors.left.justPressed() && tutstate == 2){
            this.switchSfx.play('',0,1,false,true);
        	tutstate = 1;
        	this.background = game.add.tileSprite(0, 0, 1200, 800, 'tutorial1');
        } else if (this.cursors.right.justPressed() && tutstate == 2){
            this.switchSfx.play('',0,1,false,true);
        	tutstate = 3;
	        this.background = game.add.tileSprite(0, 0, 1200, 800, 'tutorial3');
        } else if (this.cursors.left.justPressed() && tutstate == 3){
            this.switchSfx.play('',0,1,false,true);
        	tutstate = 2;
        	this.background = game.add.tileSprite(0, 0, 1200, 800, 'tutorial2');        	
        } else if (this.cursors.right.justPressed() && tutstate ==3){
            this.switchSfx.play('',0,1,false,true);
        	tutstate = 1;
        	this.background = game.add.tileSprite(0, 0, 1200, 800, 'tutorial1');        	
        }
        ;

        /*if() {

        };*/
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

        //added quick black fade-in
        this.camera.flash('#000000');

        //SOUND STUFF
        //add bgm
        this.bgm2Sound = game.add.audio('bgm2'); 
        this.bgm5Sound = game.add.audio('bgm5');

        //add sfx
        this.drinkSfx = game.add.audio('drink'); 
        this.splatSfx = game.add.audio('splat'); 
        this.bubSfx = game.add.audio('bub'); 

        //play bgm
        this.bgm2Sound.play('',0,0.5,true,false); //play(marker, position, volume, loop, forceRestart)

        game.time.advancedTiming = true;

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.backgroundColor = '#ccffff';
        this.tileBack = game.add.tileSprite(0, 0, 1200, 800, 'bg2');
        //coral group for adding coral pictures

        //add green hover effect here.
        this.effectGlow = new Effect(this.game, -400, -400, 'effects', 'highlight_green_1', 'green');

        this.coralfg = game.add.group();
        this.coralfg.enableBody = true;

        this.coralded = game.add.group();
        this.coralded.enableBody = false;

        //creating coral images
        this.count = 0;
        //i * 3 + j	
        for (var i = 0; i < 3; i++) {
        	for (var j = 0; j < 6; j++) {
        		var nump = 0;
        		if ((i == 0) && (j == 3 || j == 5)) {
        			if (j == 3) {
        				nump = 10;
        			} else {
        				nump = 12
        			}
        		} else if ((i == 1) && (j == 0 || j == 2 || j == 4 )) {
        			if (j == 0) {
        				nump = 13;
        			} else if (j == 2) {
        				nump = 15;
        			} else if ( j == 4) {
        				nump = 17;
        			}
        		} else if ((i == 2) && (j == 0 || j == 3 || j == 5)) {
        			if (j == 0) {
        				nump = 19;
        			} else if (j == 3) {
        				nump = 22;
        			} else if (j == 5) {
        				nump = 24;
        			}
        		}

        		if (nump != 0) {
        			this.dedCoral = game.add.image(j*200, i*200 + 200, 'dead', 'dedcoral_'+ nump);
                    game.add.existing(this.dedCoral);
                    this.coralded.add(this.dedCoral);
                    this.coralPic = new Coral(this, 'atlas', 'vibrantcoral_' + nump, j* 200, i*200 + 200);
                    game.add.existing(this.coralPic);
                    this.coralfg.add(this.coralPic);
        		}
        	}
        }

        
        //second row of coral
        /*for (var j = 0; j < 6; j++) {
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
        }*/

        //need this to place coral under stuff
        game.world.moveDown(this.coralded);
        //game.world.moveUp(this.coralded);

        //adding coral text that will keep track of things
        this.coralfg.forEach(function (coralA) {
            coralA.statusText = game.add.text(coralA.x + 100, coralA.y + 100, coralA.status, {
                fontSize: '32px',
                fill: coralA.statColor,
                stroke: "white",
                strokeThickness: 3
            });
            coralA.statusText.anchor.set(0.5);
            coralA.healthText = game.add.text(coralA.x, coralA.y, coralA.health, {
                fontSize: '32px',
                fill: coralA.statColor,
                stroke: "white",
                strokeThickness: 3// adding stroke to the number makes the game drop a ton of fps , stroke: "white", strokeThickness: "5"
            });

        });


        //test status text: will have to change later as part of coral
        //this.healthText.anchor.set(0.5);

        //paint fillers
        this.paintFillGroup = game.add.group();
        this.paintFillGroup.enableBody = true;

        for (var nm = 0; nm < 2; nm++) {
            this.paintfill = new PaintFiller(this.game, 'jelly', 'jelly1', ((nm * 600) + 200), 100);
            //game.add.existing(this.paintfill);
            this.paintFillGroup.add(this.paintfill);
        }

        //enemy creater, spawner

        //enemy Spawner and shit
        this.enemyGroup = game.add.group();
        this.enemyGroup.enableBody = true;

        this.eneTick = 16000;
        /*this.enemySpawner = game.time.create();
        this.enemySpawner.loop(this.eneTick, function() {
            this.enemyFish = new Enemy(game, 'enemy', 'enemyR1', 'enemy', 'eraserR1');
            this.enemyGroup.add(this.enemyFish);
        }, this);*/

        //need invisible walls....
        this.wallGroup = game.add.group();
        this.wallGroup.enableBody = true;
        this.wall1 = new Wall(this.game, 2, -5);
        this.wallGroup.add(this.wall1);
        this.wall2 = new Wall(this.game, game.world.width-2, -5);
        this.wallGroup.add(this.wall2);


        //heal and sparkle effects
        this.effectHeal = new Effect(this.game, -400, -400, 'effects', 'plus1', 'heal');
        this.effectSparkle = new Effect(this.game, -400, -400, 'effects', 'sparkles1', 'sparkle');

        //enemy effects
        this.effectSlash = new Effect(this.game, -400, -400, 'slash', 'slash1', 'slash');
        //this.effectBubbles = new Effect(this.game, -400, -400, 'bubbles', 'bubbles1', 'bubbles');

        this.tick = 1500;
        //slow death of coral
        /*this.deathTick = game.time.create();
        this.deathTick.loop(this.tick, function() {
            this.coralfg.forEach(function (coralA) {
                if (coralA.canHighLight && !coralA.healing) {
                    coralA.health--;
                }
                //coralA.healing = false;
            });

        }, this);*/

        //global timer that increases coral drain and enemy spawn faster
        this.extra1 = 0;
        this.extra2 = 0;
        this.gWcheck = false;
        this.gWarning = new Effect(this.game, 600, 300, 'warning', 'warning1', 'warning');
        this.gWarning.anchor.set(0.5);
        this.globalTick = 30000; //30000
        this.globalWarning = game.time.create();
        this.globalWarning.repeat(this.globalTick, 4, function() {

            //each time this warning executes, reduce ticks and increase drain/enemy spawn faster
            this.extra1 = this.extra1 -250; //250

            //console.log(this.deathTick.delay);
            //console.log(this.tick);

            this.extra2 = this.extra2 - 1000;
            //console.log(this.enemySpawner.delay);
            //console.log(this.eneTick);
            this.gWcheck = true;
            this.gWarning.visible = true;
            this.gWarning.animations.play('warning');
            // .to({properties}, duration, ease, autoStart, delay, repeat, yoyo)

        }, this);

        //adding player sprite
        this.player = new Player(this.game, 'fishy', 'fishy1', 'brushSon', 'brush_flipped', 'bar', 'bar100');
        this.player.paintText = game.add.text(this.player.x, this.player.y-25, this.player.paint,
            {fontSize: '30px', fill: "red", stroke: "white", strokeThickness: "3"});
        //this.player.addChild(this.player.paintText);

        //overlapping coral that will be healed
        this.affectedCoral = null;

        //debug toggles
        this.zeroKey = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);

        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);


        countOfDied = 0;
        //deathCheck, check for number of dead coral
        this.deathCheck = game.time.create();
        this.deathCheck.loop(2000, function() {
            this.coralfg.forEach(function (coralA) {
                if (!coralA.canHighLight) {
                    countOfDied += 1;
                    console.log('how many died');
                    console.log(countOfDied);
                }
                //coralA.healing = false;
            });

            if (countOfDied >= 4) {
                this.bgm2Sound.stop();
                this.bgm5Sound.play('',0,0.5,true,false); //play(marker, position, volume, loop, forceRestart)
                this.tileBack.loadTexture('bg5');


            }

            if (countOfDied === 8) {
                this.state.start('GameOverScreen');

                //stop game bgm
                this.bgm5Sound.stop();

            } else {
                countOfDied = 0;
            }
        }, this);

        //loop event (delay, repeatCount, callback, context, arguments

        this.player.bringToTop();
        //this.enemySpawner.start();
        this.deathCheck.start();
        //this.deathTick.start();
        this.globalWarning.start();

    },

    update: function () {

        if (this.tick < game.time.now) {
            this.coralfg.forEach(function (coralA) {
                if (coralA.canHighLight && !coralA.healing) {
                    coralA.health--;
                }
                //coralA.healing = false;
            });

            this.tick = game.time.now + 1500 + this.extra1;

		}

		if (this.eneTick < game.time.now) {
            this.enemyFish = new Enemy(game, 'enemy', 'enemyR1', 'enemy', 'eraserR1');
            this.enemyGroup.add(this.enemyFish);

            this.eneTick = game.time.now + 16000 + this.extra2;

		}

        /*this.enemyGroup.forEach(function (enemyA) {
            enemyA.body.velocity.setTo(enemyA.vel, enemyA.vel);
        });*/

        this.effectGlow.visible = false;
        this.effectHeal.visible = false;
        this.effectSparkle.visible = false;

        this.effectSlash.visible = false;
        //this.effectBubbles.visible = false;

        //overlap and collide logic (see functions)
        game.physics.arcade.overlap(this.player, this.coralfg, this.highLightBorder, null, this);
        game.physics.arcade.overlap(this.player, this.paintFillGroup, this.fillPaintMeter, null, this);
        game.physics.arcade.overlap(this.enemyGroup, this.coralfg, this.attackedCoral, null, this);
        game.physics.arcade.collide(this.enemyGroup, this.wallGroup, this.collideWithWall);
        game.physics.arcade.overlap(this.player.weapon, this.enemyGroup, this.attackedEnemy, null, this);

        //debug toggle
        if (this.zeroKey.justPressed()) {
            toggleDebug = !toggleDebug;
        }

        //toggle display of status and health
        if (this.aKey.justPressed()) {
            this.coralfg.forEach(function (coralB) {
                coralB.statusText.visible = !coralB.statusText.visible;
                coralB.healthText.visible = !coralB.healthText.visible;
            });
        }
        this.tick = this.tick + 1;
        this.eneTick = this.eneTick + 1;
    },

    //if player overlap coral, highlight it
    //if player press use key and has paint, heal
    //DO NOT TOUCH
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

            //console.log(this.effectGlow);
            this.effectGlow.x = this.affectedCoral.x;
            this.effectGlow.y = this.affectedCoral.y;
            this.effectGlow.visible = true;
            this.effectGlow.animations.play('green_glow');
        }

        //DO NOT TOUCH
        if (player.paintMode && player.useKey.isDown && this.affectedCoral.health > 0 && this.affectedCoral.health < 100
                && player.paint > 0 && this.effectGlow.visible) {
            //this.affectedCoral = coralPic;
            this.affectedCoral.health += 0.4;
            this.affectedCoral.healing = true;
            player.paint -= 0.1;
            console.log("painting");

            this.effectHeal.x = this.affectedCoral.x;
            this.effectHeal.y = this.affectedCoral.y;
            this.effectHeal.visible = true;
            this.effectHeal.animations.play('heal');

        } else if (!player.useKey.isDown && this.affectedCoral.health > 0 && this.affectedCoral.health <= 100) {
            this.affectedCoral.healing = false;
        }
    },

    //if overlap, fill paint again
    fillPaintMeter: function (player, paintJelly) {
        if (player.paint < 100) {
            player.paint += 0.8;
            //normal paint refill is 0.8
            this.effectSparkle.x = paintJelly.x-50;
            this.effectSparkle.y = paintJelly.y-40;
            this.effectSparkle.visible = true;
            this.effectSparkle.animations.play('sparkle');

            //play refill sfx
            this.drinkSfx.play('',0,1,false,true); //play(marker, position, volume, loop, forceRestart) 

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

    //if attacking enemy in pen mode, decrease enemy health
    attackedEnemy: function(weapon, enemy) {

        if (!this.player.paintMode && this.player.useKey.isDown) {
            this.effectSlash.x = enemy.x-65;
            this.effectSlash.y = enemy.y-40;
            this.effectSlash.visible = true;
            this.effectSlash.animations.play('slash');
            enemy.health--;

            //play refill sfx
            this.splatSfx.play('',.3,0.2,false,false); //play(marker, position, volume, loop, forceRestart) 
        }

        //body touching
        //if health is <= 0, kill and remove from group
        if (enemy.health <= 0) {
            //this.effectBubbles.x = enemy.x-65;
            //this.effectBubbles.y = enemy.y-40;
            //this.effectBubbles.visible = true;
            //this.effectBubbles.animations.play('bubbles');

            this.bubblez = this.game.add.sprite(enemy.body.x-65,enemy.body.y-65,'bubbles');
            this.bubblez.animations.add ('bubbles',[1,6,2],2,true);
            this.bubblez.animations.play('bubbles',5,false,true);

            this.bubSfx.play('', 0, 0.5, false, false);

            enemy.eraser.kill();
            enemy.kill();
            enemy.eraser.destroy();
            enemy.destroy();


        }
        
    },

    //if collide with wall, enemy turns left or right
    collideWithWall: function(enemy, wall) {
      enemy.leftFace = !enemy.leftFace;
      //console.log("hit");
    },

    drainCoral: function(tick) {

    },


    render: function () {
        //game.debug.text(`Debugging Phaser ${Phaser.VERSION}`, 20, 20, 'yellow');
        game.debug.text('FPS: ' + game.time.fps, 20, 20, 'yellow');

        //if shift held, you can see hitcircle for bird

        //toggles ability to see all collision circles
        if (toggleDebug) {
            //game.debug.body(this.grazeRadius);

            game.debug.body(this.player);
            game.debug.body(this.player.weapon);
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

        //added quick black fade-in
        this.camera.flash('#000000');

        //SOUND STUFF
        //add bgm
        this.bgm3Sound = game.add.audio('bgm3'); 

        //play bgm
        this.bgm3Sound.play('',2,0.1,true,false); //play(marker, position, volume, loop, forceRestart) 

        //this.endGround = game.add.image(0, 0, 'atlas', 'backgroundGREY');

        this.background = game.add.tileSprite(0, 0, 1200, 800, 'gameoverbg');

        this.game.time.events.add(Phaser.Timer.SECOND * 5, this.changePicture, this); //change bg to credits after 10 seconds

        //Text that shows game over and key presses to go back to a screen or replay
        /*this.gameOverText = game.add.text(600, 250, 'Game Over', {fontSize: '64px', fill: 'red'});
        this.gameOverText.anchor.set(0.5);
        //this.gameOverText.scale.set(0.5, 0.5);

        //this.goText = game.add.text(400, 250, 'Final Score: ' + globalScore.toFixed(1), {fontSize: '32px', fill: 'yellow'});
        //this.goText.anchor.set(0.5);

        this.exitT1 = game.add.text(600, 375, 'Press Shift to Title Screen', {fontSize: '64px', fill: 'red'});
        this.exitT1.anchor.set(0.5);
        this.exitT2 = game.add.text(600, 475, 'Press Enter to Replay', {fontSize: '64px', fill: 'red'});
        this.exitT2.anchor.set(0.5);
        */


        //Press keys to go back to title or replay
        this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        //game over sound
        //this.deathM = this.add.audio('gameOverSound');
        //this.deathM.play('', 0, 1, false);    // ('marker', start position, volume (0-1), loop)
    },
    
    changePicture: function() {
    
    //black fade thingy
    this.camera.flash('#000000');
    this.background = game.add.tileSprite(0, 0, 1200, 800, 'credits');

    },

    update: function () {
        //if shift pressed, go to Title.  if enter key pressed, go to Play state and play again.

        if (firstPlay === true) {
            firstPlay = false;
        }
        if (this.shiftKey.justPressed()) {
            //this.deathM.stop();
            this.state.start('Title');

            //stop bgm
            this.bgm3Sound.stop();

        } else if (this.enterKey.justPressed()) {
            //this.deathM.stop();
            this.state.start('Play');

            //stop bgm
            this.bgm3Sound.stop();
        } 
    }

};

// init game
var game = new Phaser.Game(1200, 800, Phaser.AUTO, 'gamecanvas');
game.state.add('Boot', gameObj.Boot);
game.state.add('Preloader', gameObj.Preloader);
game.state.add('Title', gameObj.Title);
game.state.add('Tutorial', gameObj.Tutorial);
game.state.add('Play', gameObj.Play);
game.state.add('GameOverScreen', gameObj.GameOverScreen);
//game.state.add('CreditsScreen', gameObj.CreditsScreen);
game.state.start('Boot');

var toggleDebug = false;
var countOfDied = 0;
var firstPlay = true;
