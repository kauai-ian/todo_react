import { PropTypes } from "prop-types";

export function ListItem({ title, id, deleteList, switchLists }) {
  const capFrstLtr = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleDeleteList = () => {
    if (id !== "1") {
      deleteList(id);
    } else {
      console.log("Cannot delete inbox");
      return;
    }
  };

  return (
    <li>
      <label>
        <input type="text" onClick={() => switchLists(id)} />
        {capFrstLtr(title)}
      </label>{" "}
      <button onClick={handleDeleteList} className="btn btn-del">
        Remove
      </button>
    </li>
  );
}

ListItem.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  switchLists: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
};
