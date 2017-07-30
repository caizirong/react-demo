import React from 'react'
import Todo from './Todo'
const TodoList = ({
  todos,
  onTodoClick
}) => (
    <ul>
      {todos.map(todo =>
        <Todo
          key={todo.id}
          {...todo} // completed and text will as props
          onClick={() => onTodoClick(todo.id)}
        />
      )}
    </ul>
  )

export default TodoList