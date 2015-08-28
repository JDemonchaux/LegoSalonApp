var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var visite = require('./visite');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use('/public', express.static(__dirname + '/public'));
app.use('/app', express.static(__dirname + '/www'));

app.get('/jquery', function(req, res){
  res.sendFile(__dirname + '/jquery-1.11.3.min.js');
});

io.on('connection', function(socket){
  console.log('a user connected');

  visite.countVisiteur(function(callback) {
    console.log("send " + callback)
    socket.broadcast.emit("countVisiteur", callback);
    socket.emit("countVisiteur", callback);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('addVisiteur', function(msg){
    console.log('IN: ' + msg);
    visite.addVisiteur(msg);

    visite.countVisiteur(function(callback) {
      console.log("send " + callback)
      socket.broadcast.emit("countVisiteur", callback);
      socket.emit("countVisiteur", callback);
    });

  });

  socket.on('removeVisiteur', function(msg){
    console.log('OUT: ' + msg);
    visite.removeVisiteur(msg);

    visite.countVisiteur(function(callback) {
      console.log("send " + callback)
      socket.broadcast.emit("countVisiteur", callback);
      socket.emit("countVisiteur", callback);
    });
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
