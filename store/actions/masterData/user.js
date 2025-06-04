import {
  GET_USERS_REQUESTED,
  GET_USER_REQUESTED,
  POST_USER_REQUESTED,
  DELETE_USER_REQUESTED,
  UPDATE_USER_REQUESTED,
  CLEAR_USER_STATE,
  UPDATE_USER_STATUS_REQUESTED
} from '@/store/constants'

/**
 * GET USERS
 *
 * @param {*} payload
 * @returns
 */
// eslint-disable-next-line no-unused-vars
export const getUsers = (payload) => ({
  type: GET_USERS_REQUESTED,
  payload: payload
})

/**
 * GET DETAIL USER
 *
 * @param {*} payload
 * @returns
 */
export const getUser = (id) => ({
  type: GET_USER_REQUESTED,
  payload: id
})

/**
 * POST USERS
 *
 * @param {*} payload
 * @returns
 */
export const postUser = (payload) => ({
  type: POST_USER_REQUESTED,
  payload: payload
})

/**
 * Delete User
 *
 * @param {*} id
 * @returns
 */
export const deleteUser = (id) => ({
  type: DELETE_USER_REQUESTED,
  payload: id
})

/**
 * Update User
 *
 * @param {*} payload
 * @param {*} id
 * @returns
 */
export const updateUser = (id, payload) => ({
  type: UPDATE_USER_REQUESTED,
  payload: {
    id: id,
    body: payload
  }
})

/**
 * Update User Status
 *
 * @param {*} payload
 * @param {*} id
 * @returns
 */
export const updateUserStatus = (payload) => ({
  type: UPDATE_USER_STATUS_REQUESTED,
  payload
})

/**
 * Clear User State
 *
 * @param {*} payload
 * @param {*} id
 * @returns
 */
export const clearUserState = () => ({
  type: CLEAR_USER_STATE,
  payload: {}
})
