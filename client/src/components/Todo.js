import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className="Todo">
      <div onClick={toggleComplete} className="todo-text">
        <p className={task.completed ? "completed" : "incompleted"}>
          <strong>{task.title}</strong>
        </p>
        {task.description && <p className="description">{task.description}</p>}
      </div>

      <div className="todo-actions">
        <FontAwesomeIcon
          className="edit-icon"
          icon={faPenToSquare}
          onClick={editTodo}
        />
        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          onClick={deleteTodo}
        />
      </div>
    </div>
  );
};
