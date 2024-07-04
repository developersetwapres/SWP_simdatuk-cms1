/* eslint-disable indent */
import {
  GET_NOTES_REQUESTED,
  GET_NOTES_SUCCESS,
  GET_NOTES_FAILED,
  UPDATE_NOTES_REQUESTED,
  UPDATE_NOTES_SUCCESS,
  UPDATE_NOTES_FAILED
} from '@/store/constants'

const initialState = {
  loading: false,
  error: null,
  data: [],
  message: '',
  icon: null
}

export const notes = (state = initialState, actions) => {
  const payload = actions?.payload

  switch (actions.type) {
    case GET_NOTES_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case UPDATE_NOTES_REQUESTED:
      return {
        ...state,
        loading: true
      }

    case GET_NOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data
      }
    case UPDATE_NOTES_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case GET_NOTES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case UPDATE_NOTES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    default:
      return state
  }
}
