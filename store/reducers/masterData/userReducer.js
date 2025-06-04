/* eslint-disable indent */
import {
  GET_USERS_REQUESTED,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  GET_USER_REQUESTED,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  POST_USER_REQUESTED,
  POST_USER_SUCCESS,
  POST_USER_FAILED,
  UPDATE_USER_REQUESTED,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  DELETE_USER_REQUESTED,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  CLEAR_USER_STATE,
  UPDATE_USER_STATUS_REQUESTED,
  UPDATE_USER_STATUS_SUCCESS,
  UPDATE_USER_STATUS_FAILED
} from '@/store/constants'

const initialState = {
  loading: false,
  error: null,
  data: [],
  pagination: {},
  detail: {},
  message: '',
  icon: null
}

// eslint-disable-next-line no-unused-vars
export const user = (state = initialState, actions) => {
  const payload = actions?.payload

  switch (actions.type) {
    case GET_USERS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data,
        pagination: payload?.pagination
      }
    case GET_USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_USER_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    case GET_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: payload
      }
    case POST_USER_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case POST_USER_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case POST_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case DELETE_USER_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case DELETE_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case UPDATE_USER_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case UPDATE_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case UPDATE_USER_STATUS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case UPDATE_USER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case UPDATE_USER_STATUS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case CLEAR_USER_STATE:
      return {
        loading: false,
        error: null,
        data: [],
        pagination: {},
        detail: {},
        message: '',
        icon: null
      }
    default:
      return state
  }
}
