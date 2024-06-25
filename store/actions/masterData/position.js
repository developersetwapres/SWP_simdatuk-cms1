import {
  GET_POSITIONS_ORDERS_REQUESTED,
  GET_POSITIONS_REQUESTED,
  GET_POSITION_REQUESTED,
  POST_POSITION_REQUESTED,
  UPDATE_POSITION_REQUESTED,
  DELETE_POSITION_REQUESTED,
  CLEAR_POSITION_STATE
} from '../../constants'

/**
 * Get Positions Orders
 *
 * @param {*} payload
 * @returns
 */
export const getPositionsOrders = (payload) => ({
  type: GET_POSITIONS_ORDERS_REQUESTED,
  payload
})

/**
 * Get Positions
 *
 * @param {*} payload
 * @returns
 */
export const getPositions = (payload) => ({
  type: GET_POSITIONS_REQUESTED,
  payload
})

/**
 * Get Position
 *
 * @param {*} payload
 * @returns
 */
export const getPosition = (payload) => ({
  type: GET_POSITION_REQUESTED,
  payload
})

/**
 * Delete Position
 *
 * @param {*} id
 * @returns
 */
export const deletePosition = (id) => ({
  type: DELETE_POSITION_REQUESTED,
  payload: id
})

/**
 * Post Position
 *
 * @param {*} payload
 * @returns
 */
export const postPosition = (payload) => ({
  type: POST_POSITION_REQUESTED,
  payload
})

/**
 * Update Position
 *
 * @param {*} payload
 * @returns
 */
export const updatePosition = (payload) => ({
  type: UPDATE_POSITION_REQUESTED,
  payload
})

/**
 * Clear Position State
 *
 * @param {*} id
 * @returns
 */
export const clearPositionState = () => ({
  type: CLEAR_POSITION_STATE
})
