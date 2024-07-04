import { CLEAR_EXPORT_COMPARISON_STATE, EXPORT_COMPARISON_REQUESTED } from '../../constants'

/**
 * Export Comparison
 *
 * @param {*} payload
 * @returns
 */
export const exportComparison = (payload) => ({
  type: EXPORT_COMPARISON_REQUESTED,
  payload
})

/**
 * Clear Export Comparison State
 *
 * @returns
 */
export const clearExportComparisonState = () => ({
  type: CLEAR_EXPORT_COMPARISON_STATE
})
