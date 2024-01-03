import { ListItem } from "./ListItem";
import PropTypes from "prop-types";

export function List({ activeList, activeListId, lists, deleteList, switchLists }) {
  return (
    <>
    {console.log(typeof lists)}
      {!lists && <div>Loading...</div>}{" "}
      {lists && lists.length === 0 && (
        <div>Make a list first to add a todo!</div>
      )}
      {lists && lists.length > 0 && (
        <ul>
          {lists.map((list) => {
            return (
              <ListItem
                {...list}
                key={list.id}
                todos={list.todos}
                activeList={activeList}
                activeListId={activeListId}
                switchLists={switchLists}
                deleteList={deleteList}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}

List.propTypes = {
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      todos: PropTypes.array.isRequired,
    })
  ).isRequired,
  switchLists: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
  activeList: PropTypes.func,
  activeListId: PropTypes.string,
};
