/* eslint-disable indent */
import {
  EXPORT_PROMOTION_REQUESTED,
  EXPORT_PROMOTION_SUCCESS,
  EXPORT_PROMOTION_FAILED,
  CLEAR_EXPORT_PROMOTION_STATE
} from '../../constants'

const initialState = {
  loading: false,
  error: null,
  data: ''
}

export const exportPromotionData = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case EXPORT_PROMOTION_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case EXPORT_PROMOTION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data
      }
    case EXPORT_PROMOTION_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case CLEAR_EXPORT_PROMOTION_STATE:
      return {
        loading: false,
        error: null,
        data: ''
      }
    default:
      return state
  }
}
