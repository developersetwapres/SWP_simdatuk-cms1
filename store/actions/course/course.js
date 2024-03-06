import {
  GET_COURSE_REQUESTED,
  POST_COURSE_REQUESTED,
  DELETE_COURSE_REQUESTED,
  DELETE_COURSE_LIST_REQUESTED,
  GET_DETAIL_COURSE_REQUESTED,
  UPDATE_COURSE_REQUESTED,
  PATCH_BULK_COURSE_REQUESTED,
  FILTER_COURSE_CATEGORY_REQUESTED
} from '@/store/constants'

/**
 * GET Course 
 * 
 * @param {*} payload 
 * @returns
 */
export const getCourse = (payload) => ({
  type: GET_COURSE_REQUESTED,
  payload: payload
})

/**
 * POST Course 
 * 
 * @param {*} payload 
 * @returns
 */
export const postCourse = (payload) => ({
  type: POST_COURSE_REQUESTED,
  payload: payload
})


/**
 * Delete Course 
 * 
 * @param {*} id 
 * @returns
 */
export const deleteCourse = (id) => ({
  type: DELETE_COURSE_REQUESTED,
  payload: id
})

/**
 * delete list course 
 * 
 * @param {*} id 
 * @returns
 */
export const deleteListCourse = (id) => ({
  type: DELETE_COURSE_LIST_REQUESTED,
  payload: id
})

/**
 * get detail course 
 * 
 * @param {*} id 
 * @returns
 */
export const getDetailCourse = (id) => ({
  type: GET_DETAIL_COURSE_REQUESTED,
  payload: id
})

/**
 * uPDATE cOURSE
 * 
 * @param {*} payload 
 * @returns
 */
export const updateCourse = (payload) => ({
  type: UPDATE_COURSE_REQUESTED,
  payload: payload
})

/**
 * Bulk Course 
 * 
 * @param {*} payload 
 * @returns
 */
export const patchBulkCourse = (payload) => ({
  type: PATCH_BULK_COURSE_REQUESTED,
  payload: payload
})

/**
 * Filter Course 
 * 
 * @param {*} payload 
 * @returns
 */
export const filterCourseCategory = (id) => ({
  type: FILTER_COURSE_CATEGORY_REQUESTED,
  payload: id
})