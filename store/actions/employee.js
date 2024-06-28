import {
  GET_EMPLOYEES_REQUESTED,
  GET_EMPLOYEE_REQUESTED,
  POST_EMPLOYEE_REQUESTED,
  UPDATE_EMPLOYEE_REQUESTED,
  DELETE_EMPLOYEE_REQUESTED,
  CLEAR_EMPLOYEE_STATE,
  UPDATE_EMPLOYEE_STATUS_REQUESTED
} from '../constants'

/**
 * Get Employees
 *
 * @param {*} payload
 * @returns
 */
export const getEmployees = (payload) => ({
  type: GET_EMPLOYEES_REQUESTED,
  payload
})

/**
 * Get Employee
 *
 * @param {*} payload
 * @returns
 */
export const getEmployee = (payload) => ({
  type: GET_EMPLOYEE_REQUESTED,
  payload
})

/**
 * Delete Employee
 *
 * @param {*} id
 * @returns
 */
export const deleteEmployee = (id) => ({
  type: DELETE_EMPLOYEE_REQUESTED,
  payload: id
})

/**
 * Post Employee
 *
 * @param {*} payload
 * @returns
 */
export const postEmployee = (payload) => ({
  type: POST_EMPLOYEE_REQUESTED,
  payload
})

/**
 * Update Employee
 *
 * @param {*} payload
 * @returns
 */
export const updateEmployee = (payload) => ({
  type: UPDATE_EMPLOYEE_REQUESTED,
  payload
})

/**
 * Update Employee Status
 *
 * @param {*} payload
 * @returns
 */
export const updateEmployeeStatus = (payload) => ({
  type: UPDATE_EMPLOYEE_STATUS_REQUESTED,
  payload
})

/**
 * Clear Employee State
 *
 * @param {*} id
 * @returns
 */
export const clearEmployeeState = () => ({
  type: CLEAR_EMPLOYEE_STATE
})
