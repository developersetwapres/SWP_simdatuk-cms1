import { get, del, post } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

const basePath = '/positions'

/**
 * GET POSITIONS ORDERS ACTION
 *
 * @param {*} payload
 * @returns
 */
export const getPositionsOrdersAction = (payload) => {
  const { id } = payload
  const moreParams = `?id=${id}`
  return get(`${basePath}/available-order${moreParams}`)
}

/**
 * GET POSITIONS ACTION
 *
 * @param {*} payload
 * @returns
 */
export const getPositionsAction = (payload) => {
  const { page, limit, search, filterParent, parentId } = payload
  const moreParams = `&filter_parent=${filterParent}&parent_id=${parentId}`
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
