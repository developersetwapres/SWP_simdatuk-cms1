import {
  CLEAR_EMPLOYEES_RECAP,
  GET_EMPLOYEES_RECAP_REQUESTED
} from '../../constants'

/**
 * Get Employees Recapitulations
 *
 * @returns
 */
export const getEmployeesRecap = (payload) => ({
  type: GET_EMPLOYEES_RECAP_REQUESTED,
  payload
})

/**
 * Clear Employees Recapitulations
 *
 * @param {*} payload
 * @returns
 */
export const clearEmployeesRecap = () => ({
  type: CLEAR_EMPLOYEES_RECAP
})
