import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TodoItem from './todoItem'
import { toggleTodo, removeTodo } from '../actions';
import { FilterTypes } from '../../constants';
import './style.css'
const TodoList = ({ todos, onToggleTodo, onRemoveTodo }) => {
  return (
    <ul className="todo-list">
      {
        todos.map((item) => {
          return (
            <TodoItem
              key={item.id}
              text={item.text}
              completed={item.completed}
              onToggle={() => { onToggleTodo(item.id) }}
              onRemove={() => { onRemoveTodo(item.id) }}
            />
          )
        })
      }

    </ul>

  )
}

const selectVisibleTodos = (todos, filter) => {
  switch (filter) {
    case FilterTypes.ALL:
      return todos;
    case FilterTypes.COMPLETED:
      return todos.filter(item => item.completed)
    case FilterTypes.UNCOMPLETED:
      return todos.filter(item => !item.completed)

    default:
      throw new Error('unsupported filter');
  }
}

TodoList.PropTypes = {
  todos: PropTypes.array.isRequired,
  onToggleTodo: PropTypes.func.isRequired,
  onRemoveTodo: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    todos: selectVisibleTodos(state.todos, state.filter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleTodo: (id) => { dispatch(toggleTodo(id)) },
    onRemoveTodo: (id) => { dispatch(removeTodo(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)