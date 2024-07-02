/* eslint-disable indent */
import {
  GET_EMPLOYEES_REQUESTED,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAILED,
  GET_EMPLOYEE_REQUESTED,
  GET_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_FAILED,
  POST_EMPLOYEE_REQUESTED,
  POST_EMPLOYEE_SUCCESS,
  POST_EMPLOYEE_FAILED,
  UPDATE_EMPLOYEE_REQUESTED,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAILED,
  UPDATE_EMPLOYEE_STATUS_REQUESTED,
  UPDATE_EMPLOYEE_STATUS_SUCCESS,
  UPDATE_EMPLOYEE_STATUS_FAILED,
  DELETE_EMPLOYEE_REQUESTED,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAILED,
  CLEAR_EMPLOYEE_STATE
} from '../constants'

const initialState = {
  loading: false,
  isSubmit: false,
  error: null,
  errorForm: {},
  detail: {},
  pagination: {},
  data: []
}

// eslint-disable-next-line no-unused-vars
export const employee = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_EMPLOYEES_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data,
        pagination: payload?.pagination
      }
    case GET_EMPLOYEES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_EMPLOYEE_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    case GET_EMPLOYEE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case POST_EMPLOYEE_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case POST_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        errorForm: {}
      }
    case POST_EMPLOYEE_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error,
        errorForm: payload?.data
      }
    case DELETE_EMPLOYEE_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case DELETE_EMPLOYEE_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case UPDATE_EMPLOYEE_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        errorForm: {}
      }
    case UPDATE_EMPLOYEE_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        errorForm: payload?.data
      }
    case UPDATE_EMPLOYEE_STATUS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case UPDATE_EMPLOYEE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case UPDATE_EMPLOYEE_STATUS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case CLEAR_EMPLOYEE_STATE:
      return {
        isSubmit: false,
        error: null,
        detail: {},
        pagination: {},
        data: [],
        errorForm: {}
      }
    default:
      return state
  }
}
