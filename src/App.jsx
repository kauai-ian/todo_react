import React, { useState, useEffect } from "react";
import "./App.css";
import { Form } from "./NewTodoForm";
import { List } from "./List";

function App() {
  const todosKey = "todos" // create a key for local storage key value 
  const [todos, setTodos] = useState(() => { // tracks the data in a variable, has a function to set the data. use state function to update storage when state changes.
    const storedTodos = localStorage.getItem(todosKey); // gets the data
    return storedTodos ? JSON.parse(storedTodos) : []; // if no stored todos, then empty array
  });

  // side effect to set storage and array to hold todos
  useEffect(() => {
    localStorage.setItem(todosKey, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo) => { 
    setTodos((prevTodos) => [...prevTodos, newTodo]); //spread instead of listing out props
  };
  const toggleCompleted = (id, completed) => {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        return todo.id === id ? { ...todo, completed } : todo; // brand new state object or return todo
      });
    });
  };
  const deleteTodo = (id) => {
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
