import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import KG from 'date-fns/locale/en-AU';
import PropTypes from 'prop-types';

import AppTimer from '../Timer/timerA';

const Task = (props) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const { editItem, id } = props;

    editItem(id, value);

    setEdit(false);
    setValue('');
  };

  const { label, active, id, date, timer, deleteItem, toggleActive, isPaused, startTimer, pauseTimer } = props;

  return (
    <li className={!active ? 'completed' : edit ? 'editing' : ''} id={id}>
      <div className="view">
        <input
          id={id}
          className="toggle"
          type="checkbox"
          onChange={(e) => toggleActive(id, e.target.checked)}
          checked={active ? false : 'checked'}
        />

        <label htmlFor={id}>
          <span className="title">{label}</span>
          <AppTimer seconds={timer} id={id} isPaused={isPaused} startTimer={startTimer} pauseTimer={pauseTimer} />
          <span className="description">
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
          onClick={() => {
            setEdit((prevEdit) => !prevEdit);
            setValue(label);
          }}
        />

        <button type="button" className="icon icon-destroy" onClick={() => deleteItem(id)} />
      </div>

      {edit && (
        <form onSubmit={handleSubmit}>
          <input type="text" className="edit" onChange={(e) => setValue(e.target.value)} value={value} />
        </form>
      )}
    </li>
  );
};

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

export default Task;
