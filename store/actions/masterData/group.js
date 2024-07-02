import { GET_GROUPS_REQUESTED, CLEAR_GROUP_STATE } from '../../constants'

/**
 * Get Groups
 *
 * @param {*} payload
 * @returns
 */
export const getGroups = (payload) => ({
  type: GET_GROUPS_REQUESTED,
  payload
})

/**
 * Clear Group State
 *
 * @param {*} id
 * @returns
 */
export const clearGroupState = () => ({
  type: CLEAR_GROUP_STATE
})
