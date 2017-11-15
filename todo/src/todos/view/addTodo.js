import React , {Component} from 'react'
import PropTypes from 'prop-types';
import {connect}  from 'react-redux'
import {addTodo } from '../actions'

class AddTodo extends Component {
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.refInput = this.refInput.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.state = {value: ''}
  }

  onInputChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  onSubmit(ev) {
    ev.preventDefault()
    // ref取值，非受控组件
    // const input = this.input
    // if (!input.value.trim()) {
    //   return
    // }
    // this.props.onAdd(input.value);
    // input.value = ''

    // 受控组件，利用组件状态来同步记录DOM元素的值
    const inputValue = this.state.value;
    if (!inputValue.trim()) {
      return
    }
    this.props.onAdd(inputValue);
    this.setState({value: ''})
  }
  refInput(node) {
    this.input = node
  }
  render() {
    return (
      <div className="add-todo">
        <form onSubmit={this.onSubmit}>
          <input className="new-todo" onChange={this.onInputChange} value={this.state.value} ref={this.refInput}/>
          <button className="add-btn" type="submit">添加</button>
        </form>
      </div>
    )
  }
}

AddTodo.PropTypes = {
  onAdd: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (text) => {
      dispatch(addTodo(text))
    }
  }
}

export default connect(null, mapDispatchToProps)(AddTodo)