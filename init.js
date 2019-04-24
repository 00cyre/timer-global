var
  ssl = true,
  express = require('express'),
  app = express()

  var http = require('http').createServer(app)
  var io = require('socket.io')(http);
  var fs = require('fs');
  http.listen(process.env.PORT || 3000);  

  app.use(express.urlencoded());

  // Parse JSON bodies (as sent by API clients)
  app.use(express.json());
  
  // Used to initialize the timer with some pre defined values
  // Access the parse results as request.body
  app.post('/start', function(request, response){
    //get all the elements
    io.emit("Start",{obj : request.body});

    return response.send('Requested POST to Start!');
  });
  //expected an array with the structure defined with Giulio
  app.post("/fill",function(req,res){
    
    io.emit("fill",{obj : req.body});
    console.log(req.body);
    return res.send("Requested POST to fill!");
  });
  //used for sending all the informaiton in ordem de entrada
  app.post('/init', function(request, response){
    //get all the elements
    io.emit("Start",{obj : request.body});

    return response.send('Requested POST to Init with the parameters: ' + request.body[0].categoria);
  });
  io.on("connection",function(socket){
      console.log("Successfully syncronized.");
      socket.on("Pong",function(){
        console.log("Ping");
      });
      socket.on('disconnect', function(){
        console.log('Disconnected');
      });
  })
  app.get("/stop", function(req,res){
    io.emit("Stop",{ dupla: req.query.dupla});
    return res.send('Requested to stop ' + req.query.dupla);
  });
  
  app.post("/stop", function(req,res){
    io.emit("Stop",{ dupla: req.query.dupla});
    return res.send('Requested to stop ' + req.query.dupla);
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

  /*app.listen(process.env.PORT, function () {
    console.log('Example app listening on port 3000!');
  });*/