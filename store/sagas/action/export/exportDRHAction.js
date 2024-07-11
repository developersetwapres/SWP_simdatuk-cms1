import { post } from '@/utils/interceptors'

const basePath = '/export/employees-drh'

/**
 * Export DRH Action
 *
 * @param {*} payload
 * @returns
 */
export const exportDRHAction = (payload) => {
  return post(`${basePath}`, payload, {
    responseType: 'blob'
  })
}
