import * as roleReducer from './users/roleReducer'
import * as userReducer from './users/userReducer'
import * as authenticationReducer from './authenticationReducer'
import * as modalReducer from './modalReducer'
import * as employeeReducer from './employeeReducer'

// * Reducer
import * as responserReducer from './responserReducer'
/**
 *
 * Root Reducers
 *
 */
const reducers = {
  ...roleReducer,
  ...userReducer,
  ...authenticationReducer,
  ...modalReducer,
  ...responserReducer,
  ...employeeReducer
}

export default reducers
