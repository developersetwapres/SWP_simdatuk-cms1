import { get, del, post } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

const basePath = '/position-histories'

/**
 * GET POSITIONS ACTION
 *
 * @param {*} payload
 * @returns
 */
export const getPositionsHistoriesAction = (payload) => {
  const { page, limit, search, type } = payload
  const moreParams = type ? `&type=${type}` : ''
  return get(`${basePath}${queryParams(page, limit, search)}${moreParams}`)
}

/**
 * Get Position detail
 *
 * @param {*} id
 * @returns
 */
export const getPositionHistoriesAction = (id) => {
  return get(`${basePath}/${id}`)
}

/**
 * Delete Position action
 *
 * @param {*} id
 * @returns
 */
export const deletePositionHistoriesAction = (id) => {
  return del(`${basePath}/${id}`)
}

/**
 * Post Position action
 *
 * @param {*} payload
 * @returns
 */
export const postPositionHistoriesAction = (payload) => {
  return post(`${basePath}`, payload)
}

/**
 * Update Position
 *
 * @param {*} payload
 * @returns
 */
export const updatePositionHistoriesAction = (payload) => {
  return post(`${basePath}/${payload?.id}`, payload?.data)
}
