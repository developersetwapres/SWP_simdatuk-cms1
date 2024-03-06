import {
  GET_COURSE_CATEGORY_REQUESTED,
  DELETE_COURSE_CATEGORY_REQUESTED,
  GET_COURSE_CATEGORY_ID_REQUESTED,
  POST_COURSE_CATEGORY_REQUESTED,
  DELETE_COURSE_CATEGORY_LIST_REQUESTED,
  UPDATE_COURSE_CATEGORY_REQUESTED,
  GET_PROGRAM_PKASN_REQUESTED
} from '../constants'

/**
 * Get Course Category 
 * 
 * @param {*} payload 
 * @returns
 */
export const getCourseCategory = (payload) => ({
  type: GET_COURSE_CATEGORY_REQUESTED,
  payload: payload
})

/**
 * Delete Course Category 
 * 
 * @param {*} id 
 * @returns
 */
export const deleteCourseCategory = (id) => ({
  type: DELETE_COURSE_CATEGORY_REQUESTED,
  payload: id
})

/**
 * 
 * GET Course Category by Id
 * 
 * @param {*} id 
 * @returns
 */
export const getCourseCategoryById = (id) => ({
  type: GET_COURSE_CATEGORY_ID_REQUESTED,
  payload: id
})

/**
 * Post Category
 * 
 * @param {*} payload 
 * @returns
 */
export const postCategory = (payload) => ({
  type: POST_COURSE_CATEGORY_REQUESTED,
  payload: payload
})

/**
 * Delete list cATEOGRY
 * 
 * @param {*} id 
 * @returns
 */
export const deleteCourseCategoryList = (id) => ({
  type: DELETE_COURSE_CATEGORY_LIST_REQUESTED,
  payload: id
})

/**
 * Update Category
 * 
 * @param {*} payload 
 * @returns
 */
export const updateCourseCategory = (payload) => ({
  type: UPDATE_COURSE_CATEGORY_REQUESTED,
  payload: payload
})

/**
 * Get Program PKASN 
 * 
 * @returns
 */
export const getProgramPKASN = () => ({
  type: GET_PROGRAM_PKASN_REQUESTED
})