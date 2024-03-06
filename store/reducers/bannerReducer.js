/* eslint-disable indent */
import {
  GET_BANNERS_REQUESTED,
  GET_BANNERS_SUCCESS,
  GET_BANNERS_FAILED,
  DELETE_BANNER_REQUESTED,
  DELETE_BANNER_SUCCESS,
  DELETE_BANNER_FAILED,
  POST_BANNER_REQUESTED,
  POST_BANNER_SUCCESS,
  POST_BANNER_FAILED,
  GET_BANNER_REQUESTED,
  GET_BANNER_SUCCESS,
  GET_BANNER_FAILED,
  UPDATE_BANNER_REQUESTED,
  UPDATE_BANNER_SUCCESS,
  UPDATE_BANNER_FAILED,
  DELETE_LIST_BANNER_REQUESTED,
  DELETE_LIST_BANNER_SUCCESS,
  DELETE_LIST_BANNER_FAILED,
  GET_SORT_BANNER_REQUESTED,
  GET_SORT_BANNER_SUCCESS,
  GET_SORT_BANNER_FAILED,
  PATCH_SORT_BANNER_REQUESTED,
  PATCH_SORT_BANNER_SUCCESS,
  PATCH_SORT_BANNER_FAILED
} from '../constants'

const initialState = {
  loading: false,
  isSubmit: false,
  error: null,
  sortBanner: [],
  detail: {},
  pagination: {},
  banner: []
}

// eslint-disable-next-line no-unused-vars
export const banner = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_BANNERS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_BANNERS_SUCCESS:
      return {
        ...state,
        loading: false,
        banner: payload?.data,
        pagination: payload?.pagination
      }
    case GET_BANNERS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case DELETE_BANNER_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case DELETE_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case DELETE_BANNER_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case POST_BANNER_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case POST_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case POST_BANNER_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case GET_BANNER_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    case GET_BANNER_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case UPDATE_BANNER_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case UPDATE_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case UPDATE_BANNER_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case DELETE_LIST_BANNER_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case DELETE_LIST_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case DELETE_LIST_BANNER_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case GET_SORT_BANNER_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_SORT_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        sortBanner: payload?.data
      }
    case GET_SORT_BANNER_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case PATCH_SORT_BANNER_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case PATCH_SORT_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case PATCH_SORT_BANNER_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    default:
      return state
  }
}