import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux'
import { logger } from 'redux-logger'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import registerServiceWorker from './registerServiceWorker';

// ***** state *****
// state === {[todos: Array(n)], visibilityFilter: "action.filter"}

// ******* reducer *******
const todo = (state, action) => {
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

// const { createStore } = Redux;
const middleware = applyMiddleware(logger)
// store 提到react最外层的render函数中
// const store = createStore(todoApp, middleware);
const { Component } = React;

const Link = ({
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
        {/* console.log("***** now visibilityFilter return the next state *****", store.getState().visibilityFilter) */ }
      }}
    >
      {children}
    </a>
  )
}

const mapStateToLinkProps = (
  state,
  ownProps // FilterLink自己的props,而不是传给子组件Link的props，传给子组件的是mapStateToLinkProps的返回值
) => {
  return {
    active:
      ownProps.filter === state.visibilityFilter
  }
}
const mapDispatchToLinkProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      });
    }
  }
}

const FilterLink = connect (
  mapDispatchToLinkProps,
  mapDispatchToLinkProps
)(Link);
// class FilterLink extends Component {
//   componentDidMount() {
//     const { store } = this.context
//     this.unsubscribe = store.subscribe(() =>
//       this.forceUpdate()
//     );
//   }

//   // Since the subscription happens in `componentDidMount`,
//   // it's important to unsubscribe in `componentWillUnmount`.
//   componentWillUnmount() {
//     this.unsubscribe(); // return value of `store.subscribe()`
//   }
//   render() {
//     const props = this.props;
//     const { store } = this.context;
//     // this just reads the store, is not listening
//     // for change messages from the store updating
//     const state = store.getState();

//     return (
//       <Link
//         active={
//           props.filter ===
//           state.visibilityFilter
//         }
//         onClick={() =>
//           store.dispatch({
//             type: 'SET_VISIBILITY_FILTER',
//             filter: props.filter
//           })
//         }
//       >
//         {props.children}
//       </Link>
//     )
//   }
// }
// FilterLink.contextTypes = {
//   store: React.PropTypes.object
// }

// dosen't defined any behavior but knows how to render
const Footer = () => (
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

// const AddTodo = (props, { store }) => {
// 不需要整个store，只需要其中的一部分 --- store
let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input ref={node => {
        input = node
      }} />
      <button onClick={() => {
        dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text: input.value
        })
        input.value = ''
      }}>
        Add Todo
      </button>
    </div>
  )
}
// ********** conect()(AddTodo)的原样 ************
// AddTodo = connect(
// state => {
//     return {}
//   },
//   dispatch => {
//     return {dispatch}
//   }
// )(AddTodo);

AddTodo = connect ()(AddTodo)

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
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  }
}
// maps the store's dispatch() method of and returns the props that use the dispatch method to dispatch actions. So it returns the callback props needed by the presentational component. 
const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch({
        type: 'TOGGLE_TODO',
        id
      })
    }
  }
}

// The result of the connect call is the container component that is going to render the presentational component. It will calculate the props to pass to the presentational component by merging the objects returned from mapStateToProps, mapDispatchToProps, and its own props
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

/* class VisibleTodoList extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();
    return (
      <TodoList
        todos={
          getVisibleTodos(
            state.todos,
            state.visibilityFilter
          )
        }
        onTodoClick={id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
      />
    )
  }
}
VisibleTodoList.contextTypes = {
  store: React.PropTypes.object
} */

let nextTodoId = 0;

const TodoApp = () => {
  return (
    <div>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
  )
};

// See Section 8 for earlier `render()` example
ReactDOM.render(
  // Render the TodoApp Component to the <div> with id 'root'
  <Provider store={createStore(todoApp, middleware)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')

)


registerServiceWorker();