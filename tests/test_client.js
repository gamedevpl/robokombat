// test_client.js

require(['World:../lib/world.js', 'Player:../lib/player.js', 'Viewport:../lib/viewport.js'], //
	function(World, Player, Viewport) {
		var world = new World();

		var playerOne = new Player();
		var playerTwo = new Player();

		world.addPlayer(playerOne);
		world.addPlayer(playerTwo);

		var view = new Viewport(document.querySelector("#viewport"));

		view.animation(function(dt) {
			view.circle(0, 0, 100);
		});
		
		view.init();
	});