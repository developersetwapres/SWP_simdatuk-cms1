import {
  GET_RECOGNITIONS_REQUESTED,
  GET_RECOGNITION_REQUESTED,
  POST_RECOGNITION_REQUESTED,
  UPDATE_RECOGNITION_REQUESTED,
  DELETE_RECOGNITION_REQUESTED,
  CLEAR_RECOGNITION_STATE
} from '../../constants'

/**
 * Get Recognitions
 *
 * @param {*} payload
 * @returns
 */
export const getRecognitions = (payload) => ({
  type: GET_RECOGNITIONS_REQUESTED,
  payload
})

/**
 * Get Recognition
 *
 * @param {*} payload
 * @returns
 */
export const getRecognition = (payload) => ({
  type: GET_RECOGNITION_REQUESTED,
  payload
})

/**
 * Delete Recognition
 *
 * @param {*} id
 * @returns
 */
export const deleteRecognition = (id) => ({
  type: DELETE_RECOGNITION_REQUESTED,
  payload: id
})

/**
 * Post Recognition
 *
 * @param {*} payload
 * @returns
 */
export const postRecognition = (payload) => ({
  type: POST_RECOGNITION_REQUESTED,
  payload
})

/**
 * Update Recognition
 *
 * @param {*} payload
 * @returns
 */
export const updateRecognition = (payload) => ({
  type: UPDATE_RECOGNITION_REQUESTED,
  payload
})

/**
 * Clear Recognition State
 *
 * @param {*} id
 * @returns
 */
export const clearRecognitionState = () => ({
  type: CLEAR_RECOGNITION_STATE
})
