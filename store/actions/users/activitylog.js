import {
  GET_ACTIVITY_LOGS_REQUESTED
} from '@/store/constants'

/**
 * Get Activity Logs 
 * 
 * @param {*} payload 
 * @returns
 */
export const getActivityLogs = (payload) => ({
  type: GET_ACTIVITY_LOGS_REQUESTED,
  payload: payload
})