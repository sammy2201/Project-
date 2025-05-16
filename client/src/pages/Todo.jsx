import React, { useState, useEffect } from "react";
import { Todo } from "../components/Todo.jsx";
import { TodoForm } from "../components/TodoForm.jsx";
import { EditTodo } from "../components/EditTodo.jsx";
import { TodoControls } from "../components/TodoControls.jsx";
import { TodoPagination } from "../components/TodoPagination.jsx";
import axios from "axios";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
  const [titleSearch, setTitleSearch] = useState("");
  const [descSearch, setDescSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch todos whenever these change
  useEffect(() => {
    fetchTodos(currentPage, sortOrder, titleSearch, descSearch);
  }, [currentPage, sortOrder, titleSearch, descSearch]);

  const fetchTodos = async (
    page = 1,
    order = "asc",
    title = "",
    description = ""
  ) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/api/todo`, {
        params: {
          page,
          limit: 10,
          sort: "dueDate",
          order,
          title,
          description,
        },
      });
      setTodos(res.data.data);
      setTotalPages(Math.ceil(res.data.total / 10));
    } catch (error) {
      console.error("Error fetching todos", error);
    } finally {
      setLoading(false);
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

  const editTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, isEditing: !t.isEditing } : t))
    );
  };

  const editTask = async (title, description, id) => {
    try {
      const updated = await axios.put(`http://localhost:3000/api/todo/${id}`, {
        title,
        description,
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
    setCurrentPage(1); // reset page on sort change
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="TodoWrapper">
      <h1>My ToDo List</h1>
      <TodoForm addTodo={addTodo} />

      <TodoControls
        titleSearch={titleSearch}
        setTitleSearch={setTitleSearch}
        descSearch={descSearch}
        setDescSearch={setDescSearch}
        sortOrder={sortOrder}
        toggleSortOrder={toggleSortOrder}
      />

      {loading ? (
        <p>Loading todos...</p>
      ) : todos.length === 0 ? (
        <p>No tasks match your search.</p>
      ) : (
        todos.map((todo) =>
          todo.isEditing ? (
            <EditTodo key={todo._id} editTodo={editTask} task={todo} />
          ) : (
            <Todo
              key={todo._id}
              task={todo}
              deleteTodo={() => deleteTodo(todo._id)}
              editTodo={() => editTodo(todo._id)}
            />
          )
        )
      )}

      <TodoPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
