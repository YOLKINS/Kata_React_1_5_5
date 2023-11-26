import React, { useEffect, useState, useCallback, useMemo } from 'react';

import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer';

import './App.css';

const App = () => {
  const [todoData, changeTodoData] = useState([]);
  const [filter, setFilter] = useState('All');

  /*...................       TIMER        ................ */

  const memoizedTodoData = useMemo(() => todoData, [todoData]);

  const createTimerInterval = useCallback(
    (id) => {
      return setInterval(() => {
        changeTodoData((prevTodoData) => {
          const newTodoData = prevTodoData.map((task) =>
            task.id === id && task.active && !task.isPaused && task.timer > 0
              ? { ...task, timer: task.timer - 1 }
              : task
          );
          return newTodoData;
        });
      }, 1000);
    },
    [changeTodoData]
  );

  const startTimer = useCallback(
    (id) => {
      changeTodoData((prevTodoData) => {
        const taskIndex = prevTodoData.findIndex((task) => task.id === id);
        if (taskIndex === -1) return prevTodoData;

        const task = prevTodoData[taskIndex];

        if (task.active && task.timer > 0 && !task.intervalId) {
          const newTodoData = [...prevTodoData];
          newTodoData[taskIndex] = { ...task, isPaused: false, intervalId: createTimerInterval(id) };
          return newTodoData;
        }

        return prevTodoData;
      });
    },
    [changeTodoData, createTimerInterval]
  );

  const pauseTimer = useCallback(
    (id) => {
      changeTodoData((prevTodoData) => {
        const taskIndex = prevTodoData.findIndex((task) => task.id === id);
        if (taskIndex === -1) return prevTodoData;

        const task = prevTodoData[taskIndex];

        if (task.active && task.intervalId) {
          clearInterval(task.intervalId);
          const newTodoData = [...prevTodoData];
          newTodoData[taskIndex] = { ...task, isPaused: true, intervalId: null };
          return newTodoData;
        }

        return prevTodoData;
      });
    },
    [changeTodoData]
  );

  useEffect(() => {
    memoizedTodoData.forEach((task) => {
      if (task.intervalId) {
        clearInterval(task.intervalId);
      }
    });
  }, [memoizedTodoData]);

  /*...................       TIMER        ................ */

  const createTodoItem = (label, count) => {
    const date = new Date();

    return {
      label,
      active: true,
      isPaused: true,
      id: label + date,
      date: date,
      timer: count === 0 ? 'no' : count,
    };
  };

  const toggleActive = (id) => {
    changeTodoData((prevTodoData) => {
      const updatedTodoData = prevTodoData.map((item) => {
        if (item.id === id) {
          return { ...item, active: !item.active };
        }
        return item;
      });

      return updatedTodoData;
    });
  };

  const deleteItem = (id) => {
    changeTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id);
      if (idx === -1) {
        return null;
      }
      const newData = [...prevTodoData.slice(0, idx), ...prevTodoData.slice(idx + 1)];
      const deletedTask = prevTodoData[idx];
      if (deletedTask && deletedTask.intervalId) {
        clearInterval(deletedTask.intervalId);
      }

      return newData;
    });
  };

  const addItem = (text, count) => {
    const newItem = createTodoItem(text, count);

    changeTodoData((prevTodoData) => {
      const newArray = [...prevTodoData, newItem];
      return newArray;
    });
  };

  const deleteItems = () => {
    changeTodoData((prevTodoData) => {
      const newArray = prevTodoData.filter((el) => el.active);
      return newArray;
    });
  };

  const filteredItems = () => {
    return todoData.filter(({ active }) => {
      const all = filter === 'All';
      const completed = filter === 'Completed';
      return all ? true : completed ? active === false : active === true;
    });
  };

  const changeFilter = (value) => {
    setFilter(value);
  };

  const editItem = (elementID, text) => {
    changeTodoData((prevTodoData) => {
      const newTodoData = prevTodoData.map((element) => {
        if (element.id === elementID) {
          return { ...element, label: text };
        }

        return element;
      });
      return newTodoData;
    });
  };

  const activeItem = todoData.filter((el) => el.active);
  return (
    <section className="todoapp">
      <NewTaskForm title="Todos" placeholder="What needs to be done?" addItem={addItem} />
      <TaskList
        todos={filteredItems()}
        toggleActive={toggleActive}
        deleteItem={deleteItem}
        editItem={editItem}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
      />
      <Footer changeFilter={changeFilter} deleteItems={deleteItems} activeItem={activeItem} filter={filter} />
    </section>
  );
};

export default App;
