import { getWithBody } from '@/utils/interceptors'

const basePath = '/export/employees-zip'

/**
 * Export DRH Action
 *
 * @param {*} payload
 * @returns
 */
export const exportDRHAction = (payload) => {
  return getWithBody(`${basePath}`, null, payload)
}
