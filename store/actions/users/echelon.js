import {
  GET_ECHELONS_REQUESTED,
  GET_ECHELON_REQUESTED,
  POST_ECHELON_REQUESTED,
  DELETE_ECHELON_REQUESTED,
  UPDATE_ECHELON_REQUESTED,
  CLEAR_ECHELON_STATE
} from '@/store/constants'

/**
 * GET ECHELONS
 *
 * @param {*} payload
 * @returns
 */
// eslint-disable-next-line no-unused-vars
export const getEchelons = (payload) => ({
  type: GET_ECHELONS_REQUESTED,
  payload: payload
})

/**
 * GET DETAIL Echelon
 *
 * @param {*} payload
 * @returns
 */
export const getEchelon = (id) => ({
  type: GET_ECHELON_REQUESTED,
  payload: id
})

/**
 * POST Echelon
 *
 * @param {*} payload
 * @returns
 */
export const postEchelon = (payload) => ({
  type: POST_ECHELON_REQUESTED,
  payload
})

/**
 * Delete Echelon
 *
 * @param {*} id
 * @returns
 */
export const deleteEchelon = (id) => ({
  type: DELETE_ECHELON_REQUESTED,
  payload: id
})

/**
 * Update Echelon
 *
 * @param {*} payload
 * @param {*} id
 * @returns
 */
export const updateEchelon = (id, payload) => ({
  type: UPDATE_ECHELON_REQUESTED,
  payload
})

/**
 * Clear Echelon State
 *
 * @param {*} payload
 * @param {*} id
 * @returns
 */
export const clearEchelonState = () => ({
  type: CLEAR_ECHELON_STATE
})
