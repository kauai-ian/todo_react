import { TodoItem } from "./TodoItem";
import PropTypes from "prop-types";


export function List({ todoList, toggleCompleted, deleteTodo }) {
    return (
      <>
        {!todoList && <div>Loading...</div>}{" "}
        {/* if the position of the first operand is true then it returns the second operand */}
        {todoList && todoList.length > 0 && (
          <ul>
            {todoList.map((todo) => {
              return (
                <TodoItem {...todo} key={todo.id} toggleCompleted={toggleCompleted} deleteTodo={deleteTodo}/>
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
    deleteTodo: PropTypes.func.isRequired,
  };