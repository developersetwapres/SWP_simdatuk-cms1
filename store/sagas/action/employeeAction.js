import { get, del, post } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

const basePath = '/employees'

/**
 * GET BANNERS ACTION
 *
 * @param {*} payload
 * @returns
 */
export const getEmployeesAction = (payload) => {
  const { page, limit, search, type } = payload
  const moreParams = type ? `&type=${type}` : ''
  return get(`${basePath}${queryParams(page, limit, search)}${moreParams}`)
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
  return post(`${basePath}`, payload)
}
