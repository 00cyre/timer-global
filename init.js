var
  ssl = true,
  express = require('express'),
  app = express()

  var http = require('http').createServer(app)
  var io = require('socket.io')(http);
  var fs = require('fs');
  http.listen(3000);  



  io.on("connection",function(socket){
      console.log("Successfully syncronized.");
      socket.on("Pong",function(){
        console.log("Ping");
      });
      socket.on('disconnect', function(){
        console.log('Disconnected');
      });
      
      
      app.get("/start", function(req,res){
    
       
      });
  })
  app.get("/stop", function(req,res){
    io.emit("Stop");
    return res.send('Requested to stop');
  });
  
  app.get("/start", function(req,res){
    io.emit("Start");
    return res.send('Requested to Start');
  });
  app.get("/reset", function(req,res){
    io.emit("Reset");
    return res.send('Requested to stop');
  });
  app.get("/cont", function(req,res){
    io.emit("Cont");
    return res.send('Requested to stop');
  });
  
  app.get('/', function (req, res) {
    res.sendFile(__dirname+'/index.html'); 
  });
  app.get("/main.css",function(req,res){
    res.sendFile(__dirname+'/main.css');
  });
  app.get("/main.js", function(req,res){
    res.sendFile(__dirname+"/main.js");
  });

  app.listen(process.env.PORT || 3000,"0.0.0.0", function () {
    console.log('Example app listening on port 3000!');
  });