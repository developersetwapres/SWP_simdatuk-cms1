import * as authenticationAction from './authentication'
import * as responser from './responser'

// Master Data
import * as user from './users/user'
import * as role from './users/role'
import * as echelon from './users/echelon'

// Employee
import * as employee from './employee'

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
  ...employee
}

export default actions
