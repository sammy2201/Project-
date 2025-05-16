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
 *         dueDate: 2025-05-21
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
 *     summary: This API endpoint is responsible for retrieving a list of todos from the database with support for search, sorting, and pagination. It accepts query parameters such as `q` for a keyword search on the title, `sort` to determine the field by which the results should be ordered (defaulting to `"dueDate"`), and `page` and `limit` to control pagination. If a search query `q` is provided, it performs a case-insensitive regex match on the `title` field. It then sorts the results based on the specified field, skips the appropriate number of documents based on the current page, and limits the number of returned results according to the specified limit. In addition to fetching the current page of todos, it also calculates the total number of documents matching the search criteria to help the client manage pagination on the frontend. Finally, it sends a response containing the paginated todos and the total count. If any error occurs during this process, it logs the error and responds with a 500 status code along with a generic error message.
 *     tags: [Todos]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Filter by title (optional)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort by a field (e.g., "dueDate")
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page (default 10)
 *     responses:
 *       200:
 *         description: List of todos
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
 */
router.route("/").get(getTodos);

/**
 * @swagger
 * /api/todo:
 *   post:
 *     summary: Create a new todo
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
 */
router.route("/").post(createTodo);

/**
 * @swagger
 * /api/todo/{id}:
 *   get:
 *     summary: Get a todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo
 *     responses:
 *       200:
 *         description: A single todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
router.route("/:id").get(getTodo);

/**
 * @swagger
 * /api/todo/{id}:
 *   put:
 *     summary: Update a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the todo to update
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
 *         description: Todo not found
 */
router.route("/:id").put(updateTodo);

/**
 * @swagger
 * /api/todo/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the todo to delete
 *     responses:
 *       200:
 *         description: Todo deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Deleted
 *       404:
 *         description: Todo not found
 */
router.route("/:id").delete(deleteTodo);

module.exports = router;
