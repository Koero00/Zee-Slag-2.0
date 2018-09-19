var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
	var lastPosition = { x: 0, y: 0 };

	socket.emit('update_position', lastPosition);

	socket.on('receive_position', function (data) {
		lastPosition = data;
		socket.broadcast.emit('update_position', data);
		console.log(data);
	});
});

http.listen(port, function(){
	console.log('listening on [ip]:' + port);
});

//app.get('/', function(req, res){
//	res.sendFile(__dirname + '/public/index.html');       //not needed since document is called index
//});