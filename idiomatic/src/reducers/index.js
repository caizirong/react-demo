// in this reducer, state will be todos
// but in ./components/VisibleTodoList ,state will be todos+filter
import { combineReducers } from 'redux'
import byId, * as fromById from './byId'
import createList, * as fromList from './createList'

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed')
})

// **** 可以用许多次的combineReducers *****
// 并且可以在不同的地方进行
const todos = combineReducers({
  byId,
  listByFilter,
});


export const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter])
  return ids.map(id => fromById.getTodo(state.byId, id))
};

export default todos
