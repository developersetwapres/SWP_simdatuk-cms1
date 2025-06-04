import {
  CLEAR_DIAGRAMS_EXPORT_STATE,
  EXPORT_DIAGRAMS_REQUESTED
} from '@/store/constants'

/**
 * Export Diagrams
 *
 * @returns
 */
export const exportDiagrams = () => ({
  type: EXPORT_DIAGRAMS_REQUESTED
})

/**
 * Clear Diagrams Export State
 *
 * @param {*} payload
 * @returns
 */
export const clearDiagramsExportState = () => ({
  type: CLEAR_DIAGRAMS_EXPORT_STATE
})
