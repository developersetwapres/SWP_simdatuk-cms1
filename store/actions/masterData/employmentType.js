import {
  GET_EMPLOYMENT_TYPES_OPTIONS_REQUESTED,
  GET_EMPLOYMENT_TYPES_REQUESTED,
  GET_EMPLOYMENT_TYPE_REQUESTED,
  POST_EMPLOYMENT_TYPE_REQUESTED,
  UPDATE_EMPLOYMENT_TYPE_REQUESTED,
  DELETE_EMPLOYMENT_TYPE_REQUESTED,
  CLEAR_EMPLOYMENT_TYPE_STATE
} from '../../constants'

/**
 * Get Employment Types
 *
 * @param {*} payload
 * @returns
 */
export const getEmploymentTypes = (payload) => ({
  type: GET_EMPLOYMENT_TYPES_REQUESTED,
  payload
})

/**
 * Get Employment Types Options
 *
 * @param {*} payload
 * @returns
 */
export const getEmploymentTypesOptions = (payload) => ({
  type: GET_EMPLOYMENT_TYPES_OPTIONS_REQUESTED,
  payload: payload
})

/**
 * Get Employment Type
 *
 * @param {*} payload
 * @returns
 */
export const getEmploymentType = (payload) => ({
  type: GET_EMPLOYMENT_TYPE_REQUESTED,
  payload
})

/**
 * Delete Employment Type
 *
 * @param {*} id
 * @returns
 */
export const deleteEmploymentType = (payload) => ({
  type: DELETE_EMPLOYMENT_TYPE_REQUESTED,
  payload
})

/**
 * Post Employment Type
 *
 * @param {*} payload
 * @returns
 */
export const postEmploymentType = (payload) => ({
  type: POST_EMPLOYMENT_TYPE_REQUESTED,
  payload
})

/**
 * Update Employment Type
 *
 * @param {*} payload
 * @returns
 */
export const updateEmploymentType = (payload) => ({
  type: UPDATE_EMPLOYMENT_TYPE_REQUESTED,
  payload
})

/**
 * Clear Employment Type State
 *
 * @param {*} id
 * @returns
 */
export const clearEmploymentTypeState = () => ({
  type: CLEAR_EMPLOYMENT_TYPE_STATE
})
