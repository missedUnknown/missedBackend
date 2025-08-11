// be_unknown/server.js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);

app.use(cors({ origin: "http://localhost:5173" })); // Vite's default port

const io = new Server(server, {
  cors: { origin: "http://localhost:5173" }
});

io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);

  socket.emit("statusUpdate", {
    status: "Online",
    version: "1.0.0",
    uptime: process.uptime(),
    serverTime: new Date().toLocaleString(),
  });

  setInterval(() => {
    socket.emit("statusUpdate", {
      status: "Online",
      version: "1.0.0",
      uptime: process.uptime(),
      serverTime: new Date().toLocaleString(),
    });
  }, 1000);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("🚀 Backend running at http://localhost:5000");
});
