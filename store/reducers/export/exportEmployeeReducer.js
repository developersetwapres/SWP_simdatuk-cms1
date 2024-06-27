/* eslint-disable indent */
import {
  EXPORT_EMPLOYEE_DETAIL_FAILED,
  EXPORT_EMPLOYEE_DETAIL_SUCCESS,
  EXPORT_EMPLOYEE_DETAIL_REQUESTED,
  CLEAR_EXPORT_EMPLOYEE_DETAIL_STATE
} from '../../constants'

const initialState = {
  loading: false,
  error: null,
  detail: null
}

// eslint-disable-next-line no-unused-vars
export const exportEmployeeData = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
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
    case CLEAR_EXPORT_EMPLOYEE_DETAIL_STATE:
      return {
        loading: false,
        error: null,
        detail: null
      }
    default:
      return state
  }
}
