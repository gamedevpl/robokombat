require([ 'BaseClass:lib/gamedev-lib/lib/baseclass.js',
		'Deferred:lib/gamedev-lib/lib/deferred.js' ], function(BaseClass,
		Deferred) {
	define("Control", function() {
		var Control = BaseClass.extend(function Control() {
			var keysPressed = this.keysPressed = {};
			
			window.addEventListener('keydown', function(event) {
				keysPressed[event.keyCode] = true;
			});
			window.addEventListener('keyup', function(event) {
				keysPressed[event.keyCode] = false;
			});
		}, {
			isPressed : function(keyCode) {
				return this.keysPressed[keyCode];
			}
		});

		return Control;
	});
});