const byId = (state = {}, action) => {
  switch (action.type) {
/*     case 'ADD_TODO':
    case 'TOGGLE_TODO':
      return {
        ...state,
        [action.id]: todo(state[action.id], action),
        // 当ADD_TODO 时，todo(undefined, action)
        // 当TOGGLE_TODO时， todo(state[action.id], action)
      }; */
      case 'RECEIVE_TODOS':
        const nextState = {...state};
        action.response.forEach(todo => {
          nextState[todo.id] = todo
        })
        return nextState  
    default:
      return state;
  }
};

export default byId;

export const getTodo = (state, id) => state[id]