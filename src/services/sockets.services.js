const { Server } = require("socket.io");
const dotenv = require("dotenv");
dotenv.config();

let io = null;

function initializeSocket(server) {
  //Creating the IO server for the real-time notification.
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URI,
      methods: ["GET", "POST"],
    },
  });

  //WebSockets Connection.
  io.on("connection", (socket) => {
    console.log("Connecting with client", socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
}

function getIO() {
  if (!io) {
    throw new Error(
      "Socket.io not initialized! Call initializeSocket(server) first."
    );
  }
  return io;
}

module.exports = {
  initializeSocket,
  getIO,
};
