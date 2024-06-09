import { get, del, post } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

const basePath = '/position-histories'

/**
 * GET POSITIONS OPTIONS ACTION
 *
 * @param {*} payload
 * @returns
 */
export const getPositionsOptionsAction = (payload) => {
  const { page, limit, search } = payload
  return get(`/positions${queryParams(page, limit, search)}`)
}

/**
 * GET POSITIONS ACTION
 *
 * @param {*} payload
 * @returns
 */
export const getPositionsAction = (payload) => {
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
export const getPositionAction = (id) => {
  return get(`${basePath}/${id}`)
}

/**
 * Delete Position action
 *
 * @param {*} id
 * @returns
 */
export const deletePositionAction = (id) => {
  return del(`${basePath}/${id}`)
}

/**
 * Post Position action
 *
 * @param {*} payload
 * @returns
 */
export const postPositionAction = (payload) => {
  return post(`${basePath}`, payload)
}

/**
 * Update Position
 *
 * @param {*} payload
 * @returns
 */
export const updatePositionAction = (payload) => {
  return post(`${basePath}/${payload?.id}`, payload?.data)
}
