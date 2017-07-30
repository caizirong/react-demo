import { combineReducers } from 'redux';
import todos, * as fromTodos from './todos';

const todoApp = combineReducers({
  todos,
});

export default todoApp;

export const getVisibleTodos = (state, filter) => 
  fromTodos.getVisibleTodos(state.todos, filter)

// 为什么这里需要return ?
// fromTodos.getVisibleTodos不是已经return了吗
/* 
  const b=(b) => {
    return 2;
  }

  const c = (c) => {
    console.log(b())  -------> 2

  }
  console.log(c())    -------> undefined

  const d = (d) => {
    return b()        -------> 这里执行b(),会返回2，但是要让外部函数d执行时返回2，需要加return.如果没有return，函数d相当于 const d = (d) => {2} ,执行d()将返回undefined,而如果去掉大括号（默认返回），const d = (d) => 2, 执行d(),得到2
  }
  console.log(d())    -------> 2

  定义一个函数，内部调用了另一个有返回值的函数，要让这个函数有返回值，在内部调用的函数也需要再一次return

*/