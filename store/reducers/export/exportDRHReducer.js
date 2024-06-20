/* eslint-disable indent */
import {
  EXPORT_DRH_REQUESTED,
  EXPORT_DRH_SUCCESS,
  EXPORT_DRH_FAILED,
  CLEAR_EXPORT_DRH_STATE
} from '../../constants'

const initialState = {
  loading: false,
  isSubmit: false,
  error: null,
  detail: {},
  pagination: {},
  data: []
}

// eslint-disable-next-line no-unused-vars
export const exportDRH = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case EXPORT_DRH_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case EXPORT_DRH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data,
        pagination: payload?.pagination
      }
    case EXPORT_DRH_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case CLEAR_EXPORT_DRH_STATE:
      return {
        isSubmit: false,
        error: null,
        detail: {},
        pagination: {},
        data: []
      }
    default:
      return state
  }
}
