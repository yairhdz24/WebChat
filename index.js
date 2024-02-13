var express = require("express");
var http = require("http");
var socketIo = require("socket.io");

// Crear una nueva aplicación express
var app = express();
var server = http.createServer(app);

var port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log("Servidor escuchando en el puerto " + port);
});

// Configurar el servidor de sockets
var io = socketIo(server);

//static files
app.use(express.static("public"));

// Socket settings
io.on("connection", function (socket) {
  console.log("A user connected: " + socket.id);

  socket.on("chat message", function (data) {
    io.sockets.emit("chat message", data);
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });

  socket.on("disconnect", function () {
    console.log("user disconnected: " + socket.id);
  });
});
