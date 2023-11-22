import React from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends React.Component {
  constructor() {
    super();
    this.state = {
      label: '',
      min: '',
      sec: '',
    };
  }

  onMinChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) || value === '') {
      this.setState({
        min: value,
      });
    }
  };

  onSecChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) || value === '') {
      this.setState({
        sec: value,
      });
    }
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { label, min, sec } = this.state;
    let count = 0;
    if (label) {
      if (min !== '') {
        count += parseInt(min, 10) * 60;
      }
      if (sec !== '') {
        count += parseInt(sec, 10);
      }
      console.log(count);
      this.props.addItem(label, count);
      this.setState({ label: '', min: '', sec: '' });
    }
  };

  render() {
    const { placeholder, title } = this.props;
    return (
      <header className="header">
        <h1>{title}</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <label>
            <input
              className="new-todo"
              placeholder={placeholder}
              onKeyDown={this.onKeyDown}
              onChange={this.onLabelChange}
              value={this.state.label}
            />
            <input
              className="new-todo-form__timer"
              placeholder="Min"
              onKeyDown={this.onKeyDown}
              onChange={this.onMinChange}
              value={this.state.min}
            />
            <input
              className="new-todo-form__timer"
              placeholder="Sec"
              onKeyDown={this.onKeyDown}
              onChange={this.onSecChange}
              value={this.state.sec}
            />
          </label>
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  placeholder: PropTypes.string,
  title: PropTypes.string,
  addItem: PropTypes.func.isRequired,
};

NewTaskForm.defaultProps = {
  placeholder: 'What needs to be done?',
  title: 'Todos',
};
