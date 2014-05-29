(function () {
	var socket = io();

	var $x = $('#x');
	var $y = $('#y');

	var $window = $(window);

	$window.on('mousemove', _.throttle(function (e) {

		var winHeight = $window.height();
		var winWidth = $window.width();

		socket.emit('controls-update', {
			x: ((e.pageX / winWidth) - 0.5) * 2,
			y: ((e.pageY / winHeight) - 0.5) * 2
		});

		$x.text(e.pageX);
		$y.text(e.pageY);
	}, 100));
})();