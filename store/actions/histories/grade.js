import {
  GET_GRADES_OPTIONS_REQUESTED,
  GET_GRADES_REQUESTED,
  GET_GRADE_REQUESTED,
  POST_GRADE_REQUESTED,
  UPDATE_GRADE_REQUESTED,
  DELETE_GRADE_REQUESTED,
  CLEAR_GRADE_STATE
} from '../../constants'

/**
 * Get Grades Options
 *
 * @param {*} payload
 * @returns
 */
export const getGradesOptions = (payload) => ({
  type: GET_GRADES_OPTIONS_REQUESTED,
  payload
})

/**
 * Get Grades
 *
 * @param {*} payload
 * @returns
 */
export const getGrades = (payload) => ({
  type: GET_GRADES_REQUESTED,
  payload
})

/**
 * Get Grade
 *
 * @param {*} payload
 * @returns
 */
export const getGrade = (payload) => ({
  type: GET_GRADE_REQUESTED,
  payload
})

/**
 * Delete Grade
 *
 * @param {*} id
 * @returns
 */
export const deleteGrade = (id) => ({
  type: DELETE_GRADE_REQUESTED,
  payload: id
})

/**
 * Post Grade
 *
 * @param {*} payload
 * @returns
 */
export const postGrade = (payload) => ({
  type: POST_GRADE_REQUESTED,
  payload
})

/**
 * Update Grade
 *
 * @param {*} payload
 * @returns
 */
export const updateGrade = (payload) => ({
  type: UPDATE_GRADE_REQUESTED,
  payload
})

/**
 * Clear Grade State
 *
 * @param {*} id
 * @returns
 */
export const clearGradeState = () => ({
  type: CLEAR_GRADE_STATE
})
