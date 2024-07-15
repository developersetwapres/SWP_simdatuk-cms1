import { post } from '@/utils/interceptors'

const basePath = '/export/employees'

/**
 * Export Employees Action
 *
 * @param {*} payload
 * @returns
 */
export const exportEmployeesAction = (payload) => {
  const { type, data } = payload
  return post(`${basePath}/${type}`, data, {
    responseType: 'blob'
  })
}

/**
 * Export Employees Preview Action
 *
 * @param {*} payload
 * @returns
 */
export const exportEmployeesPreviewAction = (payload) => {
  return post('/export/preview', payload)
}

/**
 * Export Employee Detail Action
 *
 * @param {*} payload
 * @returns
 */
export const exportEmployeeDetailAction = (id) => {
  return post(`/export/employees-drh/${id}`, null, {
    responseType: 'blob'
  })
}
