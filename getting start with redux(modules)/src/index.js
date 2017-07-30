import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux'
import { logger } from 'redux-logger'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import AddTodo from './components/AddTodo'
import VisibleTodoList from './components/VisibleTodoList'
import Footer from './components/Footer'
import todoApp from './reducers/index'
import registerServiceWorker from './registerServiceWorker';

// ***** state *****
// state === {[todos: Array(n)], visibilityFilter: "action.filter"}

// ******* reducer *******
/* const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      console.log("***** todos reducer return state *****", state)  // [Object, Object]: [todo1, todo2]
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      );
    default:
      return state;
  }
};

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      console.log("***** visibilityFilter reducer return prev state *****", state) // SHOW_ALL or SHOW_ACTIVE or SHOW_COMPLETED
      console.log("***** action.filter *****", action.filter)
      return action.filter;  // SHOW_ALL or SHOW_ACTIVE or SHOW_COMPLETED
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos,
  visibilityFilter
}); // 用于创建store
 */
// **************** actionCreator ****************
/* const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})


const setvisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})
 */
const middleware = applyMiddleware(logger)
// store 提到react最外层的render函数中
// const store = createStore(todoApp, middleware);
const { Component } = React;

/* const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) {
    return <span>{children}</span>  // 区分选中链接样式
  }
  return (
    <a href=''
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  )
} */

/* const mapStateToLinkProps = (
  state,
  ownProps // FilterLink自己的props,而不是传给子组件Link的props，传给子组件的是mapStateToLinkProps的返回值
) => ({
  active:
  ownProps.filter === state.visibilityFilter
})
const mapDispatchToLinkProps = (
  dispatch,
  ownProps
) => ({
  onClick() {
    dispatch(setvisibilityFilter(ownProps.filter));
  }
})

const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link); */

/* const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter='SHOW_ALL'
    >
      All
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_ACTIVE'

    >
      Active
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_COMPLETED'
    >
      Completed
    </FilterLink>
  </p>
)
 */
/* const Todo = ({
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
 */
/* const TodoList = ({
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
  ) */

// const AddTodo = (props, { store }) => {
// 不需要整个store，只需要其中的一部分 --- store

/* let nextTodoId = 0;
let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input ref={node => {
        input = node
      }} />
      <button onClick={() => {
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        Add Todo
      </button>
    </div>
  )
}
AddTodo = connect()(AddTodo) */

// ********** conect()(AddTodo)的原样 ************
// AddTodo = connect(
// state => {
//     return {}
//   },
//   dispatch => {
//     return {dispatch}
//   }
// )(AddTodo);


/* const getVisibleTodos = (
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
)(TodoList) */

const TodoApp = () => {
  return (
    <div>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
  )
};

ReactDOM.render(
  <Provider store={createStore(todoApp, middleware)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)


registerServiceWorker();