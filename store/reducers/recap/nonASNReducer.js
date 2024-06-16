/* eslint-disable indent */
import {
  GET_NON_ASN_RECAP_REQUESTED,
  GET_NON_ASN_RECAP_SUCCESS,
  GET_NON_ASN_RECAP_FAILED,
  GET_NON_ASN_RECAP_CATEGORY_REQUESTED,
  GET_NON_ASN_RECAP_CATEGORY_SUCCESS,
  GET_NON_ASN_RECAP_CATEGORY_FAILED
} from '@/store/constants'

const initialState = {
  loading: false,
  error: null,
  data: {},
  message: '',
  icon: null
}

// eslint-disable-next-line no-unused-vars
export const recapNonASN = (state = initialState, actions) => {
  const payload = actions?.payload

  switch (actions.type) {
    case GET_NON_ASN_RECAP_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_NON_ASN_RECAP_CATEGORY_REQUESTED:
      return {
        ...state,
        loading: true
      }

    case GET_NON_ASN_RECAP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data
      }
    case GET_NON_ASN_RECAP_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data
      }

    case GET_NON_ASN_RECAP_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_NON_ASN_RECAP_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    default:
      return state
  }
}
