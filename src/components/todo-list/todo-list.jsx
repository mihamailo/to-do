import React from 'react';

import TodoListItem from './todo-list-item.jsx';
import './todo-list.css';

const TodoList = ({ todos,
  onDeleted,
  onToggleImportant,
  onToggleDone,
  added,
  countBig }) => {
  const elements = todos.map((item) => {

    const { id, added, ...propsItem } = item; // деструкт отдельно id + остальные элементы
    const timeDeference = Math.round(countBig - added);

    console.log(countBig);

    let addedData = timeDeference < 10 ? 'just now' : `${timeDeference} seconds ago`;
    if (timeDeference > 60) {
      addedData = '1 minute ago'
    }
    if (timeDeference > 120) {
      addedData = `${Math.round(timeDeference / 60)} minutes ago`
    }
    if (timeDeference / 60 > 30) {
      addedData = `30 minutes ago`
    }
    if (timeDeference / 60 > 60) {
      addedData = `1 hours ago`
    }
    const addedInfo = added ? <span className='added-info'>{addedData}</span> : null;

    return (
      <li key={id} className='list-group-item'>
        <TodoListItem
          {...propsItem}
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
          added={addedInfo}
        />
      </li>
    );
  });

  return (
    <ul className='list-group my-2 todo-list'>
      {elements}
    </ul>
  );
};

export default TodoList;