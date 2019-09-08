//Load state

var Load = function(game){};
Load.prototype ={
	preload:function(){

		//load assets
		game.load.path = 'assets/';
		//game.load.atlas('atlas','img/cloneSheet.png','img/cloneSheet.json');
		//load tilemap
		game.load.tilemap('mapSheet','img/map.json',null,Phaser.Tilemap.TILED_JSON);//little trees with rocks - all obsticles
		game.load.image('mapSprite','img/mapsheet.png',64,64);
		//load player, fish, diamond, bullet assets
		game.load.image('snowball','img/Snow_ball.png');
		game.load.image('skier1','img/Skier_01.png');
		//game.load.atlas('boysheet','img/boy.png','img/boy.json');
		game.load.image('skierLeft','img/Skier_Left.png');
		game.load.image('skierRight','img/Skier_Right.png');
		game.load.image('finishLine','img/Finish_Line.png');
		game.load.image('lake','img/Lake.png');
		//game.load.image('rectangle','img/rectangle.png');
		//load music
		/*game.load.audio('mainMusic','sound/mainMusic.mp3');
		game.load.audio('beaten','sound/beat.mp3');
		game.load.audio('attack','sound/attack.mp3');
		game.load.audio('win','sound/win.mp3');
		game.load.audio('getDiamond','sound/getDiamond.mp3');*/



	},
	create:function(){
		//create a text which renders that the game is loading
		var loadText = game.add.text(600,100,'Loading...',{font:'Helvetica',fontSize:'24px',fill:'#fff'});
		loadText.anchor.set(0.5);
		game.state.start('Menu');
	}
};
