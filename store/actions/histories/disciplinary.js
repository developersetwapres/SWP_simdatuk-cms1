import {
  GET_DISCIPLINARIES_REQUESTED,
  GET_DISCIPLINARIES_OPTIONS_REQUESTED,
  GET_DISCIPLINARY_REQUESTED,
  POST_DISCIPLINARY_REQUESTED,
  UPDATE_DISCIPLINARY_REQUESTED,
  DELETE_DISCIPLINARY_REQUESTED,
  CLEAR_DISCIPLINARY_STATE
} from '../../constants'

/**
 * Get Disciplinaries Options
 *
 * @param {*} payload
 * @returns
 */
export const getDisciplinariesOptions = (payload) => ({
  type: GET_DISCIPLINARIES_OPTIONS_REQUESTED,
  payload
})

/**
 * Get Disciplinaries
 *
 * @param {*} payload
 * @returns
 */
export const getDisciplinaries = (payload) => ({
  type: GET_DISCIPLINARIES_REQUESTED,
  payload
})

/**
 * Get Disciplinary
 *
 * @param {*} payload
 * @returns
 */
export const getDisciplinary = (payload) => ({
  type: GET_DISCIPLINARY_REQUESTED,
  payload
})

/**
 * Delete Disciplinary
 *
 * @param {*} id
 * @returns
 */
export const deleteDisciplinary = (id) => ({
  type: DELETE_DISCIPLINARY_REQUESTED,
  payload: id
})

/**
 * Post Disciplinary
 *
 * @param {*} payload
 * @returns
 */
export const postDisciplinary = (payload) => ({
  type: POST_DISCIPLINARY_REQUESTED,
  payload
})

/**
 * Update Disciplinary
 *
 * @param {*} payload
 * @returns
 */
export const updateDisciplinary = (payload) => ({
  type: UPDATE_DISCIPLINARY_REQUESTED,
  payload
})

/**
 * Clear Disciplinary State
 *
 * @param {*} id
 * @returns
 */
export const clearDisciplinaryState = () => ({
  type: CLEAR_DISCIPLINARY_STATE
})
