import * as authenticationReducer from './authenticationReducer'
import * as modalReducer from './modalReducer'

// Master Data
import * as roleReducer from './users/roleReducer'
import * as userReducer from './users/userReducer'
import * as echelonReducer from './users/echelonReducer'

// Dashboard
import * as dashboardReducer from './dashboardReducer'

// Recap
import * as compositionReducer from './recap/compositionReducer'
import * as asnReducer from './recap/asnReducer'
import * as nonASNReducer from './recap/nonASNReducer'
import * as outsourceReducer from './recap/outsourceReducer'

// Emplyee
import * as employeeReducer from './employeeReducer'

// History
import * as positionReducer from './histories/positionReducer'
import * as gradeReducer from './histories/gradeReducer'
import * as recognitionReducer from './histories/recognitionReducer'
import * as trainingReducer from './histories/trainingReducer'
import * as targetReducer from './histories/targetReducer'
import * as performanceReducer from './histories/performanceReducer'
import * as disciplinaryReducer from './histories/disciplinaryReducer'

// Master Data
import * as decreeReducer from './masterData/decreeReducer'
import * as institutionReducer from './masterData/institutionReducer'
import * as employmentTypeReducer from './masterData/employmentTypeReducer'

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
  ...dashboardReducer,
  ...compositionReducer,
  ...asnReducer,
  ...nonASNReducer,
  ...outsourceReducer,
  ...userReducer,
  ...echelonReducer,
  ...employeeReducer,
  ...positionReducer,
  ...gradeReducer,
  ...recognitionReducer,
  ...decreeReducer,
  ...trainingReducer,
  ...targetReducer,
  ...performanceReducer,
  ...disciplinaryReducer,
  ...institutionReducer,
  ...employmentTypeReducer
}

export default reducers
