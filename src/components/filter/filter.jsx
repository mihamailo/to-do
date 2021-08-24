import React, { Component } from 'react';
import './filter.css';

export default class Filter extends Component {

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
    { name: 'important', label: "Important" }
  ]

  render() {

    const { filter, onFilterChange } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button
          className={`btn ${clazz}`}
          type='button'
          key={name}
          onClick={() => onFilterChange(name)}
        >
          {label}
        </button>
      )
    });

    return (
      <div className='filter btn-group'>
        {buttons}
      </div >
    );
  }
}