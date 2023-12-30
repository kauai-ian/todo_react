import PropTypes from "prop-types";

export function TodoItem({
  title,
  id,
  completed,
  toggleCompleted,
  deleteTodo,
}) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleCompleted(id, e.target.checked)} // need to call as a function to run
        />
        {title}
      </label>{" "}
      <button
        onClick={() => deleteTodo(id)} // need to call as a function  to run
        className="btn btn-del"
      >
        Remove Item
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  completed: PropTypes.bool,
  toggleCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};