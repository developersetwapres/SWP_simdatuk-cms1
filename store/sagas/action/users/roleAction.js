import { get, post, del } from '@/utils/interceptors'
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
export const getRoleAction = (id) => {
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
  return post(`${basePath}/${payload?.id}`, payload?.data)
}

/**
 * Delete Role
 *
 * @param {*} id
 * @returns
 */
export const deleteRoleAction = (payload) => {
  return del(`${basePath}/${payload?.id}`, payload.data)
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

/**
 * Get Permissions
 *
 * @returns
 */
export const getPermissionsAction = () => {
  return get('/permissions')
}
