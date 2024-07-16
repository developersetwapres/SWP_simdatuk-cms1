import {
  CLEAR_DIAGRAMS_EXPORT_STATE,
  CLEAR_DIAGRAMS_STATE,
  EXPORT_DIAGRAMS_REQUESTED,
  GET_DIAGRAMS_REQUESTED
} from '../../constants'

/**
 * Get Diagrams
 *
 * @returns
 */
export const getDiagrams = (payload) => ({
  type: GET_DIAGRAMS_REQUESTED,
  payload
})

/**
 * Clear Diagrams State
 *
 * @param {*} payload
 * @returns
 */
export const clearDiagramsState = () => ({
  type: CLEAR_DIAGRAMS_STATE
})
