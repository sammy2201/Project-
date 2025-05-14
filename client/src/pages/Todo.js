import React, { useState, useEffect } from "react";
import { Todo } from "../components/Todo";
import { TodoForm } from "../components/TodoForm";
import { EditTodo } from "../components/EditTodo";
import axios from "axios";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [titleSearch, setTitleSearch] = useState("");
  const [descSearch, setDescSearch] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/todo");
      setTodos(res.data.data);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  const addTodo = async ({ title, dueDate, description }) => {
    const now = new Date();
    const userDate = new Date(dueDate);

    if (userDate < now) {
      alert("Due date has already passed. Please pick a future date.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/todo", {
        title,
        dueDate,
        description,
        completed: false,
      });
      setTodos((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding todo", error.response?.data || error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/todo/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error(
        "Error deleting todo",
        error.response?.data || error.message
      );
    }
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((t) => t._id === id);
    if (!todo) return;

    try {
      const updated = await axios.put(`http://localhost:3000/api/todo/${id}`, {
        completed: !todo.completed,
      });
      setTodos((prev) => prev.map((t) => (t._id === id ? updated.data : t)));
    } catch (error) {
      console.error("Error toggling complete", error);
    }
  };

  const editTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, isEditing: !t.isEditing } : t))
    );
  };

  const editTask = async (title, id) => {
    try {
      const updated = await axios.put(`http://localhost:3000/api/todo/${id}`, {
        title,
      });
      setTodos((prev) =>
        prev.map((t) =>
          t._id === id ? { ...updated.data, isEditing: false } : t
        )
      );
    } catch (error) {
      console.error(
        "Error editing task",
        error.response?.data || error.message
      );
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const filteredTodos = todos.filter((todo) => {
    const titleMatch = todo.title
      .toLowerCase()
      .includes(titleSearch.toLowerCase());
    const descMatch = todo.description
      ?.toLowerCase()
      .includes(descSearch.toLowerCase());
    return titleMatch && descMatch;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="TodoWrapper">
      <h1>My ToDo List</h1>
      <TodoForm addTodo={addTodo} />

      <div className="controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={titleSearch}
          onChange={(e) => setTitleSearch(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Search by description..."
          value={descSearch}
          onChange={(e) => setDescSearch(e.target.value)}
          className="search-input"
        />
        <button onClick={toggleSortOrder} className="sort-btn">
          Sort by Due Date (
          {sortOrder === "asc" ? "Oldest First" : "Newest First"})
        </button>
      </div>

      {sortedTodos.length === 0 ? (
        <p>No tasks match your search.</p>
      ) : (
        sortedTodos.map((todo) =>
          todo.isEditing ? (
            <EditTodo key={todo._id} editTodo={editTask} task={todo} />
          ) : (
            <Todo
              key={todo._id}
              task={todo}
              deleteTodo={() => deleteTodo(todo._id)}
              editTodo={() => editTodo(todo._id)}
              toggleComplete={() => toggleComplete(todo._id)}
            />
          )
        )
      )}
    </div>
  );
};
