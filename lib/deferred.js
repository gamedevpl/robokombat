/**
 * Normalized Deferred object
 * @author Grzegorz Tañczyk
 */

class Deferred extends Deferred {
	resolve(...args) {
		this.callback(args);
		return this;
	}
	
	reject(...args) {
		this.errback(args);
	}	
	
	then(callback, errback) {
		if(callback)
			this.done(callback);
		if(errback)
			this.fail(errback)
		return this;
	}
	
	done(fn) {
		super.then((args) => fn.apply(null, args)); 
		return this;
	}	
	
	fail(fn) {
		super.then(null, (args) => fn.apply(null, args));		
		return this
	}	
}