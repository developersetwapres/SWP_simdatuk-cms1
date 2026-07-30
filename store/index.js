import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import createSagaMiddleware from 'redux-saga'

// * Reducers
import reducers from './reducers'
// * Actions
import actions from './actions'
// * rootSaga
import rootSaga from './sagas'

const sagasMiddleware = createSagaMiddleware()

// * Map State to Props
export function mapStateToProps(...keys) {
  return (state) =>
    keys.reduce((res, key) => {
      res[key] = state[key]
      return res
    }, {})
}

// * Map Actions Redux
export function mapActions(...keys) {
  // eslint-disable-next-line array-callback-return
  return (dispatch) =>
    keys.reduce((res, key) => {
      if (typeof actions[key] === 'function') {
        res[key] = (...args) => dispatch(actions[key](...args))
        return res
      }
    }, {})
}

/**
 *
 * Bind Middleware
 *
 * @param {...any} Middleware
 * @returns
 */
const bindMiddleware = (...middleware) => {
  if (process.NODE_ENV === 'production') {
    return applyMiddleware(...middleware)
  }

  return composeWithDevTools(applyMiddleware(...middleware))
}

/**
 *
 * Initialize Store Redux
 *
 * @param {*} initialState
 * @returns
 */
export function initializeStore(initialState = {}) {
  // * Combine All Reducers
  const reducer = combineReducers({ ...reducers })

  // * Create Store Redux
  const store = createStore(
    reducer,
    initialState,
    bindMiddleware(sagasMiddleware)
  )

  // * Run Redux Saga
  sagasMiddleware.run(rootSaga)

  return store
}
