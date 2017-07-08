import React from 'react';
import ReactDOM from 'react-dom';
import TodoHeader from './TodoHeader'
import TodoMain from './TodoMain'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    }
    // this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  addTodo(item) {
    this.state.todos.push(item)
    this.setState({ todos: this.state.todos })
  }

  changeTodoState(index, isDone) {
    this.state.todos[index].isDone = isDone;
    this.setState({ todos: this.state.todos })
  }

  deleteTodo(index) {
    this.state.todos.splice(index, 1)
    this.setState({todos: this.state.todos})
  }

  render() {
    return (
      <div id="app" className="todo-wrapper">
        <TodoHeader addTodos={this.addTodo.bind(this)} />
        <TodoMain todos={this.state.todos} changeTodoState={this.changeTodoState.bind(this)} deleteTodo={this.deleteTodo.bind(this)} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)