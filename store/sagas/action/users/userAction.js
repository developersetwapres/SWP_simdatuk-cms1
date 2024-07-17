import { get, post, del, put } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

/**
 *
 * GET USERS
 *
 * @param {*} payload
 * @returns
 */
export const getUsersAction = (payload) => {
  const { page, limit, search } = payload

  return get(`/users${queryParams(page, limit, search)}`)
}

/**
 * GET DETAIL USER
 *
 * @param {*} id
 * @returns
 */
export const getUserAction = (id) => {
  return get(`/users/${id}`)
}

/**
 *
 * POST User
 *
 * @param {*} payload
 * @returns
 */
export const postUserAction = (payload) => {
  return post(`/users`, payload)
}

/**
 * Delete User
 *
 * @param {*} id
 * @returns
 */
export const deleteUserAction = (id) => {
  return del(`/users/${id}`)
}

/**
 * Update User
 *
 * @param {*} id
 * @param {*} body
 * @returns
 */
export const updateUserAction = (payload) => {
  return post(`/users/${payload.id}`, payload.body)
}

/**
 * Update User Status
 *
 * @param {*} id
 * @param {*} body
 * @returns
 */
export const updateUserStatusAction = (payload) => {
  return put(`/users/status`, payload)
}
