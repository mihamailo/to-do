import React from 'react';

import './todo-list.css';

// Это компонент класс, он нужен для работы с состоянием

export default class TodoListItem extends React.Component {

  render() {
    const { label,
      onDeleted,
      onToggleImportant,
      onToggleDone,
      important,
      done,
      added } = this.props; //Destruct of props

    let classNames = 'todo-list-item-label';
    if (done) {
      classNames += ' done';
    }

    if (important) {
      classNames += ' important';
    }

    const style = {
      color: important ? 'steelblue' : 'black',
      fontWeight: important ? 'bold' : 'normal'
    };

    return (

      <span className='todo-list-item d-flex justify-content-between align-items-center' >
        <span
          className={classNames}
          onClick={onToggleDone}
        >
          {label}
        </span>
        <span>
          {added}
          <button
            type='button'
            className='delete-btn btn btn-danger mr-3'
            onClick={this.props.onDeleted}
          >
            delete
          </button>
          <button
            className='important-btn btn btn-success mr-3'
            onClick={onToggleImportant}
          >
            important
          </button>
        </span>
      </span >
    );
  }
}
