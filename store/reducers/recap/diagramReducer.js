/* eslint-disable indent */
import {
  CLEAR_DIAGRAMS_STATE,
  EXPORT_DIAGRAMS_FAILED,
  EXPORT_DIAGRAMS_REQUESTED,
  EXPORT_DIAGRAMS_SUCCESS,
  GET_DIAGRAMS_FAILED,
  GET_DIAGRAMS_REQUESTED,
  GET_DIAGRAMS_SUCCESS
} from '../../constants'

const initialState = {
  loading: false,
  isSubmit: false,
  error: null,
  detail: {},
  pagination: {},
  data: [],
  export: null
}

// eslint-disable-next-line no-unused-vars
export const diagram = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_DIAGRAMS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_DIAGRAMS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data,
        pagination: payload?.pagination
      }
    case GET_DIAGRAMS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case EXPORT_DIAGRAMS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case EXPORT_DIAGRAMS_SUCCESS:
      return {
        ...state,
        loading: false,
        export: payload?.data
      }
    case EXPORT_DIAGRAMS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case CLEAR_DIAGRAMS_STATE:
      return {
        loading: false,
        isSubmit: false,
        error: null,
        detail: {},
        pagination: {},
        data: [],
        export: null
      }
    default:
      return state
  }
}
