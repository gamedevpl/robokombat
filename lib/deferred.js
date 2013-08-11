(function(global) {
	function Deferred(single) {
		this.listeners = [];
		this.single = single;
	}

	Deferred.prototype.then = function(fn, check) {
		if (typeof this.result != 'undefined' && !check)
			fn.apply(null, this.result);
		else {
			var listener = {
				fn : fn,
				check : check
			};
			this.listeners.push(listener)
			return listener;
		}
	}

	Deferred.prototype.only = function(fn, check) {
		this.listeners.length = 0;
		return this.then(fn, check);
	}

	Deferred.prototype.once = function(fn) {
		var listener;
		listener = this.then(function() {
			if (listener)
				setTimeout(function() {
					this.listeners.splice(this.listeners.indexOf(listener), 1);
				}.bind(this))
			fn.apply(null, this.result);
		}.bind(this));
	}

	Deferred.prototype.resolved = function() {
		return typeof this.result != 'undefined';
	}

	Deferred.prototype.clear = function() {
		delete this.result;
	}

	Deferred.prototype.resolve = function() {
		if (this.result && this.single)
			return;

		var result = this.result = arguments;
		this.listeners.some(function(listener) {
			(!listener.check || listener.check.resolved()) && listener.fn.apply(null, result);
		});
	}

	global["Deferred"] = Deferred;
})(this);