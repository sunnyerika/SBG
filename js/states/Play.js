//Play state
var map;
//var snowball;
//var maxFish = 3;
var skier1;
var skier2;
var skier3;
var skier4;
var skier5;
var skier6;
var skier7;
var skier8;
var skier9;
var skier10;
var skierGroup;
var maxSkier = 3;
var score = 0;
var scoreText;
var weapons;
var count =5;
var finishLine;
//var deadFish;
var floor;

var timer,timeEvent,textTime;
var beaten;
var attack;
var getSkier;
var win;
var key;
var spaceBar;
var points100;
var points100group;
var max100 =2;
var spriteName;
var ifSpeed = 0;
var iceTimer;
var iceEvent;
var snowLayer;
var treeLayer;
var lakes;
var rocks;
var trees;
var rollingSnowBall;
var rollingSnowBallLong;
var snowballRolling0;
var snowBall0;
var damagedSkier;
//var snowBall1;
//var snowBall2;
//var snowBall3;
//var collision = false;



//var numberOfCollisions = 0;
var numberOfCollisionsWithSkiers = 0;
//var snowBallNew;
var snowBallState;
var snowBallAtlas;

var booleanHitRock = false;




var Play = function(game){

};
Play.prototype = {
  create:function(){
    key = game.input.keyboard;
    this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //ensure that when sprites are rendered,they are done so using integer positions
    this.game.renderer.renderSession.roundPixels = true;


    game.physics.startSystem(Phaser.Physics.Arcade);//arcade gives us velocity
    game.world.setBounds(0,0,2560,76800);
    //game.stage.backgroundColor = "#4488AA";
    //create new Tilemap object
    map = game.add.tilemap('mapSheet');
    map.addTilesetImage('TileSet2','mapSprite',32,32); //x2 //64x64 for the lake
    //level = mapElements/mapSprite
    // map = mapsheet



    //set seabedLayer to collide with other objects
    snowLayer = map.createLayer('snow');//"Snow" declared as a layer in the tilemap
    treeLayer = map.createLayer('treeLine');
    game.add.existing(treeLayer);
    treeLayer.resizeWorld();//we start with pixels of the world in the config like 500x500 for example, then we resize the game world while keeping the small window
    //game.add.existing(lakeLayer);
    //lakeLayer = map.createLayer('lake');
    //map.createFromObjects('lake',10,'lake',0,true,true,lakeLayer);
    lakes = game.add.group();
    lakes.enableBody = true;
    rocks = game.add.group();
    rocks.enableBody = true;
    trees = game.add.group();
    trees.enableBody = true;
    trees.setAll('body.immovable',true);
    map.createFromObjects('lake',15,'lake',0,true,true,lakes);
    map.createFromObjects('rock',12,'rock',0,true,true,rocks);
    map.createFromObjects('tree',2331,'tree',0,true,true,trees);
    map.setCollisionByExclusion([],true,'treeLine');
    map.setCollisionBetween[2047,2050];
    map.setCollisionBetween[2103,2106];
    map.setCollisionBetween[2159,2162];
    map.setCollisionBetween[2215,2218];
    map.setCollisionBetween[2271,2274];
    map.setCollisionBetween[2327,2330];
    map.setCollisionBetween[1794,1795];
    map.setCollisionBetween[1850,1851];
    map.setCollisionBetween[2058,2065];
    map.setCollisionBetween[2114,2121];
    map.setCollisionBetween[2170,2177];
    map.setCollisionBetween[2226,2233];
    map.setCollisionBetween[2282,2289];
    map.setCollisionBetween[2338,2345];
    map.setCollisionBetween[2394,2401];
    map.setCollisionBetween[2450,2457];

    //map.setCollisionByExclusion([],true,'lake');

    //add snowball
    //snowball = game.add.sprite(640,3500,'snowball');//position coordinates
    //we could use tiles: 7 tiles in, 13 tiles down:
    //(7*32, 1f3*64)
    //snowball.scale.setTo(2, 2);
    //snowball.anchor.setTo(1,1);

    //snowBall0 = game.add.sprite(600, 3500, 'snowBallAnimation0');//x, y, key, displaying the first frame by default
    snowBall0 = game.add.sprite(1280, 75800, 'snowBallAtlasNew','Snow_ball_0_01');
    game.physics.enable(snowBall0);
    snowBall0.body.collideWorldBounds = true;
    snowBall0.anchor.setTo(0.5,0.5);
    snowBall0.animations.add('snowBallRolling',[0,1,2],10,true);
    snowBall0.animations.add('collide1',[3,4,5],10,true);
    snowBall0.animations.add('collide2',[6,7,8],10,true);
    snowBall0.animations.add('collide3',[9,10,11],10,true);
    snowBall0.animations.add('collide4',[12,13,14],10,true);

    damagedSkier = game.add.sprite(1400, 75600, 'damagedSkierAtlas', 'Damage_01');
    game.physics.enable(damagedSkier);
    damagedSkier.body.collideWorldBounds = true;
    damagedSkier.anchor.setTo(0.5,0.5);
    damagedSkier.animations.add('flyingSkier',[0,1,2,3,4,5,6,7],10,true);


    skier1 = game. add.sprite(1500, 74200, 'skier1');
    skier2 = game. add.sprite(1300, 72000, 'skier1');
    skier3 = game. add.sprite(800, 70000, 'skier1');
    skier4 = game. add.sprite(500, 4800, 'skier1');
    skier5 = game. add.sprite(750, 3800, 'skier1');
    skier6 = game. add.sprite(550, 5800, 'skier1');
    skier7 = game. add.sprite(750, 5000, 'skier1');
    skier8 = game. add.sprite(450, 6000, 'skier1');
    skier9 = game. add.sprite(800, 7000, 'skier1');
    skier10 = game. add.sprite(600, 6500, 'skier1');
    game.physics.arcade.enable(skier1);
    game.physics.arcade.enable(skier2);
    game.physics.arcade.enable(skier3);
    game.physics.arcade.enable(skier4);
    game.physics.arcade.enable(skier5);
    game.physics.arcade.enable(skier6);
    game.physics.arcade.enable(skier7);
    game.physics.arcade.enable(skier8);
    game.physics.arcade.enable(skier9);
    game.physics.arcade.enable(skier10);


    //snowBall0 = game.add.sprite(600, 3500, 'snowBallAnimation');
    //snowBall0.animations.add('snowBallRolling', [0,1,2]);//1st para: choose a name for the animation/2nd:frames used for animation with index starting at 0
    //snowBall0.animations.add('collide1', [3,4,5]);
    //snowBall0.animations.add('collide2', [6,7,8]);

    //snowBall1 = game.add.sprite(500, 5000, 'snowBallAnimation1');
    //game.physics.arcade.enable(snowBall1);
    //snowBall1.animations.add('rolling', [0,1,2]);

    //snowBall2 = game.add.sprite(500, 5000, 'snowBallAnimation2');
    //game.physics.arcade.enable(snowBall2);
    //snowBall2.animations.add('rolling', [0,1,2]);


    //createSnowBall(snowBall1, 'snowBallAnimation1');
    // createSnowBall(snowBall2, 'snowBallAnimation2');
    //createSnowBall(snowBall3, 'snowBallAnimation3');


    //snowBallNew = game.add.sprite(500, 5000, 'snowBallAnimation1');
    //game.physics.arcade.enable(snowBallNew);
    //snowBallNew.animations.add('rolling', [0,1,2]);


    //game.physics.arcade.enable(snowBall0);
    //snowBall0.body.collideWorldBounds = true;
    //snowBall0.anchor.setTo(1,1);
    //snowBall0.body.createBodyCallback(treeLayer, myCollisionCallback, this);
    //game.physics.p2.setImpactEvents(true);
    //snowBall0.body.onCollide = new Phaser.Signal();
    //snowBall0.body.onCollide.add(myCollisionCallback, this);
    //snowBall0.body.gravity.y = 96;//for jumping to come down
    game.camera.follow(snowBall0);
    game.camera.roundPixels = true;
    //rollingSnowBallLong.frame = 0;
    //rollingSnowBall.idleFrame = 0;
    // var rollSize0 = this.rollingSnowBall.animations.add("roll0", [0, 1, 2]);
    //this.rollingSnowBall.play("roll0", 10, true);//ih the update function
    //var roll = rollingSnowBall.animations.add('roll');
    //rollingSnowBall.animations.play('roll', 30, true);

    /*
    //enable physics
    game.physics.enable(snowball);
    snowball.body.collideWorldBounds = true;
    snowball.anchor.setTo(0.5,0.5);
    snowball.body.tilePadding.set(64,64);
*/
    //points100 = game.add.sprite(800,1880,'100');


    //create finish line
    finishLine = game.add.sprite(640,20,'finishLine');
    //game.physics.enable(finishLine);
    finishLine.anchor.setTo(0.5,0.5);
    finishLine.scale.setTo(8,4);


    //create a rectangle in the coin fountain to collide with player
    //once player collides with the rectangle, the game ends
    //the rectangle is invisible
    floor = game.add.sprite(640,20,'rectangle');
    floor.scale.setTo(8,2);
    floor.anchor.setTo(0.5,0.5);
    game.physics.enable(floor);
    floor.alpha = 0;


    //create a group to hold the fish
    skierGroup = game.add.group();
    points100group = game.add.group();

    //create a group of lakes
    /*lakes = game.add.group();
    lakes.enableBody = true;
    lakes.create(750,2900,'lake');
    lakes.create(425,2700,'lake');
    lakes.create(600,2350,'lake');
    lakes.create(655,1550,'lake');
    lakes.create(500,1240,'lake');
    lakes.create(480,850,'lake');*/


    //make sure when players press UP or DOWN to control the character, the browser screen would not scroll
    game.input.keyboard.addKeyCapture(Phaser.Keyboard.UP);
    game.input.keyboard.addKeyCapture(Phaser.Keyboard.DOWN);
    //make camera follow the marine boy
    //game.camera.follow(snowball);

    //add text to show the player's score
    scoreText=game.add.text(1150,100,'Score:0',{font:'Helvetica',fontSize:'24px',fill:'#000'});
    scoreText.anchor.set(0.5);
    scoreText.fixedToCamera = true;
    scoreText.cameraOffset.setTo(800,50);


    //create a count down timer
    timer = game.time.create();
    timeEvent = timer.add(Phaser.Timer.MINUTE*1+Phaser.Timer.SECOND*15,this.endTimer,this);
    timeText = game.add.text(130,100,this.formatTime(Math.round((timeEvent.delay-timer.ms)/1000)),{font:'Helvetica',fontSize:'24px',fill:'#000'});
    timeText.anchor.set(0.5);
    timeText.fixedToCamera = true;
    timeText.cameraOffset.setTo(100,50);
    //start the timer
    timer.start();

  },

  endTimer:function(){
    timer.stop();
    //if time runs out, switch the state
    game.state.start('GameOver');
  },


  update:function(){
    //damagedSkier.animations.add('flyingSkier',[0,1,2,3,4,5,6,7],10,true);
    //damagedSkier.body.setSize(64,64,0,0);
    //damagedSkier.body.velocity.y = -200;
    //make collision works
    //game.physics.arcade.collide(skierGroup,treeLayer);
    //game.physics.arcade.collide(skierGroup,treeLayer);
    game.physics.arcade.collide(snowBall0,treeLayer,snowCollideTree,null,this);
    game.physics.arcade.collide(snowBall0,trees,snowCollideTrees,null,this);
    game.physics.arcade.collide(snowBall0,rocks,snowCollideRocks,null,this);


    game.physics.arcade.collide(snowBall0,skier1,snowCollideSkier,null,this);
    game.physics.arcade.collide(snowBall0,skier2,snowCollideSkier,null,this);
    game.physics.arcade.collide(snowBall0,skier3,snowCollideSkier,null,this);
    game.physics.arcade.collide(snowBall0,skier4,snowCollideSkier,null,this);
    game.physics.arcade.collide(snowBall0,skier5,snowCollideSkier,null,this);
    game.physics.arcade.collide(snowBall0,skier6,snowCollideSkier,null,this);
    game.physics.arcade.collide(snowBall0,skier7,snowCollideSkier,null,this);
    game.physics.arcade.collide(snowBall0,skier8,snowCollideSkier,null,this);
    game.physics.arcade.collide(snowBall0,skier9,snowCollideSkier,null,this);
    game.physics.arcade.collide(snowBall0,skier10,snowCollideSkier,null,this);
    //game.physics.arcade.collide(snowBall0,treeLayer, snowBall0.animations.play('collide1', 10, true), null, this);
    //game.physics.arcade.collide(snowBall0,treeLayer, this.collide1, null, this);
    //this.game.physics.arcade.collide(someSprite, someGroup);//collision with group
    //game.physics.arcade.overlap(weapons,fishGroup,beatFish,null,this);
    //this.game.physics.arcade.collide(sprite1, sprite2, this.someFunction, null, this);
    //collision between the two sprites, but it will also trigger someFunction
    //game.physics.p2.setImpactEvents(true);
    //game.physics.arcade.collide(snowball,treeLayer);
    game.physics.arcade.collide(skierGroup,treeLayer);
    game.physics.arcade.collide(points100group,treeLayer);

    game.physics.arcade.overlap(snowBall0,lakes,iceSpeed,null,this);
    //game.physics.arcade.overlap(snowBall1,lakes,iceSpeed,null,this);
    //game.physics.arcade.overlap(snowBall2,lakes,iceSpeed,null,this);
    game.physics.arcade.overlap(snowBall0,floor,winner,null,this);
    //game.physics.arcade.overlap(snowBall1,floor,winner,null,this);
    //game.physics.arcade.overlap(snowBall2,floor,winner,null,this);
    //game.physics.arcade.overlap(snowBall0,floor,myCollisionCallback,null,this);
    //game.physics.arcade.overlap(snowBall0, skier, onSkierCollision,  null, this);
    //game.physics.arcade.overlap(snowBall1, skier2, onSkierCollision,  null, this);

    if(numberOfCollisionsWithSkiers == 0 && ifSpeed == 0 && !booleanHitRock) {
      snowBall0.animations.play('snowBallRolling');
      snowBall0.body.setSize(32,32,0,0);
      snowBall0.body.velocity.y = -200;
      score +=1;
      scoreText.text='Score:'+score;

    }

    else if(numberOfCollisionsWithSkiers === 1&&ifSpeed ==0){
      snowBall0.animations.play('collide1');//skier collision animation
      snowBall0.body.setSize(50,50,10,10);
      snowBall0.body.velocity.y = -300;
      score +=1;
      scoreText.text='Score:'+score;

    }
    else if(numberOfCollisionsWithSkiers ===2 &&ifSpeed ==0){
      snowBall0.animations.play('collide2');
      snowBall0.body.setSize(90,90,20,15);
      snowBall0.body.velocity.y = -400;
      score +=1;
      scoreText.text='Score:'+score;
    }
    else if(numberOfCollisionsWithSkiers ===3&&ifSpeed ==0){
      snowBall0.animations.play('collide3', 10, true);
      snowBall0.body.setSize(180,180,40,40);
      snowBall0.body.velocity.y = -500;
      score +=1;
      scoreText.text='Score:'+score;
    }
    else if((numberOfCollisionsWithSkiers == 9|| numberOfCollisionsWithSkiers ==10)&&ifSpeed ==0){
      snowBall0.animations.play('collide4', 10, true);
      snowBall0.body.setSize(440,440,25,30);
      snowBall0.body.velocity.y = -600;
      score +=1;
      scoreText.text='Score:'+score;
    }

    /*

    else if(numberOfCollisionsWithSkiers >= 1&& numberOfCollisionsWithSkiers <=2&&ifSpeed ==0){
      snowBall0.animations.play('collide1');//skier collision animation
      snowBall0.body.setSize(50,50,10,10);
      snowBall0.body.velocity.y = -300;


    }
    else if(numberOfCollisionsWithSkiers >=3 &&numberOfCollisionsWithSkiers <=5&&ifSpeed ==0){
      snowBall0.animations.play('collide2');
      snowBall0.body.setSize(90,90,20,15);
      snowBall0.body.velocity.y = -400;
    }
    else if(numberOfCollisionsWithSkiers >=6&& numberOfCollisionsWithSkiers <=8&&ifSpeed ==0){
      snowBall0.animations.play('collide3', 10, true);
      snowBall0.body.setSize(180,180,40,40);
      snowBall0.body.velocity.y = -500;
    }
    else if((numberOfCollisionsWithSkiers == 9|| numberOfCollisionsWithSkiers ==10)&&ifSpeed ==0){
      snowBall0.animations.play('collide4', 10, true);
      snowBall0.body.setSize(440,440,25,30);
      snowBall0.body.velocity.y = -600;
    }
*/

    skier1.body.velocity.y = -150;
    skier2.body.velocity.y = -150;
    skier3.body.velocity.y = -150;
    skier4.body.velocity.y = -150;
    skier5.body.velocity.y = -150;
    skier6.body.velocity.y = -150;
    skier7.body.velocity.y = -150;
    skier8.body.velocity.y = -150;
    skier9.body.velocity.y = -150;
    skier10.body.velocity.y = -150;
    snowBall0.body.velocity.x = 0;
    //snowBallNew.body.velocity.x = 0;
    //snowBall1.body.velocity.x = 0;
    //snowBall2.body.velocity.x = 0;

    /* if(ifSpeed ==0){
       snowBall0.body.velocity.y = -200;//to make it move automatically w/0 key down
       //snowBallNew.body.velocity.y = -200;
       //snowBall1.body.velocity.y = -200;
       //snowBall2.body.velocity.y = -200;
     }
     if(ifSpeed ==-300){
       snowBall0.body.velocity.y = -300;//to make it move automatically w/0 key down
       snowBallNew.body.velocity.y = -300;
       snowBall1.body.velocity.y = -300;
       snowBall2.body.velocity.y = -300;
     }
     if(ifSpeed ==-500){
       snowBall0.body.velocity.y = -500;//to make it move automatically w/0 key down
       snowBallNew.body.velocity.y = -500;
       snowBall1.body.velocity.y = -500;
       snowBall2.body.velocity.y = -500;
     }*/
    //make animations work
    if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
      snowBall0.body.velocity.x = -200;
      booleanHitRock = false;
      //snowBallNew.body.velocity.x = -200;
      //snowBall1.body.velocity.x = -200;
      //snowBall2.body.velocity.x = -200;

    }else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
      snowBall0.body.velocity.x = 200;
      booleanHitRock =false;
      //snowBallNew.body.velocity.x = 200;
      //snowBall1.body.velocity.x = 200;
      //snowBall2.body.velocity.x = 200;
      //boy.animations.play('right');
    }

    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !booleanHitRock){
      snowBall0.body.velocity.y = -600;
      score +=4;
      scoreText.text='Score:'+score;
    }

    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && booleanHitRock){
      snowBall0.body.velocity.y = -600;
      scoreText.text='Score:'+score;
    }


    /*
    //set the player's velocity
    snowball.body.velocity.x = 0;
    if(ifSpeed ==0){
    	snowball.body.velocity.y = -200;
    }
    //make animations work
    if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
      snowball.body.velocity.x = -200;
      //boy.animations.play('left');
    }else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
      snowball.body.velocity.x = 200;
      //boy.animations.play('right');
    }
    //accelerate on space down
   if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      snowball.body.velocity.y = -600;
      score += 1;
     scoreText.text='Score:'+score;
    }
  */
    //update timer
    if(timer.running){
      timeText.text = 'Time: ' + this.formatTime(Math.round((timeEvent.delay-timer.ms)/1000));
    }

    /*
      if(skierGroup.countLiving()<maxSkier){
        //set the launch point to a random location
        this.launchSkier(game.rnd.integerInRange(300,600),snowball.y-300);
      }
      skierGroup.forEachAlive(function(n){
        //make player could collect skiers
        var distance = this.game.math.distance(n.x,n.y,snowball.x,snowball.y);
        if(distance<=30){
          n.kill();
          score += 10;
          scoreText.text='Score:'+score;
          //getDiamond.play();
        }else if(distance>=500){
          n.kill();
        }
      },this);
  *//*
    if(points100group.countLiving()<max100){
      //set the launch point to a random location
      this.spawnStaticSprite(game.rnd.integerInRange(200,900),snowBall0.y-300, points100group);
    }
    points100group.forEachAlive(function(n){
      //make player could collect skiers
      var distance = this.game.math.distance(n.x,n.y,snowBall0.x,snowBall0.y);
      if(distance<=30){
        n.kill();
        score += 100;
        scoreText.text='Score:'+score;
        //getDiamond.play();
      }else if(distance>=500){
        n.kill();
      }
    },this);
*/

    /*if(boy.x<650 && boy.x>550 && boy.y>3050 && boy.y<3200){
 game.state.start('GameOver');
 }*/

    console.log(snowBall0.x);
    console.log(snowBall0.y);
    console.log(numberOfCollisionsWithSkiers);
    console.log(ifSpeed);

    //console.log(snowball.x);
    //console.log(snowball.y);



  },
  /*render:function(){
  	game.debug.body(snowBall0);
  },
  launchSkier:function(x,y){
    //get the first dead diamond from the Diamond
    var skier = skierGroup.getFirstDead();
    //if there aren't any available, create a new one
    if(skier === null){
      skier = new Skier(this.game);
      skierGroup.add(skier);
    }
    //revive the diamond
    skier.revive();
    //move the diamond to the given coordinate
    skier.x = x;
    skier.y = y;
    return skier;
  },
  spawnStaticSprite:function(x,y,spritegroup){
    //get the first dead diamond from the Diamond
    var sprite = spritegroup.getFirstDead();
    //if there aren't any available, create a new one
    if(sprite === null){
      sprite = new StaticSprite(this.game);//passing spritename
      spritegroup.add(sprite);
    }
    //revive the diamond
    sprite.revive();
    //move the diamond to the given coordinate
    sprite.x = x;
    sprite.y = y;
    return sprite;
  },
    */
  formatTime:function(s){
    //refer to https://codepen.io/peacq/pen/WxLqpW
    var minutes = '0' + Math.floor(s/60);
    var seconds = '0' + (s - minutes*60);
    return minutes.substr(-2)+':'+seconds.substr(-2);
  },

  hit:function(){
    numberOfCollisions  ++;
  }
};



//diamond constructor
var Skier = function(game,x,y){
  Phaser.Sprite.call(this,game,x,y,'skier1');
  this.anchor.setTo(0.5,0.5);
  this.game.physics.enable(this,Phaser.Physics.ARCADE);
  this.scale.setTo(0.5,0.5);

  //define constants
  this.body.velocity.y = -200;

};

var StaticSprite = function(game,x,y){
  Phaser.Sprite.call(this,game,x,y,'100');
  this.anchor.setTo(0.5,0.5);
  //this.game.physics.enable(this,Phaser.Physics.ARCADE);
  //this.scale.setTo(0.5,0.5);

  //define constants
  //this.body.velocity.y = -200;

};

/*var collide1 = function(){
  snowBall0.animations.play('collide1', 10, true);
};*/

//Diamond are a type of sprites
Skier.prototype = Object.create(Phaser.Sprite.prototype);
Skier.prototype.constructor = Skier;

StaticSprite.prototype = Object.create(Phaser.Sprite.prototype);
StaticSprite.prototype.constructor = StaticSprite;




//when player reaches the coin fountain, the game ends
function winner(snowBall0,floor){
  //win.play();
  //boy.animations.play('win');
  game.state.start('GameOver');

};

/*function myCollisionCallback(obj1, obj2){
 // if (collision){
    //snowBall0.animations.play('collide1', 10, true);
  //}
  numberOfCollisions += 1;
  //obj2.animations.play('collide1', 10, true);
 // obj2 =
}*/

/*function myProcessCallback(snowBall0,treeLayer){
  collision = true;
}*/


function iceSpeed(snowball,lake){
  ifSpeed = 1;
  snowball.body.velocity.y = -400;
  //snowBall0.body.velocity.y = -600;

  //collision = true;

  //score += 1;
  //ice speed up timer
  iceTimer = game.time.create();
  iceEvent= iceTimer.add(Phaser.Timer.SECOND*1,speedRetrieve,this);
  iceTimer.start();
  score +=10;
  scoreText.text='Score:'+score;

};

/*function animateSnowBall(snowBall){
  snowBall.animations.play('rolling', 10, true);
}*/

/*
function changeSnowBall(snowball, velocity){
  snowball.x = x;
  snowball.y = y;
  snowball.body.velocity.y = velocity;
  animateSnowBall(snowball);
  game.camera.follow(snowball);
}
*/
/*function onSkierCollision(snowball,skier){
  var x;
  var y;
  var a;
  var b;
  a = skier.x;
  b = skier.y;
  ifSpeed = 1;
  x = snowball.x;
  y = snowball.y;
  snowball.kill();
  skier.kill();
  collision = true;
  numberOfCollisionsWithSkiers ++;
  //snowBall0.animations.play('collide1', 10, true);
  score += 100;
  if(numberOfCollisionsWithSkiers ===1){
    snowBall1.x = a;
    snowBall1.y = b;
    snowBall1.body.velocity.y = -300;
    ifSpeed =-300;
    animateSnowBall(snowBall1);
    game.camera.follow(snowBall1);
  } else if (numberOfCollisionsWithSkiers ===2){
    //changeSnowBall(snowBall2, -500);
    snowBall2.x = x;
    snowBall2.y = y;
    snowBall2.body.velocity.y = -500;
    ifSpeed = -500;
    animateSnowBall(snowBall2);
    game.camera.follow(snowBall2);
    snowBall1.kill();
  }*/


/*
switch (numberOfCollisionsWithSkiers){
  case 1:
    snowBall1.x = x;
    snowBall1.y = y;
    snowBall1.body.velocity.y = -100;
    animateSnowBall(snowBall1);
    game.camera.follow(snowBall1);
    break;
  case 2:
    snowBall2.x = x;
    snowBall2.y = y;
    snowBall2.body.velocity.y = -100;
    animateSnowBall(snowBall2);
    game.camera.follow(snowBall2);
    break;
  default:
    break;
}
*/

/*
snowBallNew.x = x;
snowBallNew.y = y;
snowBallNew.body.velocity.y = -100;
animateSnowBall(snowBallNew);
//snowBallNew.animations.play('newRolling', 10, true);
game.camera.follow(snowBallNew);
//ice speed up timer
iceTimer = game.time.create();
iceEvent= iceTimer.add(Phaser.Timer.SECOND*1,speedRetrieve,this);
iceTimer.start();
};*/

/*function createSnowBall(snowball,spritesheet){
  snowball = game.add.sprite(500, 5000, spritesheet);
  game.physics.arcade.enable(snowball);
  snowball.animations.add('rolling', [0,1,2]);
}*/

function snowCollideSkier(snowBall0,skier){
  numberOfCollisionsWithSkiers ++;
  score += 200;
  scoreText.text='Score:'+score;
  skier.kill();
}
function snowCollideTree(snowBall0,treeLayer){
  //score -= 100;
  booleanHitRock = true;

  if(numberOfCollisionsWithSkiers>0){
    numberOfCollisionsWithSkiers --;
    score -= 200;
    scoreText.text='Score:'+score;
  }

}
function snowCollideTrees(snowBall0,trees){
  //score -= 100;
  trees.body.immovable = true;
  trees.body.moves = false;
  booleanHitRock = true;

  if(numberOfCollisionsWithSkiers>0){
    numberOfCollisionsWithSkiers --;
    damagedSkier.animations.play('flyingSkier');
    score -= 200;
    scoreText.text='Score:'+score;
    damagedSkier.kill();
  }

}
function snowCollideRocks(snowBall0,rocks){
  //score -= 100;
  rocks.body.immovable = true;
  rocks.body.moves = false;

  if(numberOfCollisionsWithSkiers>0){
    numberOfCollisionsWithSkiers --;
   animateFlyingSkier();
    score -= 200;
    scoreText.text='Score:'+score;

  }

}


function speedRetrieve(){
  iceTimer.stop();
  ifSpeed = 0;
}

function animateFlyingSkier(){
  game.add.sprite(snowBall0.x, snowBall0.y, 'damagedSkierAtlas', 'Damage_01');
  game.physics.enable(damagedSkier);
  damagedSkier.animations.add('flyingSkier',[0,1,2,3,4,5,6,7],2,false);
  damagedSkier.kill();
}
