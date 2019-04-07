import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import App from 'containers/App'
import { BrowserRouter } from 'react-router-dom'
import './bootstrap.min.css'
import 'containers/app.css'
import combineReducers from 'modules'

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 })

const store = createStore(combineReducers, composeEnhancers(
  applyMiddleware(thunk)
))

export default store

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
