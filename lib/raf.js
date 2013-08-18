define("RAF", function() {
	var requestAnimationFrame = window.requestAnimationFrame
			|| window.mozRequestAnimationFrame
			|| window.webkitRequestAnimationFrame
			|| window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame
	return function(callback) {
		return window.requestAnimationFrame(callback);
	};
});