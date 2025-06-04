import { get, del, post } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

const basePath = '/employment-types'

/**
 * GET Employment Types ACTION
 *
 * @param {*} payload
 * @returns
 */
export const getEmploymentTypesAction = (payload) => {
  const { page, limit, search, type } = payload
  const moreParams = `&type=${type}`
  return get(`${basePath}${queryParams(page, limit, search)}${moreParams}`)
}

/**
 * Get Employment Type detail
 *
 * @param {*} id
 * @returns
 */
export const getEmploymentTypeAction = (id) => {
  return get(`${basePath}/${id}`)
}

/**
 * Delete Employment Type action
 *
 * @param {*} id
 * @returns
 */
export const deleteEmploymentTypeAction = (id) => {
  return del(`${basePath}/${id}`)
}

/**
 * Post Employment Type action
 *
 * @param {*} payload
 * @returns
 */
export const postEmploymentTypeAction = (payload) => {
  return post(`${basePath}`, payload)
}

/**
 * Update Employment Type
 *
 * @param {*} payload
 * @returns
 */
export const updateEmploymentTypeAction = (payload) => {
  return post(`${basePath}/${payload?.id}`, payload?.data)
}
