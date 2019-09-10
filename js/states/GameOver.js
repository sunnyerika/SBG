//GameOver State
var GameOver = function(game){};
GameOver.prototype = {
	create:function(){
		var overText = game.add.text(game.width/3,game.height/3,'Game Over',{font:'Helvetica',fontSize:'48px',fill:'#fff'});
		var restartText = game.add.text(game.width/2,game.height/2+256,'Press SPACEBAR to Restart',{font:'Helvetica',fontSize:'48px',fill:'#fff'});
		var scoreText = game.add.text(game.width/2,game.height/2,'Your Score: '+score,{font:'Helvetica',fontSize:'48px',fill:'#fff'});	
		restartText.anchor.set(0.5);
		scoreText.anchor.set(0.5);
	},
	update:function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start('Play');
			count = 5;
			score = 0;
		}
	}
};