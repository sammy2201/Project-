import React, { useState } from "react";

export const EditTodo = ({ editTodo, task }) => {
  const [title, setTitle] = useState(task.title); // Store title in state
  const [description, setDescription] = useState(task.description || ""); // Store description in state

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(title, description, task._id); // Pass both title and description
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="todo-input"
        placeholder="Update task title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="todo-input"
        placeholder="Update task description"
      />
      <button type="submit" className="todo-btn">
        Update Task
      </button>
    </form>
  );
};
