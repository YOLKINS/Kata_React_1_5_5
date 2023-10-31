import React from "react";
import PropTypes from "prop-types";

class TaskFilter extends React.Component {
  render() {
    const { filter, changeFilter } = this.props;
    return (
      <ul className="filters">
        <li>
          <button
            type="button"
            className={filter === "All" ? "selected" : false}
            onClick={() => changeFilter("All")}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === "Active" ? "selected" : false}
            onClick={() => changeFilter("Active")}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === "Completed" ? "selected" : false}
            onClick={() => changeFilter("Completed")}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TaskFilter.propTypes = {
  filter: PropTypes.string,
  changeFilter: PropTypes.func.isRequired,
};

TaskFilter.defaultProps = {
  filter: "All",
};
export default TaskFilter;
