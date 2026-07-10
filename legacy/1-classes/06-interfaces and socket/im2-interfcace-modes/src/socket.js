// socket.js
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

const socket = io("ws://localhost:3000");

// send a message to the server
socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

// receive a message from the server
socket.on("hello from server", (...args) => {
  // ...
});

function setupSocket(instrument) {
  socket.on('noteOn', (data) => {
    instrument.noteOn(data.note, data.velocity);
  });

  socket.on('noteOff', (data) => {
    instrument.noteOff(data.note);
  });
}

export { socket, setupSocket };
