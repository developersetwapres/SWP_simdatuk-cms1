import {
  GET_ROLES_REQUESTED,
  GET_ROLE_REQUESTED,
  POST_ROLE_REQUESTED,
  UPDATE_ROLE_REQUESTED,
  DELETE_ROLE_REQUESTED,
  GET_PERMISSIONS_REQUESTED,
  CLEAR_ROLE_STATE,
  GET_ROLES_OPTIONS_REQUESTED
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
  type: GET_ROLE_REQUESTED,
  payload: id
})

/**
 * Get Roles Options
 *
 * @param {*} payload
 * @returns
 */
export const getRolesOptions = (payload) => ({
  type: GET_ROLES_OPTIONS_REQUESTED,
  payload: payload
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
export const deleteRole = (payload) => ({
  type: DELETE_ROLE_REQUESTED,
  payload
})

/**
 * Get Permissions
 *
 * @param {*} payload
 * @returns
 */
export const getPermissions = () => ({
  type: GET_PERMISSIONS_REQUESTED
})

/**
 * Clear State
 *
 * @returns
 */
export const clearRoleState = () => ({
  type: CLEAR_ROLE_STATE
})
