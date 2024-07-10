/* eslint-disable indent */
import {
  GET_RECOGNITIONS_REQUESTED,
  GET_RECOGNITIONS_SUCCESS,
  GET_RECOGNITIONS_FAILED,
  GET_RECOGNITION_REQUESTED,
  GET_RECOGNITION_SUCCESS,
  GET_RECOGNITION_FAILED,
  POST_RECOGNITION_REQUESTED,
  POST_RECOGNITION_SUCCESS,
  POST_RECOGNITION_FAILED,
  UPDATE_RECOGNITION_REQUESTED,
  UPDATE_RECOGNITION_SUCCESS,
  UPDATE_RECOGNITION_FAILED,
  DELETE_RECOGNITION_REQUESTED,
  DELETE_RECOGNITION_SUCCESS,
  DELETE_RECOGNITION_FAILED,
  CLEAR_RECOGNITION_STATE,
  GET_RECOGNITIONS_OPTIONS_REQUESTED,
  GET_RECOGNITIONS_OPTIONS_SUCCESS,
  GET_RECOGNITIONS_OPTIONS_FAILED
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
export const recognition = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_RECOGNITIONS_OPTIONS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_RECOGNITIONS_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        options: payload?.data
      }
    case GET_RECOGNITIONS_OPTIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_RECOGNITIONS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_RECOGNITIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data,
        pagination: payload?.pagination
      }
    case GET_RECOGNITIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_RECOGNITION_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_RECOGNITION_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    case GET_RECOGNITION_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case POST_RECOGNITION_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case POST_RECOGNITION_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case POST_RECOGNITION_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case DELETE_RECOGNITION_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case DELETE_RECOGNITION_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case DELETE_RECOGNITION_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case UPDATE_RECOGNITION_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case UPDATE_RECOGNITION_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case UPDATE_RECOGNITION_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case CLEAR_RECOGNITION_STATE:
      return {
        loading: false,
        isSubmit: false,
        error: null,
        detail: {},
        pagination: {},
        data: [],
        options: []
      }
    default:
      return state
  }
}
