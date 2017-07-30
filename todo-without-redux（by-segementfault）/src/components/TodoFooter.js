import React from 'react'
import {Button, Checkbox } from 'antd'

class TodoFooter extends React.Component {
  constructor(props) {
    super(props)
    this.changeAll = this.changeAll.bind(this)
    this.deleteAll = this.deleteAll.bind(this)
  }

  changeAll(e) {
    this.props.changeTodoState(null, e.target.checked, true)
  }

  deleteAll() {
    this.props.deleteAll(null, true)
  }

  render() {
    let minus = this.props.todoCount - this.props.todoDoneCount
    return (
      <div>
        <label>
          <Checkbox checked={this.props.isAllChecked} onChange={this.changeAll}></Checkbox>全选
        </label>
        <span>还剩{minus}未完成</span>
        <Button onClick={this.deleteAll}>清除所有已完成</Button>
      </div>
    )
  }
}
export default TodoFooter