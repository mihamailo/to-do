import React, { Component } from 'react';

import Filter from '../filter';

export default class SearchPanel extends Component {

  state = {
    term: ''
  };

  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({ term }); //обновить состояние
    this.props.onSearchChange(term); // Передаем в App
  };

  render() {
    const { filter, onFilterChange } = this.props;
    const searchText = 'Placeholder';
    const searchStyle = {
      fontSize: '25px'
    };

    return (
      <div className='search d-flex' >
        <input className='form-control col-4'
          style={searchStyle}
          placeholder={searchText}
          value={this.state.term}
          onChange={this.onSearchChange}
        />
        <Filter
          filter={filter}
          onFilterChange={onFilterChange} />
      </div>
    );
  }

};
