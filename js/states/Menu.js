//Menu State

var Menu = function(game){};
Menu.prototype = {
  create:function(){
    //add menu screen text
    //Title of the game
    var titleText = game.add.text(game.width/2,game.height/3,'SnowBall',{font:'Tahoma',fontSize:'48px',fill:'#3352CC'});
    titleText.anchor.set(0.5);
    //instructions of the game
    var instructText1 = game.add.text(game.width/2,game.height/2,'Use  LEFT + RIGHT',{font:'Helvetica',fontSize:'24px',fill:'#fff'});
    instructText1.anchor.set(0.5);
    var instructText2 = game.add.text(game.width/2,game.height/2+56,'to control the SnowBall and roll up skiers',{font:'Helvetica',fontSize:'24px',fill:'#fff'});
    instructText2.anchor.set(0.5);
    var instructText3 = game.add.text(game.width/2,game.height/2+112,'Use SPACEBAR to speed up',{font:'Helvetica',fontSize:'24px',fill:'#fff'});
    instructText3.anchor.set(0.5);
    //how to switch the state
    var PlayText = game.add.text(game.width/2,game.height*0.9,'Press F to start',{font:'Helvetica',fontSize:'42px',fill:'#fff'});
    PlayText.anchor.set(0.5);
    //add music
    //bgmusic = game.sound.add('mainMusic');
    //bgmusic.loop = true;
    //bgmusic.play();




  },
  update:function(){
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();

    //check for SPACEBAR input
    if(game.input.keyboard.justPressed(Phaser.Keyboard.F)){
      game.state.start('Ready');
    }


  }
};
