/* eslint-disable indent */
import {
  GET_TRAININGS_REQUESTED,
  GET_TRAININGS_SUCCESS,
  GET_TRAININGS_FAILED,
  GET_TRAINING_REQUESTED,
  GET_TRAINING_SUCCESS,
  GET_TRAINING_FAILED,
  POST_TRAINING_REQUESTED,
  POST_TRAINING_SUCCESS,
  POST_TRAINING_FAILED,
  UPDATE_TRAINING_REQUESTED,
  UPDATE_TRAINING_SUCCESS,
  UPDATE_TRAINING_FAILED,
  DELETE_TRAINING_REQUESTED,
  DELETE_TRAINING_SUCCESS,
  DELETE_TRAINING_FAILED,
  CLEAR_TRAINING_STATE
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
export const training = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_TRAININGS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_TRAININGS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data,
        pagination: payload?.pagination
      }
    case GET_TRAININGS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_TRAINING_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_TRAINING_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    case GET_TRAINING_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case POST_TRAINING_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case POST_TRAINING_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case POST_TRAINING_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case DELETE_TRAINING_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case DELETE_TRAINING_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case DELETE_TRAINING_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case UPDATE_TRAINING_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case UPDATE_TRAINING_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case UPDATE_TRAINING_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case CLEAR_TRAINING_STATE:
      return {
        loading: false,
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
