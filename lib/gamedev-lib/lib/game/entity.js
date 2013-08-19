require([ 'BaseClass:lib/gamedev-lib/lib/baseclass.js',
		'Deferred:lib/gamedev-lib/lib/deferred.js' ], function(BaseClass,
		Deferred) {
	define("Entity", function() {
		var Entity = BaseClass.extend(function Entity(initialState) {
			this.currentState = initialState;
		}, {
			update: function(dt) {
				this.currentState.update(dt);
				this.currentState = this.currentState.getNextState();
			}		
		});

		return Entity;
	});
});