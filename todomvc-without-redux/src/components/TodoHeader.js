import React from 'react'
import { Input } from 'antd'
class TodoHeader extends React.Component {
  constructor(props) {
    super(props)
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      let value = e.target.value;
      let date = new Date().toDateString()
      if (!value || value === ' ') return false;
      let newTodoItem = {
        text: value,
        isDone: false,
        time: date
      }
      e.target.value = '';
      this.props.addTodos(newTodoItem)
    }
  }
  componentWillMount() {
    Date.prototype.Format = function (fmt) {

    }
  }
  render() {
    return (
      <div className="todo-header">
        <h1>TodoList</h1>
        <Input autoFocus ref="input" placeholder="输入待办事项" onKeyUp={this.handleKeyUp.bind(this)} />
      </div>
    )
  }
}
export default TodoHeader