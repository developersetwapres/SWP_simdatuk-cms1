import {
  GET_LEVELS_REQUESTED,
  GET_TRAININGS_REQUESTED,
  GET_TRAINING_REQUESTED,
  POST_TRAINING_REQUESTED,
  UPDATE_TRAINING_REQUESTED,
  DELETE_TRAINING_REQUESTED,
  CLEAR_TRAINING_STATE
} from '../../constants'

/**
 * Get Trainings
 *
 * @param {*} payload
 * @returns
 */
export const getTrainings = (payload) => ({
  type: GET_TRAININGS_REQUESTED,
  payload
})

/**
 * Get Levels
 *
 * @param {*} payload
 * @returns
 */
export const getLevels = (payload) => ({
  type: GET_LEVELS_REQUESTED,
  payload
})

/**
 * Get Training
 *
 * @param {*} payload
 * @returns
 */
export const getTraining = (payload) => ({
  type: GET_TRAINING_REQUESTED,
  payload
})

/**
 * Delete Training
 *
 * @param {*} id
 * @returns
 */
export const deleteTraining = (id) => ({
  type: DELETE_TRAINING_REQUESTED,
  payload: id
})

/**
 * Post Training
 *
 * @param {*} payload
 * @returns
 */
export const postTraining = (payload) => ({
  type: POST_TRAINING_REQUESTED,
  payload
})

/**
 * Update Training
 *
 * @param {*} payload
 * @returns
 */
export const updateTraining = (payload) => ({
  type: UPDATE_TRAINING_REQUESTED,
  payload
})

/**
 * Clear Training State
 *
 * @param {*} id
 * @returns
 */
export const clearTrainingState = () => ({
  type: CLEAR_TRAINING_STATE
})
