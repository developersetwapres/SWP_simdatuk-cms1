import { get, del, post } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

const basePath = '/target-histories'

/**
 * GET Targets ACTION
 *
 * @param {*} payload
 * @returns
 */
export const getTargetsAction = (payload) => {
  const { page, limit, search, type } = payload
  const moreParams = type ? `&type=${type}` : ''
  return get(`${basePath}${queryParams(page, limit, search)}${moreParams}`)
}

/**
 * Get Target detail
 *
 * @param {*} id
 * @returns
 */
export const getTargetAction = (id) => {
  return get(`${basePath}/${id}`)
}

/**
 * Delete Target action
 *
 * @param {*} id
 * @returns
 */
export const deleteTargetAction = (id) => {
  return del(`${basePath}/${id}`)
}

/**
 * Post Target action
 *
 * @param {*} payload
 * @returns
 */
export const postTargetAction = (payload) => {
  return post(`${basePath}`, payload)
}

/**
 * Update Target
 *
 * @param {*} payload
 * @returns
 */
export const updateTargetAction = (payload) => {
  return post(`${basePath}/${payload?.id}`, payload?.data)
}
