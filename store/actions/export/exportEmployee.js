import { CLEAR_EXPORT_EMPLOYEE_DETAIL_STATE, EXPORT_EMPLOYEE_DETAIL_REQUESTED } from '../../constants'

/**
 * Export Employee Detail
 *
 * @param {*} payload
 * @returns
 */
export const exportEmployeeDetail = (payload) => ({
  type: EXPORT_EMPLOYEE_DETAIL_REQUESTED,
  payload
})

/**
 * Clear Export Employee Detail State
 *
 * @returns
 */
export const clearExportEmployeeDetailState = () => ({
  type: CLEAR_EXPORT_EMPLOYEE_DETAIL_STATE
})