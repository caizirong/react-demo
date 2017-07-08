import React from 'react'
import ReactDOM from 'react-dom'
import { Checkbox, Button } from 'antd'
class TodoItem extends React.Component {
  constructor(props) {
    super(props)
  }

  handleChange() {
    console.log('*********this.props.isDone:' + this.props.isDone)
    let isDone = !this.props.isDone
    console.log('*********Now this.props.isDone:' + isDone)
    this.props.changeTodoState(this.props.index, isDone);
  }

  handleClick() {
    console.log('******删除任务*******')
    this.props.deleteTodo(this.props.index)
  }

  onmouseenter() {
    console.log('mouse enter')
    ReactDOM.findDOMNode(this.refs.deleteButton).style.display = 'inline-block'
  }

  onmouseleave() {
    console.log('mouse leave')
    ReactDOM.findDOMNode(this.refs.deleteButton).style.display = 'none'
  }

  render() {
    let className = this.props.isDone ? 'task-done' : ''
    return (
      <li onMouseEnter={this.onmouseenter.bind(this)} onMouseLeave={this.onmouseleave.bind(this)}>
        <Checkbox onChange={this.handleChange.bind(this)}>
          <span>{this.props.time}&nbsp;&nbsp;</span>
          <span className={className}>
            {this.props.text}
          </span>
        </Checkbox>
        <Button ref="deleteButton" type="danger" size="small" onClick={this.handleClick.bind(this)}>删除</Button>

      </li>
    )
  }
}
export default TodoItem
