import React from 'react'
import TodoItem from './TodoItem'

class TodoMain extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    if (this.props.todos.length === 0) {
      return (
        <div className="completed">
          请添加待办事项
        </div>
      )
    } else {
      return (
        <ul>
          {this.props.todos.map((todo, index) => {
            return <TodoItem text={todo.text} isDone={todo.isDone}  index={index} time={todo.time} {...this.props} key={index}/>
          })}
        </ul>
      )}
    }
}

export default TodoMain