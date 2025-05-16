/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the todo
 *         title:
 *           type: string
 *           description: Title of the todo
 *         description:
 *           type: string
 *           description: Description about the todo
 *         dueDate:
 *           type: string
 *           format: date
 *           description: Due dateand time of the todo
 *       example:
 *         _id: 66461603c129baef00a3c123
 *         title: Buy groceries
 *         description: Get milk, bread, and eggs
 *         dueDate: "2025-05-15T18:00:00.000Z"
 *
 *     TodoInput:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         dueDate:
 *           type: string
 *           format: date
 *       example:
 *         title: Walk the dog
 *         description: Evening walk in the park
 *         dueDate: 2025-05-15T18:00:00.000Z
 *
 */

const express = require("express");
const router = express.Router();
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controller");

/**
 * @swagger
 * /api/todo:
 *   get:
 *     summary: Get a paginated list of todos with optional filtering and sorting
 *     description: This API gets a list of todos from the database. You can search todos by matching words in the title and description, without worrying about uppercase or lowercase letters. You can sort the list by "dueDate", and choose if the list is shown in ascending or descending order. The results are split into pages, so you can ask for a specific page and how many todos to show per page.
 *     tags: [Todos]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: dueDate
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of todos with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 *                 total:
 *                   type: integer
 *                   description: Total number of todos matching the filters
 */

router.route("/").get(getTodos);

/**
 * @swagger
 * /api/todo:
 *   post:
 *     summary: Create a new todo
 *     description: Create a new todo item by providing the title, description, and due date. The request body must include these details in JSON format. Returns the created todo object.
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */

router.route("/").post(createTodo);

/**
 * @swagger
 * /api/todo/{id}:
 *   get:
 *     summary: Retrieve a todo by its ID
 *     description: Fetch a single todo item from the database using its unique ID. Returns the todo details if found.
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the todo
 *     responses:
 *       200:
 *         description: Todo retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found with the given ID
 *       500:
 *         description: Internal server error
 */
router.route("/:id").get(getTodo);

/**
 * @swagger
 * /api/todo/{id}:
 *   put:
 *     summary: Update an existing todo by ID
 *     description: Update the details of a todo item identified by its unique ID. Requires the updated todo data in the request body.
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the todo to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found with the given ID
 *       500:
 *         description: Internal server error
 */
router.route("/:id").put(updateTodo);
/**
 * @swagger
 * /api/todo/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     description: Removes the todo item identified by the given ID from the database.
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the todo to delete
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Deleted
 *       404:
 *         description: Todo not found with the given ID
 *       500:
 *         description: Internal server error
 */
router.route("/:id").delete(deleteTodo);
module.exports = router;
