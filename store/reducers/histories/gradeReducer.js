/* eslint-disable indent */
import {
  GET_GRADES_OPTIONS_REQUESTED,
  GET_GRADES_OPTIONS_SUCCESS,
  GET_GRADES_OPTIONS_FAILED,
  GET_GRADES_REQUESTED,
  GET_GRADES_SUCCESS,
  GET_GRADES_FAILED,
  GET_GRADE_REQUESTED,
  GET_GRADE_SUCCESS,
  GET_GRADE_FAILED,
  POST_GRADE_REQUESTED,
  POST_GRADE_SUCCESS,
  POST_GRADE_FAILED,
  UPDATE_GRADE_REQUESTED,
  UPDATE_GRADE_SUCCESS,
  UPDATE_GRADE_FAILED,
  DELETE_GRADE_REQUESTED,
  DELETE_GRADE_SUCCESS,
  DELETE_GRADE_FAILED,
  CLEAR_GRADE_STATE
} from '../../constants'

const initialState = {
  loading: false,
  isSubmit: false,
  error: null,
  detail: {},
  pagination: {},
  paginationOptions: {},
  data: [],
  options: []
}

// eslint-disable-next-line no-unused-vars
export const grade = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_GRADES_OPTIONS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_GRADES_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        options: payload?.data,
        paginationOptions: payload?.pagination
      }
    case GET_GRADES_OPTIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_GRADES_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_GRADES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data,
        pagination: payload?.pagination
      }
    case GET_GRADES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_GRADE_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_GRADE_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    case GET_GRADE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case POST_GRADE_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case POST_GRADE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case POST_GRADE_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case DELETE_GRADE_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case DELETE_GRADE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case DELETE_GRADE_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case UPDATE_GRADE_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case UPDATE_GRADE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case UPDATE_GRADE_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case CLEAR_GRADE_STATE:
      return {
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
