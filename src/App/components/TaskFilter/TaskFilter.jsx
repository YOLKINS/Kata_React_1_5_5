import React from 'react';
import PropTypes from 'prop-types';

const TaskFilter = (props) => {
  const { filter, changeFilter } = props;
  return (
    <ul className="filters">
      <li>
        <button type="button" className={filter === 'All' ? 'selected' : ''} onClick={() => changeFilter('All')}>
          All
        </button>
      </li>
      <li>
        <button type="button" className={filter === 'Active' ? 'selected' : ''} onClick={() => changeFilter('Active')}>
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filter === 'Completed' ? 'selected' : ''}
          onClick={() => changeFilter('Completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  );
};

TaskFilter.propTypes = {
  filter: PropTypes.string,
  changeFilter: PropTypes.func.isRequired,
};

TaskFilter.defaultProps = {
  filter: 'All',
};
export default TaskFilter;
