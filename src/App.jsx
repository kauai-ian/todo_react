import React, { useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import "./App.css";

function Form({ addTodo }) {
  const [newItem, setNewItem] = useState(""); // hook that accepts default value of empty string. 2 values. item and function.
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ id: uuid(), title: newItem, completed: false });
    setNewItem("");
  };

  return (
    <section className="form-section">
      <h2>Create new Todo</h2>
      <form
        onSubmit={handleSubmit}
        className="new-item-form"
        name="new-item-form"
      >
        <div className="form-row">
          <label htmlFor="item"></label>
          <input
            value={newItem} // update item avlue
            onChange={(e) => setNewItem(e.target.value)} // when event object changes, run function
            type="text"
            id="item"
            placeholder="new list item title"
          />
        </div>
        <button className="btn">Add</button>
      </form>
    </section>
  );
}

Form.propTypes = { addTodo: PropTypes.func.isRequired };

function List({ todoList, toggleCompleted, deleteTodo }) {
  return (
    <>
      {!todoList && <div>Loading...</div>}{" "}
      {/* if the position of the first operand is true then it returns the second operand */}
      {todoList && todoList.length > 0 && (
        <ul>
          {todoList.map((todo) => {
            return (
              <li key={todo.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => toggleCompleted(todo.id, e.target.checked)} // need to call as a function to run
                  />
                  {todo.title}
                </label>{" "}
                <button
                  onClick={() => deleteTodo(todo.id)} // need to call as a function  to run
                  className="btn btn-del"
                >
                  Remove Item
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {todoList && todoList.length === 0 && (
        <div>There are no todos on the list!</div>
      )}
    </>
  );
}

List.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ),
  toggleCompleted: PropTypes.func.isRequired,
};





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
      <List todoList={todos} toggleCompleted={toggleCompleted} deleteTodo={deleteTodo}/>
    </div>
  );
}

export default App;
