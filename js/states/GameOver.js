//GameOver State
var GameOver = function(game){};
GameOver.prototype = {
  create:function(){
    var overText = game.add.text(game.width/5*2.05,game.height/3,'Game Over',{font:'Helvetica',fontSize:'48px',fill:'#fff'});
    var restartText = game.add.text(game.width/2,game.height/2+256,'Press F to Restart',{font:'Helvetica',fontSize:'48px',fill:'#fff'});
    var scoreText = game.add.text(game.width/2,game.height/2,'Your Score: '+ score,{font:'Helvetica',fontSize:'48px',fill:'#fff'});

    restartText.anchor.set(0.5);
    scoreText.anchor.set(0.5);
  },
  update:function(){
    if(game.input.keyboard.isDown(Phaser.Keyboard.F)){
      game.state.start('Play');
      count = 5;
      score = 0;
      ifSpeed = 0;
      numberOfCollisionsWithSkiers = 0;
    }
  }
};
