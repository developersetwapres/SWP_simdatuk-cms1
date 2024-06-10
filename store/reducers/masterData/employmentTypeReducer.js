/* eslint-disable indent */
import {
  GET_EMPLOYMENT_TYPES_OPTIONS_REQUESTED,
  GET_EMPLOYMENT_TYPES_OPTIONS_SUCCESS,
  GET_EMPLOYMENT_TYPES_OPTIONS_FAILED,
  GET_EMPLOYMENT_TYPES_REQUESTED,
  GET_EMPLOYMENT_TYPES_SUCCESS,
  GET_EMPLOYMENT_TYPES_FAILED,
  GET_EMPLOYMENT_TYPE_REQUESTED,
  GET_EMPLOYMENT_TYPE_SUCCESS,
  GET_EMPLOYMENT_TYPE_FAILED,
  POST_EMPLOYMENT_TYPE_REQUESTED,
  POST_EMPLOYMENT_TYPE_SUCCESS,
  POST_EMPLOYMENT_TYPE_FAILED,
  UPDATE_EMPLOYMENT_TYPE_REQUESTED,
  UPDATE_EMPLOYMENT_TYPE_SUCCESS,
  UPDATE_EMPLOYMENT_TYPE_FAILED,
  DELETE_EMPLOYMENT_TYPE_REQUESTED,
  DELETE_EMPLOYMENT_TYPE_SUCCESS,
  DELETE_EMPLOYMENT_TYPE_FAILED,
  CLEAR_EMPLOYMENT_TYPE_STATE
} from '../../constants'

const initialState = {
  loading: false,
  isSubmit: false,
  error: null,
  detail: {},
  pagination: {},
  data: [],
  options: []
}

// eslint-disable-next-line no-unused-vars
export const employmentType = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_EMPLOYMENT_TYPES_OPTIONS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_EMPLOYMENT_TYPES_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        options: payload?.data
      }
    case GET_EMPLOYMENT_TYPES_OPTIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_EMPLOYMENT_TYPES_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_EMPLOYMENT_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data,
        pagination: payload?.pagination
      }
    case GET_EMPLOYMENT_TYPES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_EMPLOYMENT_TYPE_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_EMPLOYMENT_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    case GET_EMPLOYMENT_TYPE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case POST_EMPLOYMENT_TYPE_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case POST_EMPLOYMENT_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case POST_EMPLOYMENT_TYPE_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case DELETE_EMPLOYMENT_TYPE_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case DELETE_EMPLOYMENT_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case DELETE_EMPLOYMENT_TYPE_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case UPDATE_EMPLOYMENT_TYPE_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case UPDATE_EMPLOYMENT_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case UPDATE_EMPLOYMENT_TYPE_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case CLEAR_EMPLOYMENT_TYPE_STATE:
      return {
        loading: false,
        isSubmit: false,
        error: null,
        detail: {},
        pagination: {},
        data: []
      }
    default:
      return state
  }
}
