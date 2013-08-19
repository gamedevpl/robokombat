// test_client.js

require(['World:lib/world.js', 'Player:lib/player.js', 'Viewport:lib/gamedev-lib/lib/gfx/viewport.js',
	'Assets:lib/gamedev-lib/lib/gfx/assets.js', 'Sprite:lib/gamedev-lib/lib/gfx/sprite.js', 
	'Keycodes:lib/gamedev-lib/lib/io/keycodes.js', 'Control:lib/gamedev-lib/lib/io/control.js'], //
	function(World, Player, Viewport, Assets, Sprite, Keycodes, Control) {
		var assets = new Assets('../assets/');

		var world = new World();

		var player = new Player(0, 0);

		var view = new Viewport(document.querySelector("#viewport"));
		view.init();
		
		var control = new Control();

		assets.loadImages(['sprites/liukang/idle_77_133.png', 
						   'sprites/liukang/walk_74_133.png',
						   'sprites/liukang/middle_punch_120_140.png']).then(function(sprites) {
							   
			var idle = new Sprite(sprites[0], { spriteWidth: 77, spriteHeight: 133 });
			var walk = new Sprite(sprites[1], { spriteWidth: 74, spriteHeight: 133 });
			var punch = new Sprite(sprites[2], { spriteWidth: 120, spriteHeight: 140});

			view.animation(function(dt) {
				view.clear('#000000');
				
				if(control.isPressed(Keycodes.RIGHT_ARROW))
					player.steerLeft();
				else if(control.isPressed(Keycodes.LEFT_ARROW))
					player.steerRight();
				else
					player.idle();
				
				player.update(dt);

				var position = player.getPosition();
				var state = player.getStateName();
				var stateProgress = player.getStateProgress();
				
				view.transform().translate(position[0], position[1]).scale(player.getOrientation(), 1).
					translate(-77/2, -133/2 + position[1]).then(function() {
					var sprite;
					if(state == 'idle')
						sprite = idle;
					else if(state == 'walk')
						sprite = walk;
					sprite.index = ((stateProgress*10) >> 0) % idle.frameCount;
					sprite.render(view.getContext());					
				});
//				view.transform().translate(77/2, -133/2).then(function() {
//					sprite2.index = ((t) >> 0) % sprite2.frameCount;
//					sprite2.render(view.getContext());
//				});
//				view.transform().translate(-77/2, 133/2).then(function() {
//					sprite3.index = ((t) >> 0) % sprite3.frameCount;
//					sprite3.render(view.getContext());
//				});
			});
		});
	});
