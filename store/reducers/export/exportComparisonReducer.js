/* eslint-disable indent */
import {
  EXPORT_COMPARISON_REQUESTED,
  EXPORT_COMPARISON_SUCCESS,
  EXPORT_COMPARISON_FAILED,
  CLEAR_EXPORT_COMPARISON_STATE
} from '../../constants'

const initialState = {
  loading: false,
  error: null,
  data: ''
}

export const exportComparisonStore = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case EXPORT_COMPARISON_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case EXPORT_COMPARISON_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data
      }
    case EXPORT_COMPARISON_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case CLEAR_EXPORT_COMPARISON_STATE:
      return {
        error: null,
        loading: false,
        data: ''
      }
    default:
      return state
  }
}
