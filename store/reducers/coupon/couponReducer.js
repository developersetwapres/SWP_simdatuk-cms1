/* eslint-disable indent */
import {
  GET_COUPON_REQUESTED,
  GET_COUPON_SUCCESS,
  GET_COUPON_FAILED,
  GET_DETAIL_COUPON_REQUESTED,
  GET_DETAIL_COUPON_SUCCESS,
  GET_DETAIL_COUPON_FAILED,
  POST_COUPON_REQUESTED,
  POST_COUPON_SUCCESS,
  POST_COUPON_FAILED,
  DELETE_COUPON_REQUESTED,
  DELETE_COUPON_SUCCESS,
  DELETE_COUPON_FAILED,
  UPDATE_COUPON_REQUESTED,
  UPDATE_COUPON_SUCCESS,
  UPDATE_COUPON_FAILED,
  DELETE_COUPON_LIST_REQUESTED,
  DELETE_COUPON_LIST_SUCCESS,
  DELETE_COUPON_LIST_FAILED
} from '@/store/constants'

const initialState = {
  coupon: [],
  pagination: {},
  loading: false,
  error: null,
  detail: {},
  isSubmit: false
}

// eslint-disable-next-line no-unused-vars
export const coupon = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_COUPON_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        coupon: payload?.data,
        pagination: payload?.pagination
      }
    case GET_COUPON_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_DETAIL_COUPON_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_DETAIL_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    case GET_DETAIL_COUPON_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case POST_COUPON_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case POST_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case POST_COUPON_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case DELETE_COUPON_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case DELETE_COUPON_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case DELETE_COUPON_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case UPDATE_COUPON_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case UPDATE_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case UPDATE_COUPON_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case DELETE_COUPON_LIST_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case DELETE_COUPON_LIST_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case DELETE_COUPON_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    default:
      return state
  }
}