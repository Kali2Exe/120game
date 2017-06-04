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

        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.setShowAll();
        window.addEventListener('resize', function () {  this.game.scale.refresh();});
        this.game.scale.refresh();
        
        console.log('Boot: preload');
        //main use of Boot to load atlases from assets/img
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

        //load extraneous images
        this.load.image('bg', 'vibrantbg.png');
        this.load.image('bg2', 'BG-4.jpg');
        this.load.image('bg5', 'BG-desat.jpg');
        this.load.image('tutorial1', 'tutorial1.png');
        this.load.image('tutorial2', 'tutorial2.png');
        this.load.image('tutorial3', 'tutorial3.png');
        this.load.image('titlebg', 'title.png');
        //load static gameover image
        this.load.image('gameoverbg', 'gameover.png');
        this.load.image('greenB', 'border_green.png');
        this.load.image('barv2', 'barv2.png');


        //audio stuff
        this.load.path = 'assets/audio/bgm/';
        //add bgm
        this.load.audio('bgm1', 'hawaiiansdream.mp3'); 
        this.load.audio('bgm2', 'lastbreeze.mp3');
        this.load.audio('bgm3', 'sease.mp3');
        this.load.audio('bgm4', 'rideon.mp3');       
        this.load.audio('bgm5', 'sad.mp3');                 

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

    },
    update: function () {

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

    //in create of Title, create the Title Screen with image
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

        //set keys for playing game or for toggling debug/collision circles
        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.zeroKey = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
        this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

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
                //start play if not first play through
                this.state.start('Play');
                //stop title bgm
                this.bgm1Sound.stop();

            }
        }
        //if press 0 (zero), toggle debugs
        if (this.zeroKey.justPressed()) {
            toggleDebug = !toggleDebug;
        }

        //shift key start tutorial
        if(this.shiftKey.justPressed()) {
            this.magical1Sfx.play('',0,1,false,true);

            this.state.start('Tutorial');
            
            //stop title bgm
            this.bgm1Sound.stop();
        }

    }

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

        //create tutorial
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

        //add background image of tutorial screen
        this.background = game.add.tileSprite(0, 0, 1200, 800, 'tutorial1');

        //logical keys that move tutorial images forward or backward
    	this.cursors = game.input.keyboard.createCursorKeys();
        this.qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        this.eKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.zeroKey = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
        this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        this.player = new Player(this.game, 'fishy', 'fishy1', 'brushSon', 'brush_flipped');
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

        //loads texture images
        if(this.eKey.justPressed() && tutstate == 1) {
            this.switchSfx.play('',0,1,false,true);
        	tutstate = 2;
            this.background.loadTexture('tutorial2');
        	//this.background = game.add.tileSprite(0, 0, 1200, 800, 'tutorial2');
        } else if (this.qKey.justPressed() && tutstate == 2){
            this.switchSfx.play('',0,1,false,true);
        	tutstate = 1;
            this.background.loadTexture('tutorial1');
        	//this.background = game.add.tileSprite(0, 0, 1200, 800, 'tutorial1');
        } else if (this.eKey.justPressed() && tutstate == 2){
            this.switchSfx.play('',0,1,false,true);
        	tutstate = 3;
            this.background.loadTexture('tutorial3');
	        //this.background = game.add.tileSprite(0, 0, 1200, 800, 'tutorial3');
        } else if (this.qKey.justPressed() && tutstate == 3){
            this.switchSfx.play('',0,1,false,true);
        	tutstate = 2;
            this.background.loadTexture('tutorial2');
        	//this.background = game.add.tileSprite(0, 0, 1200, 800, 'tutorial2');        	
        } else if (this.eKey.justPressed() && tutstate ==3){
            this.switchSfx.play('',0,1,false,true);
        	tutstate = 1;
            this.background.loadTexture('tutorial1');
        	//this.background = game.add.tileSprite(0, 0, 1200, 800, 'tutorial1');        	
        }

    }
};

var customgametime = 0;
var customgametime2 = 0;

//Play Screen
gameObj.Play = function () {

};
gameObj.Play.prototype = {
    preload: function () {
        //console.log('Play: preload');
        //load assets

    },

    //in create of Play
    create: function () {

    	//SECONDS COUNTER
        this.gametime = game.time.create(false);
        this.gametime.start();
    	this.gametime.loop(1000, this.updateCounter, this);
    	customgametime = 0;

    	//Minutes COUNTER
        this.gametime2 = game.time.create(false);
        this.gametime2.start();
    	this.gametime2.loop(60000, this.updateCounter2, this);
    	customgametime2 = 0;    

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


        //need this to place dead coral under real coral
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

        //paint fillers that refill paint
        this.paintFillGroup = game.add.group();
        this.paintFillGroup.enableBody = true;

        for (var nm = 0; nm < 2; nm++) {
            this.paintfill = new PaintFiller(this.game, 'jelly', 'jelly1', ((nm * 600) + 200), 100);
            //game.add.existing(this.paintfill);
            this.paintFillGroup.add(this.paintfill);
        }

        //enemy creater, spawner

        //enemy Group
        this.enemyGroup = game.add.group();
        this.enemyGroup.enableBody = true;

        this.eneTick = 16000;

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

        //a key toggles text on and off
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
                if (this.extra1 != -1350) {
                    this.extra1 = -1350;
                }

            }

            //if all 8 coral die, start over
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
        this.deathCheck.start();
        this.globalWarning.start();


    },

	updateCounter: function() { //custom game timer

    	if (customgametime >= 60) { //go back to 0 once it hits 60
    		customgametime = 0;
    	} else {
    		customgametime++;
    	}

	},

	updateCounter2: function() { //custom game timer

    customgametime2++;

	},

    update: function () {

        //slow tick of coral drain
        if (this.tick < game.time.now) {
            this.coralfg.forEach(function (coralA) {
                if (coralA.canHighLight && !coralA.healing) {
                    coralA.health--;
                }
                //coralA.healing = false;
            });

            this.tick = game.time.now + 1500 + this.extra1;

		}


		//enemy spawner
		if (this.eneTick < game.time.now) {
            this.enemyFish = new Enemy(game, 'enemy', 'enemyR1', 'enemy', 'eraserR1');
            this.enemyFish.tint = Math.random() * 0xffffff; //sprite tint every spawn

            this.enemyGroup.add(this.enemyFish);

            this.eneTick = game.time.now + 16000 + this.extra2;


		}

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

        //create text reminder @ ~8 seconds that you can toggle coral health
        if (customgametime == 3){
        	this.toggleAtext = this.add.text(this.game.world.centerX,this.game.world.centerY,
        		'Remember!\n You can toggle coral health by pressing "A"!', 
    			{font: '25px arial', fill: '#000000', align: 'center', stroke: 'white', strokeThickness: 2});
  			this.toggleAtext.anchor.setTo(0.5, 0.5);        	
        	this.time.events.add(5000, this.toggleAtext.destroy, this.toggleAtext, this.destroy, this.game.add.tween(this.toggleAtext).to( { alpha: 0 }, 2000, "Linear", true));

        }        

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
        game.debug.text('Internal game time: ' + game.time.now, 20, 40, 'yellow');
        game.debug.text('Game time (seconds): ' + customgametime, 20, 60, 'yellow');
        game.debug.text('Game time (minutes): ' + customgametime2, 20, 80, 'yellow');

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

        if (customgametime < 10) {
    	var style = { font: "20px Arial", fill: "#000000", boundsAlignH: "center", boundsAlignV: "middle" };
        this.text = game.add.text(0, 0, "However, it did survive for " + customgametime2 + ":0" + customgametime + " minutes!", style);
        this.text.setTextBounds(-20, 380, 1200, 800);
    	} else {
    	var style = { font: "20px Arial", fill: "#000000", boundsAlignH: "center", boundsAlignV: "middle" };
        this.text = game.add.text(0, 0, "However, it did survive for " + customgametime2 + ":" + customgametime + " minutes!", style);
        this.text.setTextBounds(-20, 380, 1200, 800);    		
    	}

        this.game.time.events.add(Phaser.Timer.SECOND * 10, this.changePicture, this); //change bg to credits after 10 seconds

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

    if (customgametime < 10) {
    var style3 = { font: "bold 20px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle", stroke: "black", strokeThickness: 1 };
    this.text3 = game.add.text(0, 0, "& YOU for helping!", style3);
    this.text3.setTextBounds(-300, 350, 1200, 800);

    var style2 = { font: "20px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle", stroke: "black", strokeThickness: 1  };
    this.text2 = game.add.text(0, 0, "The coral reef survived for " + customgametime2 + ":0" + customgametime + " minutes!", style2);
    this.text2.setTextBounds(-300, 380, 1200, 800);
    } else {

    var style3 = { font: "bold 20px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle", stroke: "black", strokeThickness: 1 };
    this.text3 = game.add.text(0, 0, "& YOU for helping!", style3);
    this.text3.setTextBounds(-300, 350, 1200, 800);

    var style2 = { font: "20px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle", stroke: "black", strokeThickness: 1  };
    this.text2 = game.add.text(0, 0, "The coral reef survived for " + customgametime2 + ":" + customgametime + " minutes!", style2);
    this.text2.setTextBounds(-300, 380, 1200, 800);
    }

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
var game = new Phaser.Game(1200, 800, Phaser.CANVAS, 'gamecanvas');
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
