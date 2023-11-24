import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../TaskFilter/TaskFilter';

const Footer = (props) => {
  const { changeFilter, deleteItems, activeItem, filter } = props;
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
};

Footer.propTypes = {
  left: PropTypes.number,
  filter: PropTypes.string,
  deleteItems: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

export default Footer;
