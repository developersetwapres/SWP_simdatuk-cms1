/* eslint-disable indent */
import {
  GET_COMPOSITION_REQUESTED,
  GET_COMPOSITION_SUCCESS,
  GET_COMPOSITION_FAILED,
  GET_COMPOSITION_CATEGORY_REQUESTED,
  GET_COMPOSITION_CATEGORY_SUCCESS,
  GET_COMPOSITION_CATEGORY_FAILED
} from '@/store/constants'

const initialState = {
  loading: false,
  error: null,
  data: {},
  message: '',
  icon: null
}

// eslint-disable-next-line no-unused-vars
export const recapComposition = (state = initialState, actions) => {
  const payload = actions?.payload

  switch (actions.type) {
    case GET_COMPOSITION_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COMPOSITION_CATEGORY_REQUESTED:
      return {
        ...state,
        loading: true
      }

    case GET_COMPOSITION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data
      }
    case GET_COMPOSITION_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data
      }

    case GET_COMPOSITION_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_COMPOSITION_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    default:
      return state
  }
}
