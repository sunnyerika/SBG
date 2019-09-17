//Ready State
var Ready = function(game){};
var timer, timeEvent, text;

Ready.prototype = {
	create:function(){
		//create a custom timer
		timer = game.time.create();

		//create a event 3s from now
		timeEvent = timer.add(Phaser.Timer.SECOND*2,this.endTimer,this);
		//start the timer
		timer.start();
		if(timer.running){
			var readyText = game.add.text(game.width/2,game.height/2,'Game is loading',{font:'Helvetica',fontSize:'48px',fill:'#fff'});
			readyText.anchor.set(0.5);
		}



	},

	endTimer:function(){
		//stop the timer
		timer.stop();
		game.state.start('Play');
	}
};
