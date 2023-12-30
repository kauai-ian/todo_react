import React, { useState } from "react";
import "./App.css";
import { Form } from "./NewTodoForm";
import { List } from "./List";

function App() {
  const [todos, setTodos] = useState([]); //
  const addTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };
  const toggleCompleted = (id, completed) => {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        return todo.id === id ? { ...todo, completed } : todo; // brand new state object or return todo
      });
    });
  };
  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }
  console.log(todos);

  return (
    <div>
      <h1>Todo List in React</h1>
      <Form addTodo={addTodo} setTodos={setTodos} />
      <h2>Todo Items: </h2>
      <List
        todoList={todos}
        toggleCompleted={toggleCompleted}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
