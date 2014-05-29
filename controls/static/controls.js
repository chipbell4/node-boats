(function () {
	var socket = io();

	var $x = $('#x');
	var $y = $('#y');

	var $window = $(window);

	$window.on('mousemove', _.throttle(function (e) {
		move(e.pageX, e.pageY);
	}, 100));

	$window.on('touchmove', function (e) {
		e = e.originalEvent.touches[0];
		move(e.pageX, e.pageY);
	});

	function move (pageX, pageY) {
		var winHeight = $window.height();
		var winWidth = $window.width();

		var pageCenterX = $window.width() / 2;
		var pageCenterY = $window.height() / 2;

		var dx = pageCenterX - pageX;
		var dy = pageCenterY - pageY;
		var radius = Math.sqrt( dx*dx + dy*dy );
		var theta = Math.atan2(dx, dy);

		// scale radius
		radius = 2 * radius / Math.min(winHeight, winWidth);

		radius = Math.min(1, Math.max(radius, -1));

		socket.emit('controls-update', {
			r: radius,
			theta: theta,
		});

		$x.text(radius);
		$y.text(theta);
	}
})();
