/* eslint-disable indent */
import {
  SUMMARIES_REQUESTED,
  SUMMARIES_SUCCESS,
  SUMMARIES_FAILED
} from '../constants'

const initialState = {
  loading: false,
  message: null,
  redirect: '',
  childMessage: '',
  data: {},
  error: null
}

export const dashboardReducer = (state = initialState, action) => {
  const payload = action?.payload
  switch (action.type) {
    case SUMMARIES_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case SUMMARIES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data
      }
    case SUMMARIES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    default:
      return state
  }
}
