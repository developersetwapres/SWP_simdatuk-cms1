import { GET_DECREES_REQUESTED, CLEAR_DECREE_STATE } from '../../constants'

/**
 * Get Decrees
 *
 * @param {*} payload
 * @returns
 */
export const getDecrees = (payload) => ({
  type: GET_DECREES_REQUESTED,
  payload
})

/**
 * Clear Decree State
 *
 * @param {*} id
 * @returns
 */
export const clearDecreeState = () => ({
  type: CLEAR_DECREE_STATE
})
