const Todo = require("../models/todo");

exports.getTodos = async (req, res) => {
  try {
    const { q, sort = "dueDate", page = 1, limit = 10 } = req.query;
    const query = q ? { title: { $regex: q, $options: "i" } } : {};
    const todos = await Todo.find(query)
      .sort({ [sort]: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Todo.countDocuments(query);
    res.json({ data: todos, total });
  } catch (err) {
    console.error("Error fetching todos:", err.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Not found" });
    res.json(todo);
  } catch (err) {
    console.error("Error fetching todo:", err.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    console.error("Error creating todo:", err.message);
    res.status(400).json({ message: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!todo) return res.status(404).json({ message: "Not found" });
    res.json(todo);
  } catch (err) {
    console.error("Error updating todo:", err.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Error deleting todo:", err.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
