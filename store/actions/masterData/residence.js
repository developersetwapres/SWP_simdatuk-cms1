import {
  GET_RESIDENCES_REQUESTED,
  CLEAR_RESIDENCE_STATE
} from '../../constants'

/**
 * Get Residences
 *
 * @param {*} payload
 * @returns
 */
export const getResidences = (payload) => ({
  type: GET_RESIDENCES_REQUESTED,
  payload
})

/**
 * Clear Residence State
 *
 * @param {*} id
 * @returns
 */
export const clearResidenceState = () => ({
  type: CLEAR_RESIDENCE_STATE
})
