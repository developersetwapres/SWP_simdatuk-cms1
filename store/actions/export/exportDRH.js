import { CLEAR_EXPORT_DRH_STATE, EXPORT_DRH_REQUESTED } from '../../constants'

/**
 * Export DRH
 *
 * @param {*} payload
 * @returns
 */
export const exportDRH = (payload) => ({
  type: EXPORT_DRH_REQUESTED,
  payload
})

/**
 * Clear Export DRH State
 *
 * @param {*} id
 * @returns
 */
export const clearExportDrhState = () => ({
  type: CLEAR_EXPORT_DRH_STATE
})
