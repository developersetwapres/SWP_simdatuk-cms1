/* eslint-disable indent */
import {
  GET_ECHELONS_OPTIONS_REQUESTED,
  GET_ECHELONS_OPTIONS_SUCCESS,
  GET_ECHELONS_OPTIONS_FAILED,
  GET_ECHELONS_REQUESTED,
  GET_ECHELONS_SUCCESS,
  GET_ECHELONS_FAILED,
  GET_ECHELON_REQUESTED,
  GET_ECHELON_SUCCESS,
  GET_ECHELON_FAILED,
  POST_ECHELON_REQUESTED,
  POST_ECHELON_SUCCESS,
  POST_ECHELON_FAILED,
  UPDATE_ECHELON_REQUESTED,
  UPDATE_ECHELON_SUCCESS,
  UPDATE_ECHELON_FAILED,
  DELETE_ECHELON_REQUESTED,
  DELETE_ECHELON_SUCCESS,
  DELETE_ECHELON_FAILED,
  CLEAR_ECHELON_STATE
} from '@/store/constants'

const initialState = {
  loading: false,
  error: null,
  data: [],
  options: [],
  pagination: {},
  detail: {},
  message: ''
}

// eslint-disable-next-line no-unused-vars
export const echelon = (state = initialState, actions) => {
  const payload = actions?.payload

  switch (actions.type) {
    case GET_ECHELONS_OPTIONS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_ECHELONS_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        options: payload?.data
      }
    case GET_ECHELONS_OPTIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_ECHELONS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_ECHELONS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data,
        pagination: payload?.pagination
      }
    case GET_ECHELONS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_ECHELON_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_ECHELON_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    case GET_ECHELON_FAILED:
      return {
        ...state,
        loading: false,
        error: payload
      }
    case POST_ECHELON_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case POST_ECHELON_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case POST_ECHELON_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case DELETE_ECHELON_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case DELETE_ECHELON_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case DELETE_ECHELON_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case UPDATE_ECHELON_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case UPDATE_ECHELON_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case UPDATE_ECHELON_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case CLEAR_ECHELON_STATE:
      return {
        loading: false,
        error: null,
        data: [],
        pagination: {},
        detail: {},
        message: ''
      }
    default:
      return state
  }
}
