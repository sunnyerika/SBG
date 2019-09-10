//Play state
var map;
var snowball;
//var maxFish = 3;
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

var Play = function(game){

};
Play.prototype = {
  create:function(){

    key = game.input.keyboard;
    this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //ensure that when sprites are rendered,they are done so using integer positions
    this.game.renderer.renderSession.roundPixels = true;

    game.physics.startSystem(Phaser.Physics.Arcade);
    game.world.setBounds(0,0,640,1920);
    //game.stage.backgroundColor = "#4488AA";
    //create new Tilemap object
    map = game.add.tilemap('mapSheet');
    map.addTilesetImage('mapElements','mapSprite',32,32);

    //set seabedLayer to collide with other objects
    snowLayer = map.createLayer('Snow');
    treeLayer = map.createLayer('treeAndRock');
    game.add.existing(treeLayer);
    treeLayer.resizeWorld();
    map.setCollisionByExclusion([],true,'treeAndRock');

    //add snowball
    snowball = game.add.sprite(640,1880,'snowball');
    //enable physics
    game.physics.enable(snowball);
    snowball.body.collideWorldBounds = true;
    snowball.anchor.setTo(0.5,0.5);
    snowball.body.tilePadding.set(64,64);

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


    //make sure when players press UP or DOWN to control the character, the browser screen would not scroll
    game.input.keyboard.addKeyCapture(Phaser.Keyboard.UP);
    game.input.keyboard.addKeyCapture(Phaser.Keyboard.DOWN);
    //make camera follow the marine boy
    game.camera.follow(snowball);

    //add text to show the player's score
    scoreText=game.add.text(1150,100,'Score:0',{font:'Helvetica',fontSize:'24px',fill:'#000'});
    scoreText.anchor.set(0.5);
    scoreText.fixedToCamera = true;
    scoreText.cameraOffset.setTo(800,50);


    //create a count down timer
	timer = game.time.create();
	timeEvent = timer.add(Phaser.Timer.SECOND*15,this.endTimer,this);
	timeText = game.add.text(130,100,this.formatTime(Math.round((timeEvent.delay-timer.ms)/1000)),{font:'Helvetica',fontSize:'24px',fill:'#000'});
	timeText.anchor.set(0.5);
	timeText.fixedToCamera = true;
	timeText.cameraOffset.setTo(100,50);
	//start the timer
	timer.start();

    //create eight-way bullets
    /*weapons = new EightWay(this.game);
    game.physics.enable(weapons);*/



  },

endTimer:function(){
	timer.stop();
	//if time runs out, switch the state
	game.state.start('GameOver');
},


  update:function(){
    //make collision works
    game.physics.arcade.collide(snowball,treeLayer);
    game.physics.arcade.collide(skierGroup,treeLayer);
    game.physics.arcade.collide(points100group,treeLayer);
    //game.physics.arcade.overlap(weapons,fishGroup,beatFish,null,this);
    game.physics.arcade.overlap(snowball,floor,winner,null,this);

    //set the player's velocity
    snowball.body.velocity.x = 0;
    snowball.body.velocity.y = -300;

    //make animations work
    if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
      snowball.body.velocity.x = -300;
      //boy.animations.play('left');
    }else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
      snowball.body.velocity.x = 300;
      //boy.animations.play('right');
    }

    //accelerate on space down
   if(game.input.keyboard.isDown(Phaser.Keyboard.F)){
      snowball.body.velocity.y = -600;
      score += 1;
     scoreText.text='Score:'+score;
    }

    //update timer
	if(timer.running){
      timeText.text = 'Time: ' + this.formatTime(Math.round((timeEvent.delay-timer.ms)/1000));
    }

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

    if(points100group.countLiving()<max100){
      //set the launch point to a random location
      this.spawnStaticSprite(game.rnd.integerInRange(200,900),snowball.y-300, points100group);
    }

    points100group.forEachAlive(function(n){
      //make player could collect skiers
      var distance = this.game.math.distance(n.x,n.y,snowball.x,snowball.y);
      if(distance<=30){
        n.kill();
        score += 100;
        scoreText.text='Score:'+score;
        //getDiamond.play();
      }else if(distance>=500){
        n.kill();
      }
    },this);


       /*if(boy.x<650 && boy.x>550 && boy.y>3050 && boy.y<3200){
    game.state.start('GameOver');
    }*/
    console.log(snowball.x);
    console.log(snowball.y);


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
//Diamond are a type of sprites
Skier.prototype = Object.create(Phaser.Sprite.prototype);
Skier.prototype.constructor = Skier;

StaticSprite.prototype = Object.create(Phaser.Sprite.prototype);
StaticSprite.prototype.constructor = StaticSprite;




//when player reaches the coin fountain, the game ends
function winner(snowball,floor){
  //win.play();
  //boy.animations.play('win');
  game.state.start('GameOver');

}
