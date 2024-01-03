import { useState, useEffect } from "react";
import { TodoForm } from "./components/NewTodoForm";
import { TodoList } from "./components/TodoList";
import { List } from "./components/List";
import { ListForm } from "./components/NewListForm";
import { getItemFromLocalStorage } from "./helpers/getItemFromLocalStorage";

// to do
// logic could be cleaned up
//lots of re-renders -- need to look at - might have been the extra local storage issue
// check the get local storage functionality

function App() {
  const listsKey = "lists"; // create a key for local storage key value
  const [activeListId, setActiveListId] = useState("1");
  const [lists, setLists] = useState(
    () => getItemFromLocalStorage() // does this work?
  );
  console.log(getItemFromLocalStorage())

  // side effect to set storage and array to hold todos
  useEffect(() => {
    localStorage.setItem(listsKey, JSON.stringify(lists));
  }, [listsKey, lists]);

  const addList = (newList) => {
    setLists((prevLists) => [...prevLists, newList]); // creates a new array containing prev lists and the new list.
    if (!activeListId) {
      setActiveListId(newList.id);
    }
  };

  const deleteList = (id) => {
    setLists((currentLists) => {
      return currentLists.filter((list) => list.id !== id);
    });
    if (activeListId === id) {
      setActiveListId("1");
    }
  };
console.log(lists)
  const activeList = lists.find((list) => list.id === activeListId); // broken

  const switchLists = (id) => {
    setActiveListId(id);
  };

  const addTodo = (newTodo) => {
    setLists((prevLists) => {
      prevLists.map((list) => {
        list.id === activeListId
          ? {
              ...list,
              todos: [...list.todos, newTodo], 
            }
          : list;
      });
    });
  };

  const toggleCompleted = (id, completed) => {
    setLists((currentLists) => {
      currentLists.map((list) => {
        list.id === activeListId
          ? {
              ...list,
              todos: list.todos.map((todo) => {
                todo.id === id
                  ? { ...todo, completed } // update the completed prop
                  : todo;
              }),
            }
          : list;
      });
    });
  };

  const deleteTodo = (id) => {
    setLists((currentLists) => {
      currentLists.map((list) => {
        list.id === activeListId
          ? { ...list, todos: list.todos.filter((todo) => todo.id !== id) }
          : list;
      });
    });
  };

  const clearCompletedTodos = () => {
    if (activeList) {
      const incompleteTodos = activeList.todos.filter(
        (todo) => !todo.completed
      );
      setLists((prevLists) => {
        prevLists.map((list) => {
          list.id === activeListId ? { ...list, todos: incompleteTodos } : list;
        });
      });
    }
  };

  console.log(lists);
  console.log(activeListId);

  return (
    <div>
      <h1>Todo List in React</h1>
      <ListForm addList={addList} setLists={setLists} />
      <List
        lists={lists} // does this work now?
        switchLists={switchLists}
        deleteList={deleteList}
        activeList={activeList}
        activeListId={activeListId}
      />

      <div className="todo-container">
        <TodoForm addTodo={addTodo} activeList={activeList} />
        <h2>Todo Items </h2>
        <TodoList
          activeList={activeList}
          todos={activeList ? activeList.todos : []}
          toggleCompleted={toggleCompleted}
          deleteTodo={deleteTodo}
          addTodo={addTodo}
        />
      </div>
      <div className="buttonContainer">
        <button className="btn clearCompleted" onClick={clearCompletedTodos}>
          Clear Completed
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
