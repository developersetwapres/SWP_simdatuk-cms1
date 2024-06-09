/* eslint-disable indent */
import {
  GET_DISCIPLINARIES_OPTIONS_REQUESTED,
  GET_DISCIPLINARIES_OPTIONS_SUCCESS,
  GET_DISCIPLINARIES_OPTIONS_FAILED,
  GET_DISCIPLINARIES_REQUESTED,
  GET_DISCIPLINARIES_SUCCESS,
  GET_DISCIPLINARIES_FAILED,
  GET_DISCIPLINARY_REQUESTED,
  GET_DISCIPLINARY_SUCCESS,
  GET_DISCIPLINARY_FAILED,
  POST_DISCIPLINARY_REQUESTED,
  POST_DISCIPLINARY_SUCCESS,
  POST_DISCIPLINARY_FAILED,
  UPDATE_DISCIPLINARY_REQUESTED,
  UPDATE_DISCIPLINARY_SUCCESS,
  UPDATE_DISCIPLINARY_FAILED,
  DELETE_DISCIPLINARY_REQUESTED,
  DELETE_DISCIPLINARY_SUCCESS,
  DELETE_DISCIPLINARY_FAILED,
  CLEAR_DISCIPLINARY_STATE
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
export const disciplinary = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_DISCIPLINARIES_OPTIONS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_DISCIPLINARIES_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        options: payload?.data
      }
    case GET_DISCIPLINARIES_OPTIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_DISCIPLINARIES_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_DISCIPLINARIES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data,
        pagination: payload?.pagination
      }
    case GET_DISCIPLINARIES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_DISCIPLINARY_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_DISCIPLINARY_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    case GET_DISCIPLINARY_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case POST_DISCIPLINARY_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case POST_DISCIPLINARY_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case POST_DISCIPLINARY_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case DELETE_DISCIPLINARY_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case DELETE_DISCIPLINARY_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case DELETE_DISCIPLINARY_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case UPDATE_DISCIPLINARY_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case UPDATE_DISCIPLINARY_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case UPDATE_DISCIPLINARY_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case CLEAR_DISCIPLINARY_STATE:
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
