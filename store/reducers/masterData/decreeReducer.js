/* eslint-disable indent */
import {
  GET_DECREES_REQUESTED,
  GET_DECREES_SUCCESS,
  GET_DECREES_FAILED,
  CLEAR_DECREE_STATE
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
export const decree = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_DECREES_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_DECREES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data,
        pagination: payload?.pagination
      }
    case GET_DECREES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case CLEAR_DECREE_STATE:
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
