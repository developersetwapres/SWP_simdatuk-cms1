import * as authenticationAction from './authentication'
import * as responser from './responser'

// Master Data
import * as user from './users/user'
import * as role from './users/role'
import * as echelon from './users/echelon'

// Employee
import * as employee from './employee'

// History
import * as position from './histories/position'
import * as grade from './histories/grade'
import * as recognition from './histories/recognition'
import * as training from './histories/training'
import * as target from './histories/target'
import * as performance from './histories/performance'

// Master Data
import * as decree from './masterData/decree'

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
  ...echelon,
  ...employee,
  ...position,
  ...grade,
  ...recognition,
  ...decree,
  ...training,
  ...target,
  ...performance
}

export default actions
