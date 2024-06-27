import * as authenticationAction from './authentication'
import * as responser from './responser'

// Master Data
import * as decree from './masterData/decree'
import * as residence from './masterData/residence'
import * as user from './masterData/user'
import * as role from './masterData/role'
import * as echelon from './masterData/echelon'
import * as institution from './masterData/institution'
import * as employmentType from './masterData/employmentType'
import * as position from './masterData/position'

// Dashboard
import * as dashboard from './dashboard'

// Recap
import * as recapComposition from './recap/composition'
import * as recapASN from './recap/asn'
import * as recapNonASN from './recap/non_asn'
import * as recapOutsource from './recap/outsource'

// Employee
import * as employee from './employee'

// History
import * as positionHistories from './histories/position'
import * as grade from './histories/grade'
import * as recognition from './histories/recognition'
import * as training from './histories/training'
import * as target from './histories/target'
import * as performance from './histories/performance'
import * as disciplinary from './histories/disciplinary'

// Export
import * as exportDRH from './export/exportDRH'
import * as exportRecap from './export/exportRecap'
import * as exportEmployee from './export/exportEmployee'

/**
 *
 * Root Actions
 *
 */
const actions = {
  ...authenticationAction,
  ...responser,
  ...user,
  ...role,
  ...recapComposition,
  ...recapASN,
  ...recapNonASN,
  ...recapOutsource,
  ...echelon,
  ...employee,
  ...dashboard,
  ...positionHistories,
  ...grade,
  ...recognition,
  ...decree,
  ...training,
  ...target,
  ...performance,
  ...disciplinary,
  ...institution,
  ...employmentType,
  ...residence,
  ...exportDRH,
  ...exportEmployee,
  ...exportRecap,
  ...position
}

export default actions
