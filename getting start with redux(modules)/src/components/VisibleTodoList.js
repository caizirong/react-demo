import React from 'react'
import {connect } from 'react-redux'
import TodoList from './TodoList'
import {toggleTodo} from '../actions/index'
const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      // Use the `Array.filter()` method
      return todos.filter(
        t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
    default:
      return todos
  }
}

// takes the Redux store's state, and returns the props that we need to pass to the presentational TodoList component so it can be rendered with the current state
const mapStateToProps = (state) => ({
  todos: getVisibleTodos(
    state.todos,
    state.visibilityFilter
  )
})

// maps the store's dispatch() method of and returns the props that use the dispatch method to dispatch actions. So it returns the callback props needed by the presentational component. 
const mapDispatchToProps = (dispatch) => ({
  onTodoClick: (id) => {
    dispatch(toggleTodo(id))
  }
})


// The result of the connect call is the container component that is going to render the presentational component. It will calculate the props to pass to the presentational component by merging the objects returned from mapStateToProps, mapDispatchToProps, and its own props
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
export default VisibleTodoList