import React from "react";
import PropTypes from "prop-types";

import TaskFilter from "../TaskFilter/TaskFilter";

export default class Footer extends React.Component {
  render() {
    const { changeFilter, deleteItems, activeItem, filter } = this.props;
    const left = activeItem.length;
    return (
      <footer className="footer">
        <span className="todo-count">{left} items left</span>
        <TaskFilter filter={filter} changeFilter={changeFilter} />
        <button type="button" className="clear-completed" onClick={deleteItems}>
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.propTypes = {
  left: PropTypes.number,
  filter: PropTypes.string,
  deleteItems: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
};
