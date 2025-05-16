const Todo = require("../models/todo");

const handleServerError = (res, err, action = "processing your request") => {
  console.error(`Error ${action}:`, err.message);
  res.status(500).json({ message: "Something went wrong!" });
};

const handleNotFound = (res, resource = "Todo item") =>
  res.status(404).json({ message: `${resource} with this ID was not found` });

exports.getTodos = async (req, res) => {
  try {
    const {
      title = "",
      description = "",
      sort = "dueDate",
      order = "asc",
      page = 1,
      limit = 10,
    } = req.query;

    const query = {
      title: { $regex: title, $options: "i" },
      description: { $regex: description, $options: "i" },
    };

    const skip = (page - 1) * limit;

    const todos = await Todo.find(query)
      .sort({ [sort]: order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Todo.countDocuments(query);

    res.json({ data: todos, total });
  } catch (err) {
    handleServerError(res, err, "fetching todos");
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return handleNotFound(res);
    res.json(todo);
  } catch (err) {
    handleServerError(res, err, "fetching todo");
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
    if (!todo) return handleNotFound(res);
    res.json(todo);
  } catch (err) {
    handleServerError(res, err, "updating todo");
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return handleNotFound(res);
    res.json({ message: "Deleted" });
  } catch (err) {
    handleServerError(res, err, "deleting todo");
  }
};
