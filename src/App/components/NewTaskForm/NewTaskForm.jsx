import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = (props) => {
  const { placeholder, title } = props;

  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onMinChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) || value === '') {
      setMin(value);
    }
  };

  const onSecChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) || value === '') {
      setSec(value);
    }
  };

  const onLabelChange = (e) => {
    const value = e.target.value;
    setLabel(value);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit(e);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let count = 0;
    if (label) {
      if (min !== '') {
        count += parseInt(min, 10) * 60;
      }
      if (sec !== '') {
        count += parseInt(sec, 10);
      }
      console.log(count);
      props.addItem(label, count);
      setLabel('');
      setMin('');
      setSec('');
    }
  };
  return (
    <header className="header">
      <h1>{title}</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <label>
          <input
            className="new-todo"
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            onChange={onLabelChange}
            value={label}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            onKeyDown={onKeyDown}
            onChange={onMinChange}
            value={min}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            onKeyDown={onKeyDown}
            onChange={onSecChange}
            value={sec}
          />
        </label>
      </form>
    </header>
  );
};

NewTaskForm.propTypes = {
  placeholder: PropTypes.string,
  title: PropTypes.string,
  addItem: PropTypes.func.isRequired,
};

NewTaskForm.defaultProps = {
  placeholder: 'What needs to be done?',
  title: 'Todos',
};

export default NewTaskForm;
