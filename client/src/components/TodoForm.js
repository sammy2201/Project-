import React, { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // New state
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && dueDate) {
      addTodo({ title, description, dueDate });
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="todo-input"
        placeholder="What is the task today?"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="todo-input"
        placeholder="Optional description"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="todo-input"
        required
        min={new Date().toISOString().split("T")[0]}
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};
