import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'
import logger from "redux-logger"
import registerServiceWorker from './registerServiceWorker';

const middleware = applyMiddleware(logger)
let store = createStore(todoApp, middleware)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();