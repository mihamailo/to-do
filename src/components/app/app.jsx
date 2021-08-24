import React, { Component } from 'react';

// Компоненты
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import AddItem from '../add-item';
// Названия компонентов обязательно с большой буквы


export default class App extends Component {

  maxId = 100;
  // Данные по дефолту
  state = {
    todoData: [
      this.createItem('Drink'),
      this.createItem('Make'),
      this.createItem('Break')
    ],
    term: '', // чтобы фильтровать список
    filter: 'all',
    time: '12:00',
    count: 0,
    countBig: 0
  };

  componentDidMount() {
    this.setState({ count: new Date().getTime() / 1000 })
    this.interval = setInterval(() => {
      this.setState({ count: new Date().getTime() / 1000 })
    }, 1000);

    this.setState({ countBig: new Date().getTime() / 1000 })
    this.bigInterval = setInterval(() => {
      this.setState({
        countBig: localStorage.countBig ? localStorage.countBig : new Date().getTime() / 1000
      })
      console.log(localStorage.countBig);
    }, 10000)
    if (!localStorage.countBig) this.setStorage()
  }


  setStorage = () => {
    const { countBig } = this.state;
    localStorage.setItem('rememberTime', countBig);
  };

  updateTime = () => {
    this.setState({ countBig: new Date().getTime() / 1000 })
  }

  createItem(label, time) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
      added: time
    }
  };
  // Для перезаписи состояний в функциях onToggleImportant и onToggleDone
  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName]
    };

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  };

  deleteItem = (id) => { // принимаем id из todolist
    this.setState(({ todoData }) => {  // нельзя изменять структуру данных внутри setState
      const idx = todoData.findIndex((el) => el.id === id);

      // todoData.splice(idx, 1) так делать не стоит ведь это изменяет текущее состояние

      // получаем нужные объекты массива кроме того, который нужно удалить 
      // const before = todoData.slice(0, idx);
      // const after = todoData.slice(idx + 1);
      //  

      const newArray = [
        ...todoData.slice(0, idx), // slice копирует а splice изменяет
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray // задаем новое состояние
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createItem(text, new Date().getTime() / 1000);
    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, newItem]
      }
    });
    this.setState({ filter: 'all' })
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  // сам фильтр поиска
  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;  //если label содержит строку
    })
  }

  onSearchChange = (term) => { // получаем term из search-panel
    this.setState({ term })
  };

  onFilterChange = (filter) => { // получаем term из search-panel
    this.setState({ filter })
  };

  filter(items, filter) {

    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      case 'important':
        return items.filter((item) => item.important);
      default:
        return items;
    }

  };

  render() {

    const { todoData, term, filter } = this.state; // чтобы не писать везде this.state

    const visibleItems = this.filter(
      this.search(todoData, term), filter);

    const doneCount = todoData
      .filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    const importantCount = todoData
      .filter((el) => el.important).length;

    return (
      <div className='container'>
        <AppHeader toDo={todoCount} done={doneCount} important={importantCount} />
        <SearchPanel
          onSearchChange={this.onSearchChange}
          filter={filter}
          onFilterChange={this.onFilterChange}
        />
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          countBig={this.state.countBig} />
        <AddItem
          onAdded={this.addItem} />
        <div>{new Date().toLocaleTimeString()}</div>
      </div >
    );
  }


};
