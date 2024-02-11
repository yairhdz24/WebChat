var socket = io.connect("http://localhost:4000");
var socket = socket.connect();

// Query DOM
var message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");

message.addEventListener("keypress", function (event) {
  if (event.key === 'Enter') {
    event.preventDefault(); 
    document.getElementById("send").click(); // Trigger para que le de click al enviar
  } else {
    socket.emit("typing", handle.value);
  }
});

// Emit events
btn.addEventListener("click", function () {
  socket.emit("chat message", {
    message: message.value,
    handle: handle.value,
  });
  message.value = "";
});

// Listen for events
socket.on("chat message", function (data) {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on("typing", function (data) {
  feedback.innerHTML = "<p><em>" + data + " Escribiendo...</em></p>";
  clearTimeout(typingTimeout);
  var typingTimeout = setTimeout(function () {
    feedback.innerHTML = "";
  }, 4000); // Elimina el mensaje de "Escribiendo..." despues de 4 segundos
});

socket.on("disconnect", function () {
  feedback.innerHTML = "<p><em>" + handle.value + " se desconecto</em></p>";
});
