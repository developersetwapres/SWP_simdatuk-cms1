/* eslint-disable indent */
import {
  GET_BLACKLIST_REQUESTED,
  GET_BLACKLIST_SUCCESS,
  GET_BLACKLIST_FAILED,
  GET_DETAIL_BLACKLIST_REQUESTED,
  GET_DETAIL_BLACKLIST_SUCCESS,
  GET_DETAIL_BLACKLIST_FAILED,
  OPEN_BLACKLIST_REQUESTED,
  OPEN_BLACKLIST_SUCCESS,
  OPEN_BLACKLIST_FAILED
} from '@/store/constants'

const initialState = {
  blacklist: [],
  detail: {},
  pagination: {},
  loading: false,
  error: null,
  isSubmit: false
}

// eslint-disable-next-line no-unused-vars
export const blacklist = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_BLACKLIST_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_BLACKLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        blacklist: payload?.data,
        pagination: payload?.pagination
      }
    case GET_BLACKLIST_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_DETAIL_BLACKLIST_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_DETAIL_BLACKLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    case GET_DETAIL_BLACKLIST_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case OPEN_BLACKLIST_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case OPEN_BLACKLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case OPEN_BLACKLIST_FAILED:
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