import { get } from '@/utils/interceptors'

/**
 * Get Profile
 *
 * @param {*} payload
 * @returns
 */
export const getSummariesAction = payload => {
  return get(`/summaries?month=${payload?.month}`)
}