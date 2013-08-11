define("RAF", function() {
	var requestAnimationFrame = window.requestAnimationFrame
			|| window.mozRequestAnimationFrame
			|| window.webkitRequestAnimationFrame
			|| window.msRequestAnimationFrame;
	return window.requestAnimationFrame = requestAnimationFrame;
});