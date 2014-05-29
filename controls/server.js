var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/static'));

io.on('connection', function(socket) {
  socket.on('controls-update', function (update) {
    console.log('coords: ', update.x, update.y);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
