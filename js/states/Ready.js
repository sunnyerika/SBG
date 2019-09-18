//Ready State
var Ready = function(game){};
var timer, timeEvent, text;
var readySnow;
Ready.prototype = {
  create:function(){
    //create a custom timer

    timer = game.time.create();

    //create a event 3s from now
    timeEvent = timer.add(Phaser.Timer.SECOND*5,this.endTimer,this);
    //start the timer
    timer.start();
    if(timer.running){

      var readyText = game.add.text(game.width/2,game.height/2,'Game is loading',{font:'Helvetica',fontSize:'48px',fill:'#fff'});

      readyText.anchor.set(0.5);
    }

    readySnow = game.add.sprite(70, game.height/2+100, 'snowBallAtlasNew','Snow_ball_0_01');
    readySnow.anchor.setTo(0.5,0.5);
    game.physics.enable(readySnow);
    readySnow.checkWorldBounds = true;
    readySnow.animations.add('snowBallRolling',[0,1,2],10,true);
    readySnow.animations.play('snowBallRolling',10,true);
    readySnow.body.velocity.x = 500;
    readySnow.events.onOutOfBounds.add(snowOut,this);

  },
  update:function(){
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();
  },

  endTimer:function(){
    //stop the timer
    timer.stop();
    game.state.start('Play');
  }
};
function snowOut(readySnow){
  readySnow.reset(70,game.height/2+100);
  readySnow.body.velocity.x = 500;
}
