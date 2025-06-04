import { get, del, post } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

const basePath = '/performance-histories'

/**
 * GET Performances ACTION
 *
 * @param {*} payload
 * @returns
 */
export const getPerformancesAction = (payload) => {
  const { page, limit, search, type } = payload
  const moreParams = type ? `&type=${type}` : ''
  return get(`${basePath}${queryParams(page, limit, search)}${moreParams}`)
}

/**
 * Get Performance detail
 *
 * @param {*} id
 * @returns
 */
export const getPerformanceAction = (id) => {
  return get(`${basePath}/${id}`)
}

/**
 * Delete Performance action
 *
 * @param {*} id
 * @returns
 */
export const deletePerformanceAction = (id) => {
  return del(`${basePath}/${id}`)
}

/**
 * Post Performance action
 *
 * @param {*} payload
 * @returns
 */
export const postPerformanceAction = (payload) => {
  return post(`${basePath}`, payload)
}

/**
 * Update Performance
 *
 * @param {*} payload
 * @returns
 */
export const updatePerformanceAction = (payload) => {
  return post(`${basePath}/${payload?.id}`, payload?.data)
}
