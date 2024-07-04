import { getBlob } from '@/utils/interceptors'

/**
 *
 * EXPORT DATA COMPARISON
 *
 * @returns
 */
export const getComparisonExportAction = (payload) => {
  return getBlob(`/export/comparisons`, payload)
}