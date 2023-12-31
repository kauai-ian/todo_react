import { ListItem } from "./ListItem";
import PropTypes from "prop-types";


export function List({ lists, deleteList, switchLists,}) {
    return (
      <>
        {!lists && <div>Loading...</div>}{" "}
        {/* if the position of the first operand is true then it returns the second operand */}
        {lists && lists.length > 0 && (
          <ul>
            {lists.map((list) => {
              return (
                <ListItem {...list} key={list.id} switchLists={switchLists} deleteList={deleteList}/>
              );
            })}
          </ul>
        )}
        {lists && lists.length === 0 && (
          <div>Make a list first to add a todo!</div>
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
    ),
    switchLists: PropTypes.func.isRequired,
    deleteList: PropTypes.func.isRequired,
  };