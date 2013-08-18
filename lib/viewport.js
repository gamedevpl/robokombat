require([ "RAF:lib/raf.js" ], function(requestAnimationFrame) {
	define('Viewport', function() {
		return function Viewport(canvas) {
			// context
			var context = canvas.getContext('2d');
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;

			var centerX = canvas.offsetWidth / 2;
			var centerY = canvas.offsetHeight / 2;

			// animation
			var animTS = performance.now();
			var animationFns = [];

			function animate() {
				var animDT = -(animTS - (animTS = performance.now())) / 1000;
				requestAnimationFrame(animate);
				animationFns.some(function(fn) {
					fn(animDT);
				});
			}

			this["animation"] = function(fn) {
				animationFns.push(fn);
			}

			// canvas

			var sprite = new Image();
			sprite.src = basePath + 'assets/sprites/liukang/gdsg.png';

			this["circle"] = function(x, y, radius) {
				context.drawImage(sprite, x + centerX, y + centerY,
						sprite.width, sprite.height);
			}

			// init

			this["init"] = function() {
				animate();
			}
		}
	});
});
