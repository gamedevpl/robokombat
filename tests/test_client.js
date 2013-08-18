// test_client.js

require(['World:lib/world.js', 'Player:lib/player.js', 'Viewport:lib/viewport.js',
	'Assets:lib/gamedev-lib/lib/gfx/assets.js', 'Sprite:lib/gamedev-lib/lib/gfx/sprite.js'], //
	function(World, Player, Viewport, Assets, Sprite) {
		var assets = new Assets('../assets/');

		var world = new World();

		var playerOne = new Player('player 1');

		var PlayerTwo = Player.extend(function PlayerTwo(name) {
			this.superclass.Player.call(this, name);
		});

		var playerTwo = new PlayerTwo('player 2');

		world.addPlayer(playerOne);
		world.addPlayer(playerTwo);

		var view = new Viewport(document.querySelector("#viewport"));
		view.init();

		assets.loadImages(['sprites/liukang/idle.png']).then(function(sprites) {
			var sprite = new Sprite(sprites[0], { spriteWidth: 77, spriteHeight: 133 });

			var t = 0;
			view.animation(function(dt) {
				view.clear('#000000');
				view.transform().translate(-77/2, -133/2).then(function() {
					sprite.index = ((t += dt*10) >> 0) % sprite.frameCount;
					sprite.render(view.getContext());
				});
			});
		});
	});
