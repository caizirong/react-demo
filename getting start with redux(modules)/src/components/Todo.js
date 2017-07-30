import React from 'react'
const Todo = ({
  onClick,
  completed,
  text
}) => (
    <li
      onClick={onClick}   // 让调用的组件去specify what happen on the click
      style={{
        textDecoration:
        completed ?
          'line-through' :
          'none'
      }}>
      {text}
    </li>
  )
export default Todo