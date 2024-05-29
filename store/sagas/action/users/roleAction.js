import { get, post, patch, del } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

const basePath = '/roles'

/**
 * Get Roles
 *
 * @param {*} payload
 * @returns
 */
export const getRolesAction = (payload) => {
  const { page, limit, search } = payload
  return get(`${basePath}${queryParams(page, limit, search)}`)
}

/**
 * Get Detail
 *
 * @param {*} id
 * @returns
 */
export const getDetailRoleAction = (id) => {
  return get(`${basePath}/${id}`)
}

/**
 * Post Role
 *
 * @param {*} payload
 * @returns
 */
export const postRoleAction = (payload) => {
  return post(`${basePath}`, payload)
}

/**
 * update role
 *
 * @param {*} payload
 * @returns
 */
export const updateRoleAction = (payload) => {
  return patch(`${basePath}`, payload)
}

/**
 * Delete Role
 *
 * @param {*} id
 * @returns
 */
export const deleteRoleAction = (id) => {
  return del(`${basePath}/${id}`)
}

/**
 * Delete role list
 *
 * @param {*} id
 * @returns
 */
export const deleteRoleListAction = (id) => {
  return del(`${basePath}/${id}`)
}
