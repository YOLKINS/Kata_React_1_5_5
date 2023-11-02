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

  createTodoItem(label) {
    const date = new Date();

    return {
      label,
      active: true,
      id: label + date,
      date: date,
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
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newData,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

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
