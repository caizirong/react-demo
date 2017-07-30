// let nextTodoId = 0;
import {v4} from 'node-uuid'  // *** generate unique id ***

import * as api from '../api'

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response
})

export const fetchTodos = (filter) => 
  // 这里不要加大括号
  api.fetchTodos(filter).then(response => 
    // 这里也是不加大括号
    receiveTodos(filter, response)
  )

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  // id: (nextTodoId++).toString(),
  id: v4(),
  text
})
export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})


// export const setvisibilityFilter = (filter) => ({
//   type: 'SET_VISIBILITY_FILTER',
//   filter
// })
