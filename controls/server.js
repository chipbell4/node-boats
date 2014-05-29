var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/static'));

var mah_boat = require('../initboat');

io.on('connection', function(socket) {
  socket.on('controls-update', function (update) {
    console.log('coords: ', update.r, update.theta);
	 try {
		 mah_boat.forward(update.r, update.theta);
	 }
	 catch(e) {
	 	console.log("\tCan't connect to boat...");
	 }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
