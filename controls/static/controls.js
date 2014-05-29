(function () {
	var socket = io();

	var $x = $('#x');
	var $y = $('#y');

	var $window = $(window);

	$window.on('mousemove', _.throttle(function (e) {

		var winHeight = $window.height();
		var winWidth = $window.width();

		var pageCenterX = $window.width() / 2;
		var pageCenterY = $window.height() / 2;

		var dx = pageCenterX - e.pageX;
		var dy = pageCenterY - e.pageY;
		var radius = Math.sqrt( dx*dx + dy*dy );
		var theta = Math.atan2(dx, dy);

		socket.emit('controls-update', {
			r: radius,
			theta: theta,
		});

		$x.text(radius);
		$y.text(theta);
	}, 100));
})();
