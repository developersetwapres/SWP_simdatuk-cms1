import { get } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

/**
 * Get Update Provider Action
 * @returns 
 */

export const getUpdateProviderAction = () => {
  return get(`/providers${queryParams(1, 1000, '', '', '')}`)
}

/**
 * Update Bulk Provider 
 * 
 * @param {*} id 
 * @returns
 */
export const getUpdateBulkProviderAction = (id) => {
  return get(`/fetch-course/${id}`)
}