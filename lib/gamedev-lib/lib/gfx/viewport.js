require([ "RAF:lib/gamedev-lib/lib/gfx/raf.js" ], function(requestAnimationFrame) {
	define('Viewport', function() {
		return function Viewport(canvas) {
			// context
			var context = canvas.getContext('2d');
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;

			var centerX = canvas.offsetWidth / 2;
			var centerY = canvas.offsetHeight / 2;
			
			this.getContext = function() {
				return context;
			}

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

			this["circle"] = function(x, y, radius, sprite) {
				context.drawImage(sprite, x + centerX, y + centerY,
						sprite.width * radius, sprite.height* radius);
			}
			
			// clear

			this["clear"] = function(color) {
				context.fillStyle = color;
				context.fillRect(0, 0, canvas.width, canvas.height);
			}
			
			
			// transforms

			/** @TODO fix frequent memory allocation problems */
			this["transform"] = function() {
				context.save();
				context.translate(centerX, centerY);
				var transform = {
					translate: function(x, y) {
						context.translate(x, y);
						return transform;
					},
					scale: function(sx, sy) {
						context.scale(sx, sy);
						return transform;
					},					
					then: function(fn) {
						fn();
						context.restore();
						return transform;
					}					
				}				
				return transform;
			};

			// init

			this["init"] = function() {
				animate();
			}
		}
	});
});
