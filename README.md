# Fullstack Todo App (Monorepo)

A full-featured Todo List application built with the MERN stack. The app supports CRUD operations, pagination, sorting, and frontend-based search. The project is organized in a monorepo with separate folders for the client and server.

## Features

Below features have been implemented in this project.

1. Add / Edit / Delete todo items
2. Search by title & description
3. Sort by due date (asc/desc)
4. Paginated
5. Prevent adding past-due dates
6. API documentation via Swagger
7. Prepopulated data

## Prerequisites:

Ensure you have the following installed on your system:

1. Node.js
2. npm
3. Git
4. React.js
5. MongoDB

## Installation:

1. First Clone the repository
2. Install dependencies using npm or another package manager
3. Go to client folder
   ```bash
   cd client
   npm init
   npm install
   ```
4. Go to todo-service in server folder in new terminal
   ```bash
   cd server/todo-service
   npm init
   npm install
   ```

## Run:

1. To run the client use below comand by staying in client folder:
   `npm start`
2. To run the server use below comand by staying in src folder:
   `cd server/todo-service/src`
   and then run
   `node server.js`

## API Docs (Swagger)

Once the server is running, access interactive API documentation at:
`http://localhost:3000/api-docs`

## Environment Variables

In server/todo-service/, create a .env file:

`PORT=3000`

`MONGO_URI=provide your connection URL`

## Tests

1. To run backend tests with Jest, navigate to the server directory:

   ```bash
   cd server/todo-service
   ```

2. Now run the following command
   ```bash
   npm test
   ```

## Implementation Architecture

Our Todo Service follows a clean and modular architecture based on MVC principle (Model-View-Controller), making the codebase organized, testable, and scalable.

### Architecture Layers

1. Model Layer (Mongoose)

   Defines the data schema for Todo items (title, description, due date, etc.)

   Used to interact with MongoDB

2. Controller Layer

   Contains logic for handling requests and forming responses

   Example: getTodos, createTodo, updateTodo, deleteTodo, etc.

   Handles pagination, filtering, sorting, and error handling

3. Routing Layer

   Maps HTTP routes to controller methods

   Keeps the app modular and separates logic from endpoint definitions

4. Testing

   Unit tests written using Jest
