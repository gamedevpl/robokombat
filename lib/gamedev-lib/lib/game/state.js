require([ 'BaseClass:lib/gamedev-lib/lib/baseclass.js',
		'Deferred:lib/gamedev-lib/lib/deferred.js' ], function(BaseClass,
		Deferred) {
	define("State", function() {
		var State = BaseClass.extend(function State() {
		}, {
			getNextState: function() {
				return this;
			},
			
			update: function(dt) {
			}

		});

		return State;
	});
});