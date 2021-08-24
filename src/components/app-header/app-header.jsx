import React, { Component } from 'react';

export default class AppHeader extends Component {

  render() {

    const { toDo, done, important } = this.props;

    return (
      <div className='app-header d-flex justify-content-between align-items-end' >
        <h1> ToDo</h1>
        <div>
          <span>{toDo}</span> more to do,
            <span>{done}</span> done,
      <div className='text-right'>{important} important</div></div>
      </div>
    )
  };
};
