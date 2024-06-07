import {
  GET_TARGETS_REQUESTED,
  GET_TARGET_REQUESTED,
  POST_TARGET_REQUESTED,
  UPDATE_TARGET_REQUESTED,
  DELETE_TARGET_REQUESTED,
  CLEAR_TARGET_STATE
} from '../../constants'

/**
 * Get Targets
 *
 * @param {*} payload
 * @returns
 */
export const getTargets = (payload) => ({
  type: GET_TARGETS_REQUESTED,
  payload
})

/**
 * Get Target
 *
 * @param {*} payload
 * @returns
 */
export const getTarget = (payload) => ({
  type: GET_TARGET_REQUESTED,
  payload
})

/**
 * Delete Target
 *
 * @param {*} id
 * @returns
 */
export const deleteTarget = (id) => ({
  type: DELETE_TARGET_REQUESTED,
  payload: id
})

/**
 * Post Target
 *
 * @param {*} payload
 * @returns
 */
export const postTarget = (payload) => ({
  type: POST_TARGET_REQUESTED,
  payload
})

/**
 * Update Target
 *
 * @param {*} payload
 * @returns
 */
export const updateTarget = (payload) => ({
  type: UPDATE_TARGET_REQUESTED,
  payload
})

/**
 * Clear Target State
 *
 * @param {*} id
 * @returns
 */
export const clearTargetState = () => ({
  type: CLEAR_TARGET_STATE
})
