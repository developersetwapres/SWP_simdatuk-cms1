/* eslint-disable indent */
import {
  GET_UPDATE_PROVIDER_REQUESTED,
  GET_UPDATE_PROVIDER_SUCCESS,
  GET_UPDATE_PROVIDER_FAILED,
  UPDATE_PROVIDER_BULK_REQUESTED,
  UPDATE_PROVIDER_BULK_SUCCESS,
  UPDATE_PROVIDER_BULK_FAILED
} from '@/store/constants'

import { SUCCESS_ICON, ERROR_ICON } from '@/utils/iconConstant'

const initialState = {
  provider: [],
  error: null,
  loading: false,
  isFetch: false,
  icon: null,
  message: ''
}

export const providerCourse = (state = initialState, action) => {
  const payload = action?.payload
  switch (action.type) {
    case GET_UPDATE_PROVIDER_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_UPDATE_PROVIDER_SUCCESS:
      return {
        ...state,
        loading: false,
        provider: payload?.data
      }
    case GET_UPDATE_PROVIDER_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case UPDATE_PROVIDER_BULK_REQUESTED:
      return {
        ...state,
        loading: true,
        isFetch: true,
        icon: null,
        message: ''
      }
    case UPDATE_PROVIDER_BULK_SUCCESS:
      return {
        ...state,
        loading: false,
        isFetch: false,
        message: payload?.message,
        icon: SUCCESS_ICON
      }
    case UPDATE_PROVIDER_BULK_FAILED:
      return {
        ...state,
        loading: false,
        isFetch: false,
        error: payload?.error,
        icon: ERROR_ICON,
        message: payload?.error
      }
    default:
      return state
  }
}