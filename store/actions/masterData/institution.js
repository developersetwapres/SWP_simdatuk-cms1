import {
  GET_INSTITUTIONS_OPTIONS_REQUESTED,
  GET_INSTITUTIONS_REQUESTED,
  GET_INSTITUTION_REQUESTED,
  POST_INSTITUTION_REQUESTED,
  UPDATE_INSTITUTION_REQUESTED,
  DELETE_INSTITUTION_REQUESTED,
  CLEAR_INSTITUTION_STATE
} from '../../constants'

/**
 * Get Institutions
 *
 * @param {*} payload
 * @returns
 */
export const getInstitutions = (payload) => ({
  type: GET_INSTITUTIONS_REQUESTED,
  payload
})

/**
 * Get Institutions Options
 *
 * @param {*} payload
 * @returns
 */
export const getInstitutionsOptions = (payload) => ({
  type: GET_INSTITUTIONS_OPTIONS_REQUESTED,
  payload: payload
})

/**
 * Get Institution
 *
 * @param {*} payload
 * @returns
 */
export const getInstitution = (payload) => ({
  type: GET_INSTITUTION_REQUESTED,
  payload
})

/**
 * Delete Institution
 *
 * @param {*} id
 * @returns
 */
export const deleteInstitution = (payload) => ({
  type: DELETE_INSTITUTION_REQUESTED,
  payload
})

/**
 * Post Institution
 *
 * @param {*} payload
 * @returns
 */
export const postInstitution = (payload) => ({
  type: POST_INSTITUTION_REQUESTED,
  payload
})

/**
 * Update Institution
 *
 * @param {*} payload
 * @returns
 */
export const updateInstitution = (payload) => ({
  type: UPDATE_INSTITUTION_REQUESTED,
  payload
})

/**
 * Clear Institution State
 *
 * @param {*} id
 * @returns
 */
export const clearInstitutionState = () => ({
  type: CLEAR_INSTITUTION_STATE
})
