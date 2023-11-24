import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

const TaskList = (props) => {
  const { todos, toggleActive, deleteItem, editItem, startTimer, pauseTimer } = props;
  const elements = todos.map((item) => {
    return (
      <Task
        key={item.id}
        {...item}
        todos={todos}
        toggleActive={toggleActive}
        deleteItem={deleteItem}
        editItem={editItem}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.propTypes = {
  todos: PropTypes.any,
  toggleActive: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  todos: {},
};

export default TaskList;
