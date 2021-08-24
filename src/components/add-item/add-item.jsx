import React, { Component } from 'react';

export default class AddItem extends Component {

  state = {
    label: '',
    term: ''
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });

  };

  onSubmit = (e) => {
    e.preventDefault(); // чтобы браузер не презагружал страницу
    if (this.state.label) {
      this.props.onAdded(this.state.label); //устанавливаем новый стейт
      this.setState({ // обнуляем стейт
        label: ''
      });
    }
  };

  render() {
    return (
      <form className='mt-4 d-flex justify-content-center align-items-center'
        onSubmit={this.onSubmit}>
        <input type="text"
          className='form-control col-3'
          onChange={this.onLabelChange}
          placeholder='What needs to do?'
          value={this.state.label} //input неконтролируемый поэтому добавляем value для связи со state
        />
        <button
          className='add-item btn btn-success ml-2'
          type='submit'>
          Add item
        </button>
      </form >
    );
  };
};


