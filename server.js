import express from "express";
import path from "path";
import { engine } from "express-handlebars";

const app = express();
const __dirname = path.resolve();

app.engine("hbs", engine({
  extname: ".hbs", helpers: {
    json: (context) => JSON.stringify(context)
  }
}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

const apiRoutes = [
  { name: "Status", url: "https://your-backend.vercel.app/status" },
  { name: "Start", url: "https://your-backend.vercel.app/start" }
];

app.get("/", (req, res) => {
  res.render("home", {
    title: "Backend Developer Dashboard",
    message: "Monitor API routes in real time.",
    apiRoutes
  });
});

app.get("/status", (req, res) => {
  res.json({ status: "OK", uptime: process.uptime(), time: new Date() });
});

app.get("/start", (req, res) => {
  res.json({ message: "Welcome to the API!", version: "1.0.0" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
