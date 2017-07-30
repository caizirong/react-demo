import { createStore, applyMiddleware } from 'redux'
import promise from 'redux-promise'
import {createLogger} from 'redux-logger'
import todoApp from './reducers/index'

/* const logger = (store) => (next) => {
  if (!console.group) {
    return next
  }
  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = next(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  }
} */


// ******************* 柯里化 ********************
// const promise = (store) => {
//   // const next = store.dispatch;
//   return (next) => {
//     return (action) => {
//       if (typeof action.then === 'function') {
//         return action.then(next);
//       }
//       return next(action);
//     };
//   }
// };
/* const promise = (store) => (next) => (action) => {
  if (typeof action.then === 'function') {
    return action.then(next);
  }
  return next(action);
};
 */

// const wrapDispatchWithMiddlewares = (store, middlewares) => {
//   middlewares.slice().reverse().forEach(middlewares =>
//     store.dispatch = middlewares(store)
//   )
// }

// **** for convent test ****
const configureStore = () => {
  // const persistedState = loadState()
  const middlewares = [promise];
  
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }
  
  // middlewares.push(promise)
  
  return createStore(todoApp,applyMiddleware(...middlewares))
  // **** 这里不用applyMiddleware(promise, createLogger()) ****
  // 是因为我们想有选择性地传入creatLogger()
  // wrapDispatchWithMiddlewares(store, middlewares)
}

export default configureStore