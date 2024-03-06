import {
  DASHBOARD_USER_REQUESTED
} from '../constants'

/**
 * 
 * Get User
 * 
 * @param {*} payload 
 * @returns
 */
export const getDashboardUser = (payload) => ({
  type: DASHBOARD_USER_REQUESTED,
  payload: payload
})