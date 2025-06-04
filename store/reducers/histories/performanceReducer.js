/* eslint-disable indent */
import {
  GET_PERFORMANCES_REQUESTED,
  GET_PERFORMANCES_SUCCESS,
  GET_PERFORMANCES_FAILED,
  GET_PERFORMANCE_REQUESTED,
  GET_PERFORMANCE_SUCCESS,
  GET_PERFORMANCE_FAILED,
  POST_PERFORMANCE_REQUESTED,
  POST_PERFORMANCE_SUCCESS,
  POST_PERFORMANCE_FAILED,
  UPDATE_PERFORMANCE_REQUESTED,
  UPDATE_PERFORMANCE_SUCCESS,
  UPDATE_PERFORMANCE_FAILED,
  DELETE_PERFORMANCE_REQUESTED,
  DELETE_PERFORMANCE_SUCCESS,
  DELETE_PERFORMANCE_FAILED,
  CLEAR_PERFORMANCE_STATE
} from '../../constants'

const initialState = {
  loading: false,
  isSubmit: false,
  error: null,
  detail: {},
  pagination: {},
  data: []
}

// eslint-disable-next-line no-unused-vars
export const performance = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_PERFORMANCES_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_PERFORMANCES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data,
        pagination: payload?.pagination
      }
    case GET_PERFORMANCES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_PERFORMANCE_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_PERFORMANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    case GET_PERFORMANCE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case POST_PERFORMANCE_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case POST_PERFORMANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case POST_PERFORMANCE_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case DELETE_PERFORMANCE_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case DELETE_PERFORMANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case DELETE_PERFORMANCE_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case UPDATE_PERFORMANCE_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case UPDATE_PERFORMANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case UPDATE_PERFORMANCE_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case CLEAR_PERFORMANCE_STATE:
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
