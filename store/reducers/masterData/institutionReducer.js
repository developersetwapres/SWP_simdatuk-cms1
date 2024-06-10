/* eslint-disable indent */
import {
  GET_INSTITUTIONS_OPTIONS_REQUESTED,
  GET_INSTITUTIONS_OPTIONS_SUCCESS,
  GET_INSTITUTIONS_OPTIONS_FAILED,
  GET_INSTITUTIONS_REQUESTED,
  GET_INSTITUTIONS_SUCCESS,
  GET_INSTITUTIONS_FAILED,
  GET_INSTITUTION_REQUESTED,
  GET_INSTITUTION_SUCCESS,
  GET_INSTITUTION_FAILED,
  POST_INSTITUTION_REQUESTED,
  POST_INSTITUTION_SUCCESS,
  POST_INSTITUTION_FAILED,
  UPDATE_INSTITUTION_REQUESTED,
  UPDATE_INSTITUTION_SUCCESS,
  UPDATE_INSTITUTION_FAILED,
  DELETE_INSTITUTION_REQUESTED,
  DELETE_INSTITUTION_SUCCESS,
  DELETE_INSTITUTION_FAILED,
  CLEAR_INSTITUTION_STATE
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
export const institution = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_INSTITUTIONS_OPTIONS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_INSTITUTIONS_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        options: payload?.data
      }
    case GET_INSTITUTIONS_OPTIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_INSTITUTIONS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_INSTITUTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data,
        pagination: payload?.pagination
      }
    case GET_INSTITUTIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_INSTITUTION_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_INSTITUTION_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    case GET_INSTITUTION_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case POST_INSTITUTION_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case POST_INSTITUTION_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case POST_INSTITUTION_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case DELETE_INSTITUTION_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case DELETE_INSTITUTION_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case DELETE_INSTITUTION_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case UPDATE_INSTITUTION_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case UPDATE_INSTITUTION_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case UPDATE_INSTITUTION_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case CLEAR_INSTITUTION_STATE:
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
