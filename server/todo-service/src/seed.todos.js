const Todo = require("./models/todo");

const dummyTodos = [
  {
    title: "Learn React",
    description: "Go through React docs and tutorials",
    dueDate: new Date(Date.now() + 86400000),
    completed: false,
  },
  {
    title: "Buy groceries",
    description: "Milk, Bread, Eggs, Chicken",
    dueDate: new Date(Date.now() + 2 * 86400000),
    completed: false,
  },
  {
    title: "Workout",
    description: "30 minutes cardio",
    dueDate: new Date(Date.now() + 3 * 86400000),
    completed: false,
  },
];

async function seedTodos() {
  try {
    const count = await Todo.countDocuments();
    if (count === 0) {
      await Todo.insertMany(dummyTodos);
      console.log("Dummy todos inserted");
    } else {
      console.log("Todos already exist, skipping seeding");
    }
  } catch (err) {
    console.error("Error seeding todos:", err);
  }
}

module.exports = seedTodos;
