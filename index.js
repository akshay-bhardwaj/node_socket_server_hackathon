var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on("data", function(msg){
  	console.log("msg is " + msg);
  	try{
  		console.log("msg recieved with length" + JSON.parse(msg).length);	
  	}catch(e){
  		console.log("error is " + e.toString());
  	}
  	
		io.emit("data", {message: msg, epoch: ((new Date).getTime() + 5000)});
		console.log("msg sent");
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
