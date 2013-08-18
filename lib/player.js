require([ 'BaseClass:lib/gamedev-lib/lib/baseclass.js' ], function(BaseClass) {
	define('Player', function() {
		var Player = BaseClass.extend(function Player(name) {
			this.superclass.BaseClass.call(this);
			this.name = name
		});

		return Player;
	});
});
