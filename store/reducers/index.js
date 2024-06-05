import * as authenticationReducer from './authenticationReducer'
import * as modalReducer from './modalReducer'

// Master Data
import * as roleReducer from './users/roleReducer'
import * as userReducer from './users/userReducer'
import * as echelonReducer from './users/echelonReducer'

// Emplyee
import * as employeeReducer from './employeeReducer'

// History
import * as positionReducer from './histories/positionReducer'
import * as gradeReducer from './histories/gradeReducer'

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
  ...employeeReducer,
  ...positionReducer,
  ...gradeReducer
}

export default reducers
