const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo.routes");
const connectDB = require("./models/index");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/todo", todoRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

connectDB();

module.exports = app;
