import React from 'react';
import ReactDOM from 'react-dom';
import TodoHeader from './TodoHeader'
import TodoMain from './TodoMain'
import TodoFooter from './TodoFooter'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      isAllChecked: false
    }
  }

  addTodo(item) {
    this.state.todos.push(item)
    this.setState({ todos: this.state.todos })
  }

  changeTodoState(index, isDone, isChangeAll = false) {
    if (isChangeAll) {
      this.setState({
        todos: this.state.todos.map((todo) => {
          todo.isDone = isDone;
          return todo;
        }),
        isAllChecked: isDone
      })

    } else {
      this.state.todos[index].isDone = isDone;
      this.allChecked()
    }
  }

  allChecked() {
    let isAllChecked = false;
    if (this.state.todos.every(todo => todo.isDone)) {
      isAllChecked = true;
    }
    this.setState({
      isAllChecked: isAllChecked
    })
  }

  deleteTodo(index, isDeleteAll=false) {
    if(isDeleteAll) {
      this.setState({todos: [], isAllChecked: false});
      return;
    }
    this.state.todos.splice(index, 1)
    this.setState({ todos: this.state.todos })
  }

  render() {
    let info = {
      isAllChecked: this.state.isAllChecked,
      todoCount: this.state.todos.length || 0,
      todoDoneCount: this.state.todos && this.state.todos.filter((todo) => todo.isDone).length || 0
    }
    return (
      <div id="app" className="todo-wrapper">
        <TodoHeader addTodos={this.addTodo.bind(this)} />
        <TodoMain todos={this.state.todos} changeTodoState={this.changeTodoState.bind(this)} deleteTodo={this.deleteTodo.bind(this)} />
        <TodoFooter changeTodoState={this.changeTodoState.bind(this)} deleteAll={this.deleteTodo.bind(this)} {...info}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)