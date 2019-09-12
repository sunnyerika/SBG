//Play state
var map;
//var snowball;
//var maxFish = 3;
var skier;
var skier2;
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
var rollingSnowBall;
var rollingSnowBallLong;
var snowballRolling0;
var snowBall0;
var snowBall1;
var snowBall2;
var snowBall3;
var collision = false;



var numberOfCollisions = 0;
var numberOfCollisionsWithSkiers = 0;
var snowBallNew;
var snowBallState;
var snowBallAtlas;



var Play = function(game){

};
Play.prototype = {
  create:function(){
     key = game.input.keyboard;
    this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //ensure that when sprites are rendered,they are done so using integer positions
    this.game.renderer.renderSession.roundPixels = true;


    game.physics.startSystem(Phaser.Physics.Arcade);//arcade gives us velocity
    game.world.setBounds(0,0,2560,7680);
    //game.stage.backgroundColor = "#4488AA";
    //create new Tilemap object
    map = game.add.tilemap('mapSheet');
    map.addTilesetImage('TileSet1','mapSprite',32,32); //x2 //64x64 for the lake
    //level = mapElements/mapSprite
    // map = mapsheet



    //set seabedLayer to collide with other objects
    snowLayer = map.createLayer('snow');//"Snow" declared as a layer in the tilemap
    treeLayer = map.createLayer('treeAndRock');
    game.add.existing(treeLayer);
    treeLayer.resizeWorld();//we start with pixels of the world in the config like 500x500 for example, then we resize the game world while keeping the small window
    //game.add.existing(lakeLayer);
    //lakeLayer = map.createLayer('lake');
    //map.createFromObjects('lake',10,'lake',0,true,true,lakeLayer);
    lakes = game.add.group();
    lakes.enableBody = true;
    map.createFromObjects('lake',10,'lake',0,true,true,lakes);
    map.setCollisionByExclusion([],true,'treeAndRock');
    map.setCollisionBetween[1300,1303];
    map.setCollisionBetween[1340,1343];
    map.setCollisionBetween[1380,1383];
    map.setCollisionBetween[1420,1423];
    //map.setCollisionByExclusion([],true,'lake');

    //add snowball
    //snowball = game.add.sprite(640,3500,'snowball');//position coordinates
    //we could use tiles: 7 tiles in, 13 tiles down:
    //(7*32, 1f3*64)
    //snowball.scale.setTo(2, 2);
    //snowball.anchor.setTo(1,1);

    //snowBall0 = game.add.sprite(600, 3500, 'snowBallAnimation0');//x, y, key, displaying the first frame by default
    snowBall0 = game.add.sprite(1280, 7580, 'snowBallAnimation1');

    snowBallAtlas = game.add.sprite(game.width/2,game.height/2,'atlas','alienGreen');

    skier = game. add.sprite(550, 2000, 'skier1');
    skier2 = game. add.sprite(750, 1500, 'skier1');
    game.physics.arcade.enable(skier);
    game.physics.arcade.enable(skier2);

    snowBall0 = game.add.sprite(600, 3500, 'snowBallAnimation');
    snowBall0.animations.add('snowBallRolling', [0,1,2]);//1st para: choose a name for the animation/2nd:frames used for animation with index starting at 0
    snowBall0.animations.add('collide1', [3,4,5]);
    snowBall0.animations.add('collide2', [6,7,8]);

    snowBall1 = game.add.sprite(500, 5000, 'snowBallAnimation1');
    game.physics.arcade.enable(snowBall1);
    snowBall1.animations.add('rolling', [0,1,2]);



    //createSnowBall(snowBall1, 'snowBallAnimation1');
    createSnowBall(snowBall2, 'snowBallAnimation2');
    createSnowBall(snowBall3, 'snowBallAnimation3');


    snowBallNew = game.add.sprite(500, 5000, 'snowBallAnimation1');
    game.physics.arcade.enable(snowBallNew);
    snowBallNew.animations.add('rolling', [0,1,2]);


    game.physics.arcade.enable(snowBall0);
    snowBall0.body.collideWorldBounds = true;
    snowBall0.anchor.setTo(1,1);
    //snowBall0.body.createBodyCallback(treeLayer, myCollisionCallback, this);
    //game.physics.p2.setImpactEvents(true);
    snowBall0.body.onCollide = new Phaser.Signal();
    snowBall0.body.onCollide.add(myCollisionCallback, this);
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
    //make collision works
    game.physics.arcade.collide(skierGroup,treeLayer);
    game.physics.arcade.collide(points100group,treeLayer);
    game.physics.arcade.collide(snowBall0,treeLayer);
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
    game.physics.arcade.overlap(snowBall0,floor,winner,null,this);
    //game.physics.arcade.overlap(snowBall0,floor,myCollisionCallback,null,this);
    game.physics.arcade.overlap(snowBall0, skier, onSkierCollision,  null, this);
    game.physics.arcade.overlap(snowBall1, skier2, onSkierCollision,  null, this);

    if(!collision){
      snowBall0.animations.play('snowBallRolling', 10, true);

    }

    skier.body.velocity.y = -80;
    skier2.body.velocity.y = -80;
    snowBall0.body.velocity.x = 0;
    snowBallNew.body.velocity.x = 0;

    if(ifSpeed ==0){
      snowBall0.body.velocity.y = -200;//to make it move automatically w/0 key down
      snowBallNew.body.velocity.y = -200;
    }
    //make animations work
    if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
      snowBall0.body.velocity.x = -200;
      snowBallNew.body.velocity.x = -200;

    }else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
      snowBall0.body.velocity.x = 200;
      snowBallNew.body.velocity.x = 200;
      //boy.animations.play('right');
    }
    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      snowBall0.body.velocity.y = -600;
      snowBallNew.body.velocity.y = -600;
      score += 1;
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
    console.log(snowBall0.body.velocity.y);
    console.log(map.layer);
    //console.log(snowball.x);
    //console.log(snowball.y);



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

  formatTime:function(s){
    //refer to https://codepen.io/peacq/pen/WxLqpW
    var minutes = '0' + Math.floor(s/60);
    var seconds = '0' + (s - minutes*60);
    return minutes.substr(-2)+':'+seconds.substr(-2);
  },

  hit:function(){
    numberOfCollisions = 1;
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

var collide1 = function(){
  snowBall0.animations.play('collide1', 10, true);
};

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

function myCollisionCallback(obj1, obj2){
  /*
  if (collision){
    snowBall0.animations.play('collide1', 10, true);
  }*/
  numberOfCollisions += 1;
  //obj2.animations.play('collide1', 10, true);
 // obj2 =

  }

function myProcessCallback(snowBall0,treeLayer){
  collision = true;
}


function iceSpeed(snowball,lake){
  var x;
  var y;
	ifSpeed = 1;
	snowball.body.velocity.y = -600;
	//snowBall0.body.velocity.y = -600;

	collision = true;

  score += 1;
	//ice speed up timer
	iceTimer = game.time.create();
	iceEvent= iceTimer.add(Phaser.Timer.SECOND*1,speedRetrieve,this);
	iceTimer.start();

};

function animateSnowBall(snowBall){
  snowBall.animations.play('rolling', 10, true);
}


function onSkierCollision(snowball,skier){
  var x;
  var y;
  ifSpeed = 1;
  //snowball.body.velocity.y = -600;
  //snowBall0.body.velocity.y = -600;
  //snowBall0.kill();
  /*
  x = skier.x;
  y = skier.y;
  */
  x = snowball.x;
  y = snowball.y+50;
  snowball.kill();
  skier.kill();
  collision = true;
  numberOfCollisionsWithSkiers ++;
  //snowBall0.animations.play('collide1', 10, true);
  score += 100;

  if(numberOfCollisionsWithSkiers ===1){
    /*
    snowBall1.x = x;
    snowBall1.y = y;
    snowBall1.body.velocity.y = -100;
    animateSnowBall(snowBall1);
    game.camera.follow(snowBall1);
*/
    snowBallNew.x = x;
    snowBallNew.y = y;
    snowBallNew.body.velocity.y = -150;
    animateSnowBall(snowBallNew);
    //snowBallNew.animations.play('newRolling', 10, true);
    game.camera.follow(snowBallNew);


  }
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
*/
  //ice speed up timer
  iceTimer = game.time.create();
  iceEvent= iceTimer.add(Phaser.Timer.SECOND*1,speedRetrieve,this);
  iceTimer.start();

};

function createSnowBall(snowball,spritesheet){
  snowball = game.add.sprite(500, 5000, spritesheet);
  game.physics.arcade.enable(snowball);
  snowball.animations.add('rolling', [0,1,2]);
}



function speedRetrieve(){
	iceTimer.stop();
	ifSpeed = 0;
}

