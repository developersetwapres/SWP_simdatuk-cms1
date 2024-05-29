import {
  GET_ROLES_REQUESTED,
  GET_DETAIL_ROLE_REQUESTED,
  POST_ROLE_REQUESTED,
  UPDATE_ROLE_REQUESTED,
  DELETE_ROLE_REQUESTED
} from '@/store/constants'

/**
 * Get ROles
 *
 * @param {*} payload
 * @returns
 */
export const getRoles = (payload) => ({
  type: GET_ROLES_REQUESTED,
  payload: payload
})

/**
 * Get detail Role
 *
 * @param {*} id
 * @returns
 */
export const getRole = (id) => ({
  type: GET_DETAIL_ROLE_REQUESTED,
  payload: id
})

/**
 * Post Role
 *
 * @param {*} payload
 * @returns
 */
export const postRole = (payload) => ({
  type: POST_ROLE_REQUESTED,
  payload: payload
})

/**
 * Update ROle
 *
 * @param {*} payload
 * @returns
 */
export const updateRole = (payload) => ({
  type: UPDATE_ROLE_REQUESTED,
  payload: payload
})

/**
 * Delete rOLE
 *
 * @param {*} id
 * @returns
 *
 */
export const deleteRole = (id) => ({
  type: DELETE_ROLE_REQUESTED,
  payload: id
})
