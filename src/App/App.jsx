import React, { Component } from 'react';

import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer';

import './App.css';

export default class App extends Component {
  state = {
    todoData: [],

    filter: 'All',
  };

  /*...................       TIMER        ................ */
  startTimer = (id) => {
    this.setState(
      (prevState) => ({
        todoData: prevState.todoData.map((task) =>
          task.id === id && task.active && task.timer > 0 ? { ...task, isPaused: false } : task
        ),
      }),
      () => {
        const task = this.state.todoData.find((task) => task.id === id && task.active);
        if (task) {
          task.intervalId = this.createTimerInterval(id);
        }
      }
    );
  };

  pauseTimer = (id) => {
    this.setState((prevState) => ({
      todoData: prevState.todoData.map((task) => (task.id === id && task.active ? { ...task, isPaused: true } : task)),
    }));
  };

  createTimerInterval = (id) => {
    return setInterval(() => {
      this.setState((prevState) => ({
        todoData: prevState.todoData.map((task) =>
          task.id === id && task.active && !task.isPaused && task.timer >= 1 ? { ...task, timer: task.timer - 1 } : task
        ),
      }));
    }, 1000);
  };

  componentWillUnmount() {
    this.state.todoData.forEach((task) => {
      clearInterval(task.intervalId);
    });
  }
  /*...................       TIMER        ................ */

  createTodoItem(label, count) {
    const date = new Date();

    return {
      label,
      active: true,
      isPaused: true,
      id: label + date,
      date: date,
      timer: count === 0 ? 'no' : count,
    };
  }

  toggleActive = (id) => {
    this.setState((prevState) => {
      const updatedTodoData = prevState.todoData.map((item) => {
        if (item.id === id) {
          return { ...item, active: !item.active };
        }
        return item;
      });

      return {
        todoData: updatedTodoData,
      };
    });
  };

  deleteItem = (id) => {
    this.setState((prevState) => {
      const idx = prevState.todoData.findIndex((el) => el.id === id);

      if (idx === -1) {
        return null;
      }

      const newData = [...prevState.todoData.slice(0, idx), ...prevState.todoData.slice(idx + 1)];

      const deletedTask = prevState.todoData[idx];
      if (deletedTask && deletedTask.intervalId) {
        clearInterval(deletedTask.intervalId);
      }

      return {
        todoData: newData,
      };
    });
  };

  addItem = (text, count) => {
    const newItem = this.createTodoItem(text, count);

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];

      return {
        todoData: newArray,
      };
    });
  };

  deleteItems = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => el.active);

      return {
        todoData: newArray,
      };
    });
  };

  filteredItems = () => {
    const { todoData, filter } = this.state;
    return todoData.filter(({ active }) => {
      const all = filter === 'All';
      const completed = filter === 'Completed';
      return all ? true : completed ? active === false : active === true;
    });
  };

  changeFilter = (value) => {
    this.setState({ filter: value });
  };

  editToggle = () => {
    this.setState(({ edit }) => ({ edit: !edit }));
  };

  editItem = (elementID, text) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.map((element) => {
        if (element.id === elementID) {
          return { ...element, label: text };
        }

        return element;
      });

      return {
        todoData: newTodoData,
      };
    });
  };

  render() {
    const activeItem = this.state.todoData.filter((el) => el.active);
    return (
      <section className="todoapp">
        <NewTaskForm title="Todos" placeholder="What needs to be done?" addItem={this.addItem} />
        <TaskList
          todos={this.filteredItems()}
          toggleActive={this.toggleActive}
          deleteItem={this.deleteItem}
          editItem={this.editItem}
          startTimer={this.startTimer}
          pauseTimer={this.pauseTimer}
        />
        <Footer
          changeFilter={this.changeFilter}
          deleteItems={this.deleteItems}
          activeItem={activeItem}
          filter={this.state.filter}
        />
      </section>
    );
  }
}
