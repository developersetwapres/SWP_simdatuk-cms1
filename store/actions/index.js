import * as authenticationAction from './authentication'
import * as responser from './responser'

// Master Data
import * as user from './users/user'
import * as role from './users/role'
import * as echelon from './users/echelon'

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
import * as position from './histories/position'
import * as grade from './histories/grade'
import * as recognition from './histories/recognition'
import * as training from './histories/training'
import * as target from './histories/target'
import * as performance from './histories/performance'
import * as disciplinary from './histories/disciplinary'

// Master Data
import * as decree from './masterData/decree'
import * as institution from './masterData/institution'
import * as employmentType from './masterData/employmentType'

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
  ...position,
  ...grade,
  ...recognition,
  ...decree,
  ...training,
  ...target,
  ...performance,
  ...disciplinary,
  ...institution,
  ...employmentType
}

export default actions
