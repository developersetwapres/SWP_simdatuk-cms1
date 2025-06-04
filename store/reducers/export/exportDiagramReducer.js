/* eslint-disable indent */
import {
  CLEAR_DIAGRAMS_EXPORT_STATE,
  EXPORT_DIAGRAMS_FAILED,
  EXPORT_DIAGRAMS_REQUESTED,
  EXPORT_DIAGRAMS_SUCCESS
} from '../../constants'

const initialState = {
  loading: false,
  error: null,
  data: ''
}

// eslint-disable-next-line no-unused-vars
export const exportDiagram = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case EXPORT_DIAGRAMS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case EXPORT_DIAGRAMS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data
      }
    case EXPORT_DIAGRAMS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case CLEAR_DIAGRAMS_EXPORT_STATE:
      return {
        loading: false,
        error: null,
        data: ''
      }
    default:
      return state
  }
}
