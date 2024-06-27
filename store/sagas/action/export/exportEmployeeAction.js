import { post } from '@/utils/interceptors'

const basePath = '/export/employees'

/**
 * Export Employee Detail Action
 *
 * @param {*} payload
 * @returns
 */
export const exportEmployeeDetailAction = (id) => {
  return post(`${basePath}/${id}`, null, {
    responseType: 'blob'
  })
}
