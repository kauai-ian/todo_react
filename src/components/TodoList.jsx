import { TodoItem } from "./TodoItem";
import PropTypes from "prop-types";

export function TodoList({ activeList, todos, deleteTodo, addTodo, toggleCompleted }) {
  return (
    <>
    {!activeList && <div>No active list selected</div>}
      {activeList && (
        <>
      {!todos && <div>Loading...</div>}{" "}
      {todos && todos.length > 0 && (
        <ul>
          {todos.map((todo) => {
            return (
              <TodoItem
                {...todo}
                key={todo.id}
                deleteTodo={deleteTodo}
                addTodo={addTodo}
                toggleCompleted={toggleCompleted}
              />
            );
          })}
        </ul>
      )}
      {todos && !todos.length && <p>Make a list first to add a todo!</p>}
        </>
        )}
      </>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ),
  addTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  length: PropTypes.func,
  activeList: PropTypes.object,
};
