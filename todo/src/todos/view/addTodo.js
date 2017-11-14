import React , {Component} from 'react'
import PropTypes from 'prop-types';
import {connect}  from 'react-redux'
import {addTodo } from '../actions'

class AddTodo extends Component {
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.refInput = this.refInput.bind(this)
  }
  onSubmit(ev) {
    ev.preventDefault()
    const input = this.input
    if (!input.value.trim()) {
      return
    }
    this.props.onAdd(input.value);
    input.value = ''
  }
  refInput(node) {
    this.input = node
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input ref={this.refInput}/>
          <button type="submit">添加</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (text) => {
      dispatch(addTodo(text))
    }
  }
}

export default connect(null, mapDispatchToProps)(AddTodo)