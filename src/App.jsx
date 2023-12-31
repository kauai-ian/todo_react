import React, { useState, useEffect } from "react";
import "./App.css";
import { TodoForm } from "./NewTodoForm";
// import { TodoList }
import { List } from "./List";
import { ListForm } from "./NewListForm";

function App() {
  const listsKey = "lists"; // create a key for local storage key value
  const [activeListId, setActiveListId] = useState(1);
  const [lists, setLists] = useState(() => {
    // tracks the data in a variable, has a function to set the data. use state function to update storage when state changes.
    const storedLists = localStorage.getItem(listsKey); // gets the data
    return storedLists
      ? JSON.parse(storedLists)
      : [{ id: 1, title: "Inbox", todos: [] }]; // if no stored todos, then empty array
  });

  // side effect to set storage and array to hold todos
  useEffect(() => {
    localStorage.setItem(listsKey, JSON.stringify(lists));
  }, [lists]);

  const addList = (newList) => {
    setLists((prevLists) => [prevLists, newList]);
  };

  const deleteList = (id) => {
    setLists((currentLists) => {
      return currentLists.filter((list) => list.id !== id);
    });
    if (activeListId === id) {
      setActiveListId(1);
    }
  };

  const getActiveList = () => {
    return lists.find((list) => list.id === activeListId);
  };

  const switchLists = (id) => {
    setActiveListId(id);
  };

  const addTodo = (newTodo) => {
    setLists((prevLists) => {
      const updatedLists = prevLists.map((list) => {
        if (list.id === activeListId) {
          return {
            ...list,
            todos: [...list.todos, newTodo], // Add the newTodo to the todos array
          };
        }
        return list;
      });
      localStorage.setItem(listsKey, JSON.stringify(updatedLists));
      return updatedLists;
    });
  };

  const toggleCompleted = (id, completed) => {
    setLists((currentLists) => {
      const updatedLists = currentLists.map((list) => {
        if (list.id === activeListId) {
          const updatedTodos = list.todos.map((todo) => {
            if (todo.id === id) {
              return { ...todo, completed }; // update the completed prop
            }
            return todo;
          });
          return { ...list, todos: updatedTodos };
        }
        return list;
      });
      localStorage.setItem(listsKey, JSON.stringify(updatedLists));
      return updatedLists;
    });
  };

  const deleteTodo = (id) => {
    setLists((currentLists) => {
      const updatedLists = currentLists.map((list) => {
        if (list.id === activeListId) {
          const updatedTodos = list.filter((todo) => todo.id !== id);
          return { ...list, todos: updatedTodos };
        }
        return list;
      });
      localStorage.setItem(listsKey, JSON.stringify(updatedLists));
      return updatedLists;
    });
  };

  const clearCompletedTodos = () => {
    const activeList = getActiveList();
    if (activeList) {
      const incompleteTodos = activeList.todos.filter(
        (todo) => !todo.completed
      );
      setLists((prevLists) => {
        const updatedLists = prevLists.map((list) => {
          list.id === activeListId ? { ...list, todos: incompleteTodos } : list;
        });
        localStorage.setItem(listsKey, JSON.stringify(updatedLists));
        return updatedLists;
      });
    }
  };
  console.log(lists);

  return (
    <div>
      <h1>Todo List in React</h1>
      <ListForm addList={addList} setLists={setLists} />
      <List
        switchLists={switchLists}
        deleteList={deleteList}
        getActiveList={getActiveList}
      />

      <div className="todo-container">
        <TodoForm addTodo={addTodo} todos={activeList.todos} />
        <h2>Todo Items: </h2>
        <TodoList
          todoList={activeList.todos}
          toggleCompleted={toggleCompleted}
          deleteTodo={deleteTodo}
        />
      </div>
      <div className="buttonContainer">
        <button className="btn clearCompleted" onClick={clearCompletedTodos}>
          Clear Completed Tasks
        </button>
      </div>
      <footer>
        <div className="footerContainer">
          <a
            href="https://github.com/kauai-ian"
            target="_blank"
            rel="noReferrer"
          >
            <img
              src="https://1000logos.net/wp-content/uploads/2021/05/GitHub-logo.png"
              alt="github"
              width="60px"
            />
            <p>Made on Planet Earth by Ian Tierney</p>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
