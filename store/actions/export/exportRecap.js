import { CLEAR_EXPORT_RECAP_STATE, EXPORT_RECAP_REQUESTED } from '../../constants'

/**
 * Export Recap
 *
 * @param {*} payload
 * @returns
 */
export const exportRecap = (payload) => ({
  type: EXPORT_RECAP_REQUESTED,
  payload
})

/**
 * Clear Export Recap State
 *
 * @returns
 */
export const clearExportRecapState = () => ({
  type: CLEAR_EXPORT_RECAP_STATE
})
