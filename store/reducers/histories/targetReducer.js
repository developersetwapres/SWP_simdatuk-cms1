/* eslint-disable indent */
import {
  GET_TARGETS_REQUESTED,
  GET_TARGETS_SUCCESS,
  GET_TARGETS_FAILED,
  GET_TARGET_REQUESTED,
  GET_TARGET_SUCCESS,
  GET_TARGET_FAILED,
  POST_TARGET_REQUESTED,
  POST_TARGET_SUCCESS,
  POST_TARGET_FAILED,
  UPDATE_TARGET_REQUESTED,
  UPDATE_TARGET_SUCCESS,
  UPDATE_TARGET_FAILED,
  DELETE_TARGET_REQUESTED,
  DELETE_TARGET_SUCCESS,
  DELETE_TARGET_FAILED,
  CLEAR_TARGET_STATE
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
export const target = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_TARGETS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_TARGETS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data,
        pagination: payload?.pagination
      }
    case GET_TARGETS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_TARGET_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_TARGET_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    case GET_TARGET_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case POST_TARGET_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case POST_TARGET_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case POST_TARGET_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case DELETE_TARGET_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case DELETE_TARGET_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case DELETE_TARGET_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case UPDATE_TARGET_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case UPDATE_TARGET_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case UPDATE_TARGET_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case CLEAR_TARGET_STATE:
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
