import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import KG from 'date-fns/locale/en-AU';
import PropTypes from 'prop-types';

export default class Task extends Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      value: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      editItem,
      todoDataID: { id },
    } = this.props;

    editItem(id, this.state.value);

    this.setState({ value: '' });
    this.setState({ edit: false });
  }

  render() {
    const { label, active, id, date, deleteItem, toggleActive } = this.props;

    return (
      <li className={!active ? 'completed' : this.state.edit ? 'editing' : ''} id={id}>
        <div className="view">
          <input
            id={id}
            className="toggle"
            type="checkbox"
            onChange={(e) => toggleActive(id, e.target.checked)}
            checked={active ? false : 'checked'}
          />

          <label htmlFor={id}>
            <span className="description">{label}</span>
            <span className="created">
              {`created ${formatDistanceToNow(date, {
                includeSeconds: true,
                locale: KG,
                addSuffix: true,
              })}`}
            </span>
          </label>

          <button
            type="button"
            className="icon icon-edit"
            onClick={() =>
              this.setState(({ edit }) => ({
                editing: !edit,
                value: this.props.label,
              }))
            }
          />

          <button type="button" className="icon icon-destroy" onClick={() => deleteItem(id)} />
        </div>

        {this.state.edit && (
          <form onSubmit={() => this.handleSubmit}>
            <input
              type="text"
              className="edit"
              onChange={(e) => this.setState({ value: e.target.value })}
              value={this.state.value}
            />
          </form>
        )}
      </li>
    );
  }
}

Task.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  active: PropTypes.bool,
  date: PropTypes.instanceOf(Date),

  deleteItem: PropTypes.func.isRequired,
  toggleActive: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
};

Task.defaultProps = {
  todo: {},
};
