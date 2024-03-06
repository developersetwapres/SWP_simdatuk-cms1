/* eslint-disable indent */
import {
  GET_ACTIVITY_LOGS_REQUESTED,
  GET_ACTIVITY_LOGS_SUCCESS,
  GET_ACTIVITY_LOGS_FAILED
} from '@/store/constants'

const initialState = {
  log: [],
  pagination: {},
  loading: false,
  error: null
}

export const activitylog = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_ACTIVITY_LOGS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_ACTIVITY_LOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        log: payload?.data,
        pagination: payload?.pagination
      }
    case GET_ACTIVITY_LOGS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    default:
      return state
  }
}