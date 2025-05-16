import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export const Todo = ({ task, deleteTodo, editTodo }) => {
  return (
    <div className="TodoContainer">
      <div className="TodoDue">
        <p className="due-date">
          Due:{" "}
          {new Date(task.dueDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
        <p className="due-time">
          Time:{" "}
          {new Date(task.dueDate).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // 24-hour format
          })}
        </p>
      </div>

      <div className="Todo">
        <div className="todo-text">
          <p>
            <strong>{task.title}</strong>
          </p>
          {task.description && (
            <p className="description">{task.description}</p>
          )}
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
    </div>
  );
};
