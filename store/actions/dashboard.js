import { SUMMARIES_REQUESTED } from '../constants'

/**
 * Summaries Reqeusted
 * 
 * @param {*} payload
 * @returns
 */
export const getSummaries = payload => ({
  type: SUMMARIES_REQUESTED,
  payload
})