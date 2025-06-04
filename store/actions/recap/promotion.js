import {
  GET_UNOCCUPIED_POSITIONS_REQUESTED,
  GET_UNOCCUPIED_POSITIONS_DETAILS_REQUESTED,
  GET_BRIEF_USERS_REQUESTED,
  GET_COMPARE_USERS_REQUESTED,
  GET_PROMOTION_USERS_REQUESTED
} from '../../constants'

/**
 * Get Unoccupied Positions
 *
 * @returns
 */
export const getUnoccupiedPositions = () => ({
  type: GET_UNOCCUPIED_POSITIONS_REQUESTED
})

/**
 * Get Detail of Unoccupied Positions
 *
 * @param {*} payload
 * @returns
 */
export const getUnoccupiedPositionsDetail = (payload) => ({
  type: GET_UNOCCUPIED_POSITIONS_DETAILS_REQUESTED,
  payload
})

/**
 * Get Brief List of Employees
 *
 * @param {*} payload
 * @returns
 */
export const getBriefEmployees = (payload) => ({
  type: GET_BRIEF_USERS_REQUESTED,
  payload
})

/**
 * Get Detail List of Compare Employees
 *
 * @param {*} payload
 * @returns
 */
export const getEmployeesCompare = (payload) => ({
  type: GET_COMPARE_USERS_REQUESTED,
  payload
})

/**
 * Get Detail List of Promotion Employees
 *
 * @param {*} payload
 * @returns
 */
export const getEmployeesPromotion = (payload) => ({
  type: GET_PROMOTION_USERS_REQUESTED,
  payload
})