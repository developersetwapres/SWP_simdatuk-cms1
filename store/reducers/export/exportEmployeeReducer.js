/* eslint-disable indent */
import {
  EXPORT_EMPLOYEE_DETAIL_FAILED,
  EXPORT_EMPLOYEE_DETAIL_SUCCESS,
  EXPORT_EMPLOYEE_DETAIL_REQUESTED,
  EXPORT_EMPLOYEES_FAILED,
  EXPORT_EMPLOYEES_SUCCESS,
  EXPORT_EMPLOYEES_REQUESTED,
  EXPORT_EMPLOYEES_PREVIEW_FAILED,
  EXPORT_EMPLOYEES_PREVIEW_SUCCESS,
  EXPORT_EMPLOYEES_PREVIEW_REQUESTED,
  CLEAR_EXPORT_EMPLOYEE_DETAIL_STATE,
  CLEAR_EXPORT_EMPLOYEES_STATE,
  CLEAR_EXPORT_EMPLOYEES_PREVIEW_STATE
} from '../../constants'

const initialState = {
  loading: false,
  error: null,
  detail: null,
  employees: null,
  preview: null
}
export const exportEmployeeData = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    // DETAIL
    case EXPORT_EMPLOYEE_DETAIL_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case EXPORT_EMPLOYEE_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    case EXPORT_EMPLOYEE_DETAIL_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    // EMPLOYEES
    case EXPORT_EMPLOYEES_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case EXPORT_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: payload?.data
      }
    case EXPORT_EMPLOYEES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    // PREVIEW
    case EXPORT_EMPLOYEES_PREVIEW_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case EXPORT_EMPLOYEES_PREVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        preview: payload?.data
      }
    case EXPORT_EMPLOYEES_PREVIEW_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    // CLEAR
    case CLEAR_EXPORT_EMPLOYEE_DETAIL_STATE:
      return {
        loading: false,
        error: null,
        detail: null
      }
    case CLEAR_EXPORT_EMPLOYEES_STATE:
      return {
        loading: false,
        error: null,
        employees: null
      }
    case CLEAR_EXPORT_EMPLOYEES_PREVIEW_STATE:
      return {
        loading: false,
        error: null,
        preview: null
      }
    default:
      return state
  }
}
