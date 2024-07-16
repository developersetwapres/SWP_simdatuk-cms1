/* eslint-disable indent */
import {
  CLEAR_EMPLOYEES_RECAP,
  GET_EMPLOYEES_RECAP_FAILED,
  GET_EMPLOYEES_RECAP_REQUESTED,
  GET_EMPLOYEES_RECAP_SUCCESS
} from '../../constants'

const initialState = {
  loading: false,
  isSubmit: false,
  error: null,
  detail: {},
  pagination: {},
  data: [],
  export: null
}

// eslint-disable-next-line no-unused-vars
export const employeesRecap = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_EMPLOYEES_RECAP_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_EMPLOYEES_RECAP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data,
        pagination: payload?.pagination
      }
    case GET_EMPLOYEES_RECAP_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case CLEAR_EMPLOYEES_RECAP:
      return {
        loading: false,
        isSubmit: false,
        error: null,
        detail: {},
        pagination: {},
        data: [],
        export: null
      }
    default:
      return state
  }
}
