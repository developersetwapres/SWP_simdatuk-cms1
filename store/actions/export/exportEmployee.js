import {
  CLEAR_EXPORT_EMPLOYEE_DETAIL_STATE,
  CLEAR_EXPORT_EMPLOYEES_STATE,
  CLEAR_EXPORT_EMPLOYEES_PREVIEW_STATE,
  EXPORT_EMPLOYEE_DETAIL_REQUESTED,
  EXPORT_EMPLOYEES_REQUESTED,
  EXPORT_EMPLOYEES_PREVIEW_REQUESTED
} from '../../constants'

/**
 * Export Employees
 *
 * @param {*} payload
 * @returns
 */
export const exportEmployees = (payload) => ({
  type: EXPORT_EMPLOYEES_REQUESTED,
  payload
})

/**
 * Export Employees Preview
 *
 * @param {*} payload
 * @returns
 */
export const exportEmployeesPreview = (payload) => ({
  type: EXPORT_EMPLOYEES_PREVIEW_REQUESTED,
  payload
})

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
 * Clear Export Employees State
 *
 * @returns
 */
export const clearExportEmployeesState = () => ({
  type: CLEAR_EXPORT_EMPLOYEES_STATE
})

/**
 * Clear Export Employees Preview State
 *
 * @returns
 */
export const clearExportEmployeesPreviewState = () => ({
  type: CLEAR_EXPORT_EMPLOYEES_PREVIEW_STATE
})

/**
 * Clear Export Employee Detail State
 *
 * @returns
 */
export const clearExportEmployeeDetailState = () => ({
  type: CLEAR_EXPORT_EMPLOYEE_DETAIL_STATE
})