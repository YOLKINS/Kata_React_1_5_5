import React from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends React.Component {
  constructor() {
    super();
    this.state = {
      label: '',
    };
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.label) {
      this.props.addItem(this.state.label);
      this.setState({ label: '' });
    }
  };

  render() {
    const { placeholder, title } = this.props;
    return (
      <header className="header">
        <h1>{title}</h1>
        <form onSubmit={this.onSubmit}>
          <label>
            <input
              className="new-todo"
              placeholder={placeholder}
              onChange={this.onLabelChange}
              value={this.state.label}
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
