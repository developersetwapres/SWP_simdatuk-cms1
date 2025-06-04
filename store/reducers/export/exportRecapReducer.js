/* eslint-disable indent */
import {
  EXPORT_RECAP_REQUESTED,
  EXPORT_RECAP_SUCCESS,
  EXPORT_RECAP_FAILED,
  CLEAR_EXPORT_RECAP_STATE
} from '../../constants'

const initialState = {
  loading: false,
  error: null,
  data: ''
}

// eslint-disable-next-line no-unused-vars
export const exportRecapData = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case EXPORT_RECAP_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case EXPORT_RECAP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data
      }
    case EXPORT_RECAP_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case CLEAR_EXPORT_RECAP_STATE:
      return {
        loading: false,
        error: null,
        data: ''
      }
    default:
      return state
  }
}
