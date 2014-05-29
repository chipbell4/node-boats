var boat = require('./initboat')
setTimeout(function() {
	console.log('Throwing the kill switch!');
	boat.forward(0, 0);
}, 2000);
