import React from 'react';
import ReactDOM from 'react-dom';
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
const store = createStore(todoApp, middleware);
const { Component } = React;

const FilterLink = ({
  filter,
  currentFilter,
  children,
  onClick
}) => {
  if (filter === currentFilter) {
    return <span>{children}</span>  // 区分选中链接样式
  }
  return (
    <a href=''
      onClick={e => {
        e.preventDefault();
        onClick(filter);
        console.log("***** now visibilityFilter return the next state *****", store.getState().visibilityFilter)
      }}
    >
      {children}
    </a>
  )
}

// dosen't defined any behavior but knows how to render
const Footer = ({
  visibilityFilter,
  onFilterClick
}) => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter='SHOW_ALL'
      currentFilter={visibilityFilter} // "SHOW_ALL" or "SHOW_ACTIVE" or "SHOW_COMPLETED"
      onClick={onFilterClick}
    >
      All
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_ACTIVE'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      Active
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_COMPLETED'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
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
    {todos.map(todo=>
      <Todo
        key={todo.id}
        {...todo} // completed and text will as props
        onClick={() => onTodoClick(todo.id)}
        />
    )}
  </ul>
)

const AddTodo = ({
  onAddClick
}) => {
  let input;
  return (
    <div>
      <input ref={node => {
        input = node 
      }} />
      <button onClick={() => {
        onAddClick(input.value)
        input.value = ''
      }}>
        Add Todo
      </button>
    </div>
  )
}

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
let nextTodoId = 0;



class TodoApp extends Component {
  render() {
    const { 
      todos, 
      visibilityFilter 
    } = this.props;
    const visibleTodos = getVisibleTodos(
      todos,
      visibilityFilter
    )
    return (
      <div>
        <AddTodo 
          onAddClick={text=>
            store.dispatch({
              type: 'ADD_TODO',
              id: nextTodoId++,
              text
            })
          }
        />
        <TodoList 
          todos={visibleTodos}
          onTodoClick={id=>
            store.dispatch({
              type: 'TOGGLE_TODO',
              id
            })
          }
        />
        <Footer 
          visibilityFilter={visibilityFilter}
          onFilterClick={filter=>{
            store.dispatch({
              type: 'SET_VISIBILITY_FILTER',
              filter
            })
          }}
        />
      </div>
    )
  };
}

// See Section 8 for earlier `render()` example
const render = () => {
  ReactDOM.render(
    // Render the TodoApp Component to the <div> with id 'root'
    <TodoApp
      {...store.getState() } // this.props: {todos:Array(n), visibilityFilter: "filter"}
    />,
    document.getElementById('root')

  )
};

store.subscribe(render);
render();
registerServiceWorker();