import * as authenticationReducer from './authenticationReducer'
import * as modalReducer from './modalReducer'

// Master Data
import * as roleReducer from './users/roleReducer'
import * as userReducer from './users/userReducer'
import * as echelonReducer from './users/echelonReducer'

// Employee
import * as employeeReducer from './employeeReducer'

// * Reducer
import * as responserReducer from './responserReducer'

/**
 *
 * Root Reducers
 *
 */
const reducers = {
  ...authenticationReducer,
  ...modalReducer,
  ...responserReducer,
  ...roleReducer,
  ...userReducer,
  ...echelonReducer,
  ...employeeReducer
}

export default reducers
