/* eslint-disable no-unused-vars */
import { get, del, post, put, patch, getBlob } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

const basePath = '/employees'

/**
 * Get Employees Action
 *
 * @param {*} payload
 * @returns
 */
export const getEmployeesAction = (payload) => {
  const paramsExclude = ['page', 'limit', 'search']
  const { page, limit, search } = payload
  const moreParams = Object.fromEntries(
    Object.entries(payload).filter(([key, value]) => {
      return !paramsExclude.includes(key)
    })
  )
  const queryString = '&' + new URLSearchParams(moreParams).toString()

  return get(`${basePath}${queryParams(page, limit, search)}${queryString}`)
}

/**
 * Get Employee Action
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
  const { id, data } = payload
  return post(`${basePath}/${id}`, data)
}

/**
 * Update Employee Status
 *
 * @param {*} payload
 * @returns
 */
export const updateEmployeeStatusAction = (payload) => {
  return put(`${basePath}/status`, payload)
}

/**
 * Synchronize Employees Data
 *
 * @returns
 */
export const synchronizeEmployeesAction = () => {
  return patch('/employees/synchronization')
}

/**
 * Download Template of Employees
 *
 * @returns
 */
export const downloadTemplateAction = (type) => {
  return getBlob(`/employees/import/download-template/${type}`)
}

/**
 * Upload Template of Employees
 *
 * @returns
 */
export const uploadTemplateAction = (payload) => {
  return post('/employees/import', payload)
}
