require(['BaseClass:lib/gamedev-lib/lib/baseclass.js'], function(BaseClass) {
	define('Sprite', function() {
		var Sprite = BaseClass.extend(function Sprite(image, config) {
			this.image = image;
			this.config = config;
			this.index = 0;
			this.frameCount = image.width / config.spriteWidth;
		}, {
			render : function(ctx) {
				ctx.drawImage(this.image, this.index * this.config.spriteWidth, 0, this.config.spriteWidth,
						this.config.spriteHeight, 0, 0, this.config.spriteWidth, this.config.spriteHeight);
			}
		});

		return Sprite;
	});
});
