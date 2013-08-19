require([ 'Entity:lib/gamedev-lib/lib/game/entity.js',
		'State:lib/gamedev-lib/lib/game/state.js' ], function(Entity, State) {
	define('Player', function() {
		var PlayerState = State.extend(function PlayerState(player) {
			this.player = player;
			this.t = 0;
		}, {
			update : function(dt) {
				this.t += dt;
			}
		});

		var IdleState = PlayerState.extend(function IdleState(player) {
			this.superclass.PlayerState.apply(this, arguments);
		}, {
			getNextState : function() {
				if (this.player.move)
					return new WalkState(this.player);
				else
					return this;
			}
		});

		var WalkState = PlayerState.extend(function WalkState(player) {
			this.superclass.PlayerState.apply(this, arguments);
		}, {
			update : function(dt) {
				this.player.position[0] += this.player.orientation * dt * 100;
				this.t += dt;
			},
			getNextState : function() {
				if (!this.player.move)
					return new IdleState(this.player);
				else
					return this;
			}
		});

		var Player = Entity.extend(function Player(x, y) {
			this.superclass.Entity.call(this, new IdleState(this));
			this.position = [ x, y ];
			this.orientation = 1;
		}, {

			getPosition : function() {
				return this.position;
			},

			getOrientation : function() {
				return this.orientation;
			},

			idle : function() {
				this.move = false;
			},

			steerLeft : function() {
				this.orientation = 1;
				this.move = true;
			},

			steerRight : function() {
				this.orientation = -1;
				this.move = true;
			},

			getStateName : function() {
				if (this.currentState instanceof IdleState)
					return 'idle'
				else if (this.currentState instanceof WalkState)
					return 'walk'
			},

			getStateProgress : function() {
				return this.currentState.t;
			}

		});

		return Player;
	});
});
