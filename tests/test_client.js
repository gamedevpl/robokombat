// test_client.js

require(['World:lib/world.js', 'Player:lib/player.js', 'Viewport:lib/viewport.js', 'Assets:lib/gamedev-lib/lib/gfx/assets.js'], //
	function(World, Player, Viewport, Assets) {
		var assets = new Assets('../assets/');

		var world = new World();

		var playerOne = new Player('player 1');

		var PlayerTwo = Player.extend(function PlayerTwo(name) {
			this.superclass.Player.call(this, name);
		}
		);

		var playerTwo = new PlayerTwo('player 2');

		world.addPlayer(playerOne);
		world.addPlayer(playerTwo);

		var view = new Viewport(document.querySelector("#viewport"));
		view.init();

		assets.loadImages(['sprites/liukang/gdsg.png']).then(function(sprites) {
			view.animation(function(dt) {
				view.circle(0, 0, 100, sprites[0]);
			});
		});
	});
