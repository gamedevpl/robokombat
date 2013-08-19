// test_client.js

require(['World:lib/world.js', 'Player:lib/player.js', 'Viewport:lib/gamedev-lib/lib/gfx/viewport.js',
	'Assets:lib/gamedev-lib/lib/gfx/assets.js', 'Sprite:lib/gamedev-lib/lib/gfx/sprite.js', 
	'Keycodes:lib/gamedev-lib/lib/io/keycodes.js', 'Control:lib/gamedev-lib/lib/io/control.js'], //
	function(World, Player, Viewport, Assets, Sprite, Keycodes, Control) {
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
		
		var control = new Control();

		assets.loadImages(['sprites/liukang/idle_77_133.png', 
						   'sprites/liukang/walk_74_133.png',
						   'sprites/liukang/middle_punch_120_140.png']).then(function(sprites) {
							   
			var sprite1 = new Sprite(sprites[0], { spriteWidth: 77, spriteHeight: 133 });
			var sprite2 = new Sprite(sprites[1], { spriteWidth: 74, spriteHeight: 133 });
			var sprite3 = new Sprite(sprites[2], { spriteWidth: 120, spriteHeight: 140});

			var t = 0;
			
			var x = 0;
			
			view.animation(function(dt) {
				view.clear('#000000');
				
				if(control.isPressed(Keycodes.RIGHT_ARROW))
					x += dt*100;
				
				if(control.isPressed(Keycodes.LEFT_ARROW))
					x -= dt*100;
				
				view.transform().translate(-77/2 + x, -133/2).then(function() {
					sprite1.index = ((t += dt*10) >> 0) % sprite1.frameCount;
					sprite1.render(view.getContext());
				});
				view.transform().translate(77/2, -133/2).then(function() {
					sprite2.index = ((t) >> 0) % sprite2.frameCount;
					sprite2.render(view.getContext());
				});
				view.transform().translate(-77/2, 133/2).then(function() {
					sprite3.index = ((t) >> 0) % sprite3.frameCount;
					sprite3.render(view.getContext());
				});
			});
		});
	});
