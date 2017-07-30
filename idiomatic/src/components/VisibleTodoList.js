import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import TodoList from './TodoList'
// import { toggleTodo, receiveTodos } from '../actions/index'
import * as actions from '../actions'
import { getVisibleTodos } from '../reducers'
import React, { Component } from 'react'
// import {fetchTodos} from '../api'
// const getVisibleTodos = (
//   todos,
//   filter
// ) => {
//   switch (filter) {
//     case 'all':
//       return todos;
//     case 'completed':
//       return todos.filter(
//         t => t.completed
//       );
//     case 'active':
//       return todos.filter(
//         t => !t.completed
//       );
//     default:
//       throw new Error(`Unkonwn filter: $(filter).`)
//   }
// }

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData()
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props
    // fetchTodos(filter).then(todos => {
    //   // console.log(this.props.filter,todos)
    //   receiveTodos(filter,todos)
    // })
    fetchTodos(filter)
  }

  render() {
    const { toggleTodo, ...rest } = this.props
    // return <TodoList {...this.props}/>
    return (
      <TodoList
        onTodoClick={toggleTodo} 
        {...rest}
      />)
  }
}

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all'
  return {
    todos: getVisibleTodos(state, filter),
    filter
  }
};


// const mapDispatchToProps = (dispatch) => ({
//   onTodoClick(id) {
//     dispatch(toggleTodo(id))
//   }
// })

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  // { onTodoClick: toggleTodo, receiveTodos }
  actions
)(VisibleTodoList));
export default VisibleTodoList