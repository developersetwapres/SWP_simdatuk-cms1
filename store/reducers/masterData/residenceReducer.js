/* eslint-disable indent */
import {
  GET_RESIDENCES_REQUESTED,
  GET_RESIDENCES_SUCCESS,
  GET_RESIDENCES_FAILED,
  CLEAR_RESIDENCE_STATE
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
export const residence = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_RESIDENCES_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_RESIDENCES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data,
        pagination: payload?.pagination
      }
    case GET_RESIDENCES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case CLEAR_RESIDENCE_STATE:
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
