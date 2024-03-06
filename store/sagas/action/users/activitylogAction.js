import { get } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

/**
 * 
 * GET ACTIVITY LOG ACTION
 * 
 * @param {*} payload 
 * @returns 
 */
export const getActivitylogAction = (payload) => {
  const { page, limit, sortBy, sortDesc, search } = payload
  const moreParams = `&role=${payload.role}&start_date=${payload.startDate}&end_date=${payload.endDate}`
  return get(`/acl${queryParams(page, limit, sortBy, sortDesc, search)}${moreParams}`)
}