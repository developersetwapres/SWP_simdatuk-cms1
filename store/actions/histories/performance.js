import {
  GET_PERFORMANCES_REQUESTED,
  GET_PERFORMANCE_REQUESTED,
  POST_PERFORMANCE_REQUESTED,
  UPDATE_PERFORMANCE_REQUESTED,
  DELETE_PERFORMANCE_REQUESTED,
  CLEAR_PERFORMANCE_STATE
} from '../../constants'

/**
 * Get Performances
 *
 * @param {*} payload
 * @returns
 */
export const getPerformances = (payload) => ({
  type: GET_PERFORMANCES_REQUESTED,
  payload
})

/**
 * Get Performance
 *
 * @param {*} payload
 * @returns
 */
export const getPerformance = (payload) => ({
  type: GET_PERFORMANCE_REQUESTED,
  payload
})

/**
 * Delete Performance
 *
 * @param {*} id
 * @returns
 */
export const deletePerformance = (id) => ({
  type: DELETE_PERFORMANCE_REQUESTED,
  payload: id
})

/**
 * Post Performance
 *
 * @param {*} payload
 * @returns
 */
export const postPerformance = (payload) => ({
  type: POST_PERFORMANCE_REQUESTED,
  payload
})

/**
 * Update Performance
 *
 * @param {*} payload
 * @returns
 */
export const updatePerformance = (payload) => ({
  type: UPDATE_PERFORMANCE_REQUESTED,
  payload
})

/**
 * Clear Performance State
 *
 * @param {*} id
 * @returns
 */
export const clearPerformanceState = () => ({
  type: CLEAR_PERFORMANCE_STATE
})
