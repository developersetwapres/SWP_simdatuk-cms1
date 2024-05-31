import * as authenticationAction from './authentication'
import * as user from './users/user'
import * as role from './users/role'
import * as employee from './employee'
import * as responser from './responser'

/**
 *
 * Root Actions
 *
 */
const actions = {
  ...authenticationAction,
  ...user,
  ...role,
  ...responser,
  ...employee
}

export default actions
