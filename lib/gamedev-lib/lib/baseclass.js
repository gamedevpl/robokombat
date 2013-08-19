define('BaseClass', function() {
	var BaseClass = function BaseClass() {
		// base class constructor
	};	
	
	BaseClass.prototype.superclass = {};
	
	var extend = function(_constructor, props) {
		var superclass = this;
		
		_constructor.extend = extend;
		
		_constructor.prototype = Object.create(superclass.prototype);				
		_constructor.prototype.superclass[superclass.name] = superclass;			
		
		for(var key in props)
			_constructor.prototype[key] = props[key];		
			
		return _constructor;		
	}	
	
	BaseClass.extend = extend;
	
	return BaseClass;
});
