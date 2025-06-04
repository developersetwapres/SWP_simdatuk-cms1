import { post } from '@/utils/interceptors'

/**
 *
 * EXPORT DATA COMPARISON
 *
 * @returns
 */
export const getComparisonExportAction = (payload) => {
  return post(`/export/comparisons`, payload, {
    responseType: 'blob'
  })
}