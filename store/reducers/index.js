import * as authenticationReducer from './authenticationReducer'
import * as modalReducer from './modalReducer'

// Master Data
import * as decreeReducer from './masterData/decreeReducer'
import * as residenceReducer from './masterData/residenceReducer'
import * as roleReducer from './masterData/roleReducer'
import * as userReducer from './masterData/userReducer'
import * as echelonReducer from './masterData/echelonReducer'
import * as institutionReducer from './masterData/institutionReducer'
import * as employmentTypeReducer from './masterData/employmentTypeReducer'

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

// * Reducer
import * as responserReducer from './responserReducer'

// * Reducer
import * as exportDRHReducer from './export/exportDRHReducer'

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
  ...employmentTypeReducer,
  ...residenceReducer,
  ...exportDRHReducer
}

export default reducers
