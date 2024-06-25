import {
  GET_POSITIONS_HISTORIES_REQUESTED,
  GET_POSITION_HISTORIES_REQUESTED,
  POST_POSITION_HISTORIES_REQUESTED,
  UPDATE_POSITION_HISTORIES_REQUESTED,
  DELETE_POSITION_HISTORIES_REQUESTED,
  CLEAR_POSITION_HISTORIES_STATE
} from '../../constants'

/**
 * Get Positions
 *
 * @param {*} payload
 * @returns
 */
export const getPositionsHistories = (payload) => ({
  type: GET_POSITIONS_HISTORIES_REQUESTED,
  payload
})

/**
 * Get Position
 *
 * @param {*} payload
 * @returns
 */
export const getPositionHistories = (payload) => ({
  type: GET_POSITION_HISTORIES_REQUESTED,
  payload
})

/**
 * Delete Position
 *
 * @param {*} id
 * @returns
 */
export const deletePositionHistories = (id) => ({
  type: DELETE_POSITION_HISTORIES_REQUESTED,
  payload: id
})

/**
 * Post Position
 *
 * @param {*} payload
 * @returns
 */
export const postPositionHistories = (payload) => ({
  type: POST_POSITION_HISTORIES_REQUESTED,
  payload
})

/**
 * Update Position
 *
 * @param {*} payload
 * @returns
 */
export const updatePositionHistories = (payload) => ({
  type: UPDATE_POSITION_HISTORIES_REQUESTED,
  payload
})

/**
 * Clear Position State
 *
 * @param {*} id
 * @returns
 */
export const clearPositionHistoriesState = () => ({
  type: CLEAR_POSITION_HISTORIES_STATE
})
