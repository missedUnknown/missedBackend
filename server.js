import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import http from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

const PORT = process.env.PORT || 5000;

// Handlebars setup
app.engine("hbs", engine({ extname: ".hbs", defaultLayout: false }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Dashboard UI
app.get("/", (req, res) => {
  res.render("status", { title: "API Live Status Dashboard" });
});

// Socket connection
io.on("connection", (socket) => {
  console.log("🔌 New client connected");

  // Send initial status
  socket.emit("statusUpdate", getStatus());

  // Send updated status every 2 seconds
  const interval = setInterval(() => {
    socket.emit("statusUpdate", getStatus());
  }, 2000);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
    clearInterval(interval);
  });
});

function getStatus() {
  return {
    status: "Online",
    version: "1.0.0",
    uptime: process.uptime().toFixed(0),
    serverTime: new Date().toLocaleString(),
  };
}

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
