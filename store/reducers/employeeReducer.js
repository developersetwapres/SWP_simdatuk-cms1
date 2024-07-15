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
  CLEAR_EMPLOYEE_STATE,
  SYNC_EMPLOYEES_REQUESTED,
  SYNC_EMPLOYEES_SUCCESS,
  SYNC_EMPLOYEES_FAILED,
  DOWNLOAD_TEMPLATE_REQUESTED,
  DOWNLOAD_TEMPLATE_SUCCESS,
  DOWNLOAD_TEMPLATE_FAILED,
  UPLOAD_TEMPLATE_REQUESTED,
  UPLOAD_TEMPLATE_SUCCESS,
  UPLOAD_TEMPLATE_FAILED,
  GET_ACTIVITIES_REQUESTED,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_FAILED,
  CLEAR_TEMPLATE
} from '../constants'

const initialState = {
  loading: false,
  isSubmit: false,
  error: null,
  errorForm: {},
  detail: {},
  pagination: {},
  data: [],
  template: null,
  uploading: false,
  uploaded: false,
  activities: []
}

export const employee = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    // ACTIVITIES
    case GET_ACTIVITIES_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_ACTIVITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        activities: payload?.data
      }
    case GET_ACTIVITIES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    // UPLOAD TEMPLATE
    case UPLOAD_TEMPLATE_REQUESTED:
      return {
        ...state,
        uploading: true,
        uploaded: false
      }
    case UPLOAD_TEMPLATE_SUCCESS:
      return {
        ...state,
        uploading: false,
        uploaded: true
      }
    case UPLOAD_TEMPLATE_FAILED:
      return {
        ...state,
        uploading: false,
        uploaded: false,
        error: payload
      }
    // DOWNLOAD TEMPLATE
    case DOWNLOAD_TEMPLATE_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case DOWNLOAD_TEMPLATE_SUCCESS:
      return {
        ...state,
        loading: false,
        template: payload
      }
    case DOWNLOAD_TEMPLATE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload
      }
    // SYNC
    case SYNC_EMPLOYEES_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case SYNC_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case SYNC_EMPLOYEES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    // EMPLOYEES
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
    // EMPLOYEE DETAIL
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
    // POST EMPLOYEE
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
    // DELETE EMPLOYEE
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
    // UPDATE EMPLOYEE
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
    // UPDATE STATUS
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
    // CLEAR STATE
    case CLEAR_TEMPLATE:
      return {
        ...state,
        template: null
      }
    case CLEAR_EMPLOYEE_STATE:
      return {
        isSubmit: false,
        error: null,
        detail: {},
        pagination: {},
        data: [],
        errorForm: {},
        uploading: false,
        uploaded: false
      }
    default:
      return state
  }
}
