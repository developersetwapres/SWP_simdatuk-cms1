/* eslint-disable indent */
import {
  GET_COURSE_CATEGORY_REQUESTED,
  GET_COURSE_CATEGORY_SUCCESS,
  GET_COURSE_CATEGORY_FAILED,
  DELETE_COURSE_CATEGORY_REQUESTED,
  DELETE_COURSE_CATEGORY_SUCCESS,
  DELETE_COURSE_CATEGORY_FAILED,
  GET_COURSE_CATEGORY_ID_REQUESTED,
  GET_COURSE_CATEGORY_ID_SUCCESS,
  GET_COURSE_CATEGORY_ID_FAILED,
  POST_COURSE_CATEGORY_REQUESTED,
  POST_COURSE_CATEGORY_SUCCESS,
  POST_COURSE_CATEGORY_FAILED,
  DELETE_COURSE_CATEGORY_LIST_REQUESTED,
  DELETE_COURSE_CATEGORY_LIST_SUCCESS,
  DELETE_COURSE_CATEGORY_LIST_FAILED,
  UPDATE_COURSE_CATEGORY_REQUESTED,
  UPDATE_COURSE_CATEGORY_SUCCESS,
  UPDATE_COURSE_CATEGORY_FAILED,
  GET_PROGRAM_PKASN_REQUESTED,
  GET_PROGRAM_PKASN_SUCCESS,
  GET_PROGRAM_PKASN_FAILED
} from '../constants'

const initialState = {
  category: [],
  detail: {},
  pagination: {},
  loading: false,
  isBusy: false,
  error: null,
  pkasn: []
}

// eslint-disable-next-line no-unused-vars
export const category = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_COURSE_CATEGORY_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COURSE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        category: payload?.data,
        pagination: payload?.pagination
      }
    case GET_COURSE_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case DELETE_COURSE_CATEGORY_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case DELETE_COURSE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case DELETE_COURSE_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_COURSE_CATEGORY_ID_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COURSE_CATEGORY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    case GET_COURSE_CATEGORY_ID_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case POST_COURSE_CATEGORY_REQUESTED:
      return {
        ...state,
        loading: true,
        isBusy: true
      }
    case POST_COURSE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isBusy: false
      }
    case POST_COURSE_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        isBusy: false,
        error: payload?.error
      }
    case DELETE_COURSE_CATEGORY_LIST_REQUESTED:
      return {
        ...state,
        loading: true,
        isBusy: true
      }
    case DELETE_COURSE_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        isBusy: false
      }
    case DELETE_COURSE_CATEGORY_LIST_FAILED:
      return {
        ...state,
        loading: false,
        isBusy: false,
        error: payload?.error
      }
    case UPDATE_COURSE_CATEGORY_REQUESTED:
      return {
        ...state,
        loading: true,
        isBusy: true
      }
    case UPDATE_COURSE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isBusy: false
      }
    case UPDATE_COURSE_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        isBusy: false,
        error: payload?.error
      }
    case GET_PROGRAM_PKASN_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_PROGRAM_PKASN_SUCCESS:
      return {
        ...state,
        loading: false,
        pkasn: payload?.data
      }
    case GET_PROGRAM_PKASN_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    default:
      return state
  }
}