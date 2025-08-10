// Import required modules
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Home route (API root)
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "🚀 Welcome to the API Home!",
    author: "Your Name",
    documentation: "/api-docs",
  });
});

// Example test route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, Developer! 👋" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
