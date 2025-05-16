const todoController = require("../controllers/todo.controller");
const Todo = require("../models/todo");

// Mock the Todo model
jest.mock("../models/todo");

describe("todoController", () => {
  let req, res;
  // New fake request and response objects before each test
  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  //Test for getting Todos
  describe("getTodos", () => {
    it("should fetch todos with default params", async () => {
      req.query = {}; // no filters

      const todos = [{ title: "Test Todo", description: "desc" }];

      // Mock chained query builder methods
      Todo.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(todos),
      });

      Todo.countDocuments.mockResolvedValue(1);

      await todoController.getTodos(req, res);

      expect(Todo.find).toHaveBeenCalledWith({
        title: { $regex: "", $options: "i" },
        description: { $regex: "", $options: "i" },
      });

      expect(res.json).toHaveBeenCalledWith({ data: todos, total: 1 });
    });

    it("should apply title and description search query and sorting", async () => {
      req.query = {
        title: "task",
        description: "work",
        sort: "title",
        order: "desc",
        page: "2",
        limit: "5",
      };

      const todos = [{ title: "Task Todo", description: "work desc" }];

      Todo.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(todos),
      });

      Todo.countDocuments.mockResolvedValue(1);

      await todoController.getTodos(req, res);

      expect(Todo.find).toHaveBeenCalledWith({
        title: { $regex: "task", $options: "i" },
        description: { $regex: "work", $options: "i" },
      });

      expect(res.json).toHaveBeenCalledWith({ data: todos, total: 1 });
    });

    it("should handle errors", async () => {
      req.query = {};

      Todo.find.mockImplementation(() => {
        throw new Error("fail");
      });

      await todoController.getTodos(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Something went wrong!",
      });
    });
  });

  //test for getting single Todo
  describe("getTodo", () => {
    it("should return a todo by id", async () => {
      req.params = { id: "123" };
      const todo = { title: "My Todo" };
      Todo.findById.mockResolvedValue(todo);

      await todoController.getTodo(req, res);

      expect(Todo.findById).toHaveBeenCalledWith("123");
      expect(res.json).toHaveBeenCalledWith(todo);
    });

    it("should return 404 if todo not found", async () => {
      req.params = { id: "123" };
      Todo.findById.mockResolvedValue(null);

      await todoController.getTodo(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Todo item with this ID was not found",
      });
    });

    it("should handle errors", async () => {
      req.params = { id: "123" };
      Todo.findById.mockImplementation(() => {
        throw new Error("fail");
      });

      await todoController.getTodo(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Something went wrong!",
      });
    });
  });

  //test to create a Todo
  describe("createTodo", () => {
    it("should create and return new todo", async () => {
      req.body = {
        title: "New Todo",
        description: "desc",
        dueDate: "2025-05-15",
      };

      // Mock the constructor to return an object with a save method
      const saveMock = jest.fn().mockResolvedValue();
      Todo.mockImplementation(() => ({
        ...req.body,
        save: saveMock,
      }));

      await todoController.createTodo(req, res);

      expect(saveMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining(req.body));
    });

    it("should handle validation errors", async () => {
      req.body = {};
      const error = new Error("Validation failed");
      error.message = "Validation failed";
      // Save rejects with error
      Todo.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(error),
      }));

      await todoController.createTodo(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Validation failed" });
    });
  });

  //test to update the Todo
  describe("updateTodo", () => {
    it("should update and return updated todo", async () => {
      req.params = { id: "123" };
      req.body = { title: "Updated" };
      const updatedTodo = { _id: "123", title: "Updated" };
      Todo.findByIdAndUpdate.mockResolvedValue(updatedTodo);

      await todoController.updateTodo(req, res);

      expect(Todo.findByIdAndUpdate).toHaveBeenCalledWith("123", req.body, {
        new: true,
      });
      expect(res.json).toHaveBeenCalledWith(updatedTodo);
    });

    it("should return 404 if todo not found", async () => {
      req.params = { id: "123" };
      req.body = { title: "Updated" };
      Todo.findByIdAndUpdate.mockResolvedValue(null);

      await todoController.updateTodo(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Todo item with this ID was not found",
      });
    });

    it("should handle errors", async () => {
      req.params = { id: "123" };
      req.body = { title: "Updated" };
      Todo.findByIdAndUpdate.mockImplementation(() => {
        throw new Error("fail");
      });

      await todoController.updateTodo(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Something went wrong!",
      });
    });
  });

  //test to delete the Todo
  describe("deleteTodo", () => {
    it("should delete a todo", async () => {
      req.params = { id: "123" };
      Todo.findByIdAndDelete.mockResolvedValue({ _id: "123" });

      await todoController.deleteTodo(req, res);

      expect(Todo.findByIdAndDelete).toHaveBeenCalledWith("123");
      expect(res.json).toHaveBeenCalledWith({ message: "Deleted" });
    });

    it("should return 404 if todo not found", async () => {
      req.params = { id: "123" };
      Todo.findByIdAndDelete.mockResolvedValue(null);

      await todoController.deleteTodo(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Todo item with this ID was not found",
      });
    });

    it("should handle errors", async () => {
      req.params = { id: "123" };
      Todo.findByIdAndDelete.mockImplementation(() => {
        throw new Error("fail");
      });

      await todoController.deleteTodo(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Something went wrong!",
      });
    });
  });
});
