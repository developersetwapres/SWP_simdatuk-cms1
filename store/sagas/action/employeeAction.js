import { get, del, post, patch } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

const basePath = '/employees'

/**
 * GET BANNERS ACTION
 *
 * @param {*} payload
 * @returns
 */
export const getEmployeesAction = (payload) => {
  const { page, limit, search } = payload
  return get(`${basePath}${queryParams(page, limit, search)}`)
}

/**
 * Get Employee detail
 *
 * @param {*} id
 * @returns
 */
export const getEmployeeAction = (id) => {
  return get(`${basePath}/${id}`)
}

/**
 * Delete Employee action
 *
 * @param {*} id
 * @returns
 */
export const deleteEmployeeAction = (id) => {
  return del(`${basePath}/${id}`)
}

/**
 * Post Employee action
 *
 * @param {*} payload
 * @returns
 */
export const postEmployeeAction = (payload) => {
  return post(`${basePath}`, payload)
}

/**
 * Update Employee
 *
 * @param {*} payload
 * @returns
 */
export const updateEmployeeAction = (payload) => {
  return patch(`${basePath}`, payload)
}
