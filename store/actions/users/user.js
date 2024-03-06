import {
  GET_USERS_REQUESTED,
  POST_USERS_REQUESTED,
  DELETE_USER_REQUESTED,
  GET_USER_DETAIL_REQUESTED,
  UPDATE_USER_REQUESTED,
  GET_USER_INFORMATION_REQUESTED,
  GET_USER_COURSE_REQUESTED,
  DELETE_LIST_USER_REQUESTED
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
 * POST USERS 
 * 
 * @param {*} payload 
 * @returns
 */
export const postUsers = (payload) => ({
  type: POST_USERS_REQUESTED,
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
 * Delete List User
 * 
 * @param {*} id 
 * @returns
 */
export const deleteListUser = (id) => ({
  type: DELETE_LIST_USER_REQUESTED,
  payload: id
})

/**
 * GET DETAIL USER 
 * 
 * @param {*} payload 
 * @returns
 */
export const getDetailUser = (id) => ({
  type: GET_USER_DETAIL_REQUESTED,
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

export const getUserInformation = () => ({
  type: GET_USER_INFORMATION_REQUESTED
})

/**
 * Get User course 
 * 
 * @param {*} id 
 * @returns
 */
export const getUserCourse = (id) => ({
  type: GET_USER_COURSE_REQUESTED,
  payload: id
})

