import { get, post, del } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

const basePath = '/echelons'

/**
 *
 * GET ECHELONS
 *
 * @param {*} payload
 * @returns
 */
export const getEchelonsAction = (payload) => {
  const { page, limit, search } = payload
  return get(`${basePath}${queryParams(page, limit, search)}`)
}

/**
 * GET DETAIL ECHELON
 *
 * @param {*} id
 * @returns
 */
export const getEchelonAction = (id) => {
  return get(`${basePath}/${id}`)
}

/**
 *
 * POST ECHELON
 *
 * @param {*} payload
 * @returns
 */
export const postEchelonAction = (payload) => {
  return post(`${basePath}`, payload)
}

/**
 * Delete ECHELON
 *
 * @param {*} id
 * @returns
 */
export const deleteEchelonAction = (id) => {
  return del(`${basePath}/${id}`)
}

/**
 * Update ECHELON
 *
 * @param {*} id
 * @param {*} body
 * @returns
 */
export const updateEchelonAction = (payload) => {
  return post(`${basePath}/${payload.id}`, payload.body)
}
