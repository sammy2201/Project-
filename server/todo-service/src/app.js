const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo.routes");
const connectDB = require("./models/index");
const { swaggerUi, specs } = require("./docs/swagger"); //
const seedTodos = require("./seed.todos");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger API Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)); //

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

async function startServer() {
  try {
    await connectDB();
    await seedTodos();
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

startServer();

module.exports = app;
