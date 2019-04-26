var
  ssl = true,
  express = require('express'),
  app = express()
  var key = "VtzqnvvbIxpDkyJK1GcptSmIa0IUTbUY";
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
    if (request.query.key == key)
    {
      console.log("Authenticated");
      io.emit("Start",{obj : request.body});

    return response.send('Requested POST to Start!');
    }
    else 
    {
      console.log("Incorrect Key");
      return response.status(404).send('404 Not Found');
    }
  });
  //expected an array with the structure defined with Giulio
  app.post("/fill",function(req,res){
    if (req.query.key == key)
    {
      console.log("Authenticated");
      io.emit("fill",{obj : req.body});
      console.log(req.body);
      return res.send("Requested POST to fill!");
    }
    else 
    {
      console.log("Incorrect Key");
      return res.status(404).send('404 Not Found');
    }
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

  app.post("/stop", function(req,res){
    if (req.query.key == key)
    {
      console.log("Authenticated");
      io.emit("Stop",{ obj: req.body});
    return res.send('Requested to stop ' + req.query.dupla);
    }
    else 
    {
      console.log("Incorrect Key");
      return res.status(404).send('404 Not Found');
    }
  });

  //app.get("/reset", function(req,res){
  //  io.emit("Reset");
  //  return res.send('Requested to stop');
  //});
  app.get("/cont", function(req,res){
    if (req.query.key == key)
    {
      console.log("Authenticated");
      io.emit("Cont");
      return res.send('Requested to Continue');
    }
    else 
    {
      console.log("Incorrect Key");
      return res.status(404).send('404 Not Found');
    }
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