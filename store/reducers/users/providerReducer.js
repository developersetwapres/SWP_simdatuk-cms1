/* eslint-disable indent */
import {
  GET_PROVIDER_REQUESTED,
  GET_PROVIDER_SUCCESS,
  GET_PROVIDER_FAILED,
  POST_PROVIDER_REQUESTED,
  POST_PROVIDER_SUCCESS,
  POST_PROVIDER_FAILED,
  GET_DETAIL_PROVIDER_REQUESTED,
  GET_DETAIL_PROVIDER_FAILED,
  GET_DETAIL_PROVIDER_SUCCESS,
  UPDATE_PROVIDER_REQUESTED,
  UPDATE_PROVIDER_SUCCESS,
  UPDATE_PROVIDER_FAILED,
  DELETE_PROVIDER_REQUESTED,
  DELETE_PROVIDER_SUCCESS,
  DELETE_PROVIDER_FAILED,
  DELETE_LIST_PROVIDER_REQUESTED,
  DELETE_LIST_PROVIDER_SUCCESS,
  DELETE_LIST_PROVIDER_FAILED
} from '@/store/constants'

const initialState = {
  provider: [],
  loading: false,
  error: null,
  pagination: {},
  detail: {},
  isSubmit: false
}

export const provider = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_PROVIDER_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_PROVIDER_SUCCESS:
      return {
        ...state,
        loading: false,
        provider: payload?.data,
        pagination: payload?.pagination
      }
    case GET_PROVIDER_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case POST_PROVIDER_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case POST_PROVIDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case POST_PROVIDER_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case GET_DETAIL_PROVIDER_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_DETAIL_PROVIDER_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    case GET_DETAIL_PROVIDER_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case UPDATE_PROVIDER_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case UPDATE_PROVIDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case UPDATE_PROVIDER_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case DELETE_PROVIDER_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case DELETE_PROVIDER_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case DELETE_PROVIDER_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case DELETE_LIST_PROVIDER_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case DELETE_LIST_PROVIDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case DELETE_LIST_PROVIDER_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error,
        isSubmit: false
      }
    default:
      return state
  }
}