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
export default visibilityFilter