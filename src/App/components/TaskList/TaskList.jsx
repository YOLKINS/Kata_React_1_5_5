import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

export default class TaskList extends React.Component {
  render() {
    const elements = this.props.todos.map((item) => {
      return (
        <Task
          key={item.id}
          {...item}
          todos={this.props.todos}
          toggleActive={this.props.toggleActive}
          deleteItem={this.props.deleteItem}
          editItem={this.props.editItem}
          startTimer={this.props.startTimer}
          pauseTimer={this.props.pauseTimer}
        />
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}

TaskList.propTypes = {
  todos: PropTypes.any,
  toggleActive: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  todos: {},
};
