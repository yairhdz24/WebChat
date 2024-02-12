var express = require("express");
var socket = require("socket.io");

// Create a new express application
var app = express();



var server = app.listen(4000, function () {
  console.log("Server is running on port 4000");
});

//static files
app.use(express.static("public"));
// app.use(express.static("index"));

// Socket settings
var io = socket(server);

io.on("connection", function (socket) {
  console.log("A user connected: " + socket.id);

  socket.on("chat message", function (data) {
    io.sockets.emit("chat message", data);
  
    socket.on("typing", function (data) {
      socket.broadcast.emit("typing", data);
    });

    socket.on("disconnect", function () {
      console.log("user disconnected: " + socket.id);
    });
  });
});
