/* eslint-disable indent */
import {
  GET_GROUPS_REQUESTED,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAILED,
  CLEAR_GROUP_STATE
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
export const group = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_GROUPS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_GROUPS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data,
        pagination: payload?.pagination
      }
    case GET_GROUPS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case CLEAR_GROUP_STATE:
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
