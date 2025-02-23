import { Server } from "socket.io";
import User from "./models/user.model.js";
import Captain from "./models/captain.model.js";

let io;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "https://uber-git-main-rupamjit-ghoshs-projects.vercel.app",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      try {
        if (!data || !data.userId || !data.userType) {
          return socket.emit("error", { message: "Invalid data received" });
        }

        const { userId, userType } = data;

        console.log(`User ${userId} joined: ${userType}`);

        if (userType === "user") {
          await User.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === "captain") {
          await Captain.findByIdAndUpdate(userId, { socketId: socket.id });
        }

        console.log(`User ${userId} joined as ${userType}`);
      } catch (error) {
        console.error("Error handling join event:", error);
        socket.emit("error", { message: "Internal server error" });
      }
    });

    socket.on("update-location-captain", async (data) => {
      try {
        const { userId, lat, lng } = data;

        console.log("Received update for:", userId, lat, lng);

        if (!lat || !lng) {
          return socket.emit("error", { message: "Invalid location data" });
        }

        await Captain.findByIdAndUpdate(userId, {
          location: { lat, lng },
        });

        console.log(`Captain ${userId} location updated successfully`);
      } catch (error) {
        console.error("Error updating captain location:", error);
        socket.emit("error", { message: "Internal server error" });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

const sendMessageToSocketId = (socketId, messageObject) => {
  console.log(messageObject);

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
};

export { initializeSocket, sendMessageToSocketId };
