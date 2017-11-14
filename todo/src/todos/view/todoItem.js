import React from 'react'
import PropTypes from 'prop-types'

const TodoItem = ({onToggle, onRemove, completed, text}) => {
  const checkedProp = completed ? {checked: true} : {}
  return (
    <li style={{textDecoration: completed ? 'line-through' : 'none'}}>
      <input type="checkbox" {...checkedProp} onClick={onToggle}/>
      <label>{text}</label>
      <button onClick={onRemove}>x</button>
    </li>
  )
}

export default TodoItem