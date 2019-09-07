requirejs.config({
  baseUrl: 'src',
  paths: {
    Phaser: '../lib/phaser'
  }
});

require(["Phaser"],
  function(Phaser)
  {
    window.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    function preload()
    {
    }

    function create()
    {
    }

    function update()
    {
    }
  });
