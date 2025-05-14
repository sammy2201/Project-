import React, { useState } from "react";

export const EditTodo = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.title); // FIX: use task.title

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(value, task._id); // FIX: use task._id instead of task.id
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Update task"
      />
      <button type="submit" className="todo-btn">
        Update Task
      </button>
    </form>
  );
};
