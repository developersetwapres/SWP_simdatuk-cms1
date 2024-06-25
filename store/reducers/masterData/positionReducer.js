/* eslint-disable indent */
import {
  GET_POSITIONS_ORDERS_REQUESTED,
  GET_POSITIONS_ORDERS_SUCCESS,
  GET_POSITIONS_ORDERS_FAILED,
  GET_POSITIONS_REQUESTED,
  GET_POSITIONS_SUCCESS,
  GET_POSITIONS_FAILED,
  GET_POSITION_REQUESTED,
  GET_POSITION_SUCCESS,
  GET_POSITION_FAILED,
  POST_POSITION_REQUESTED,
  POST_POSITION_SUCCESS,
  POST_POSITION_FAILED,
  UPDATE_POSITION_REQUESTED,
  UPDATE_POSITION_SUCCESS,
  UPDATE_POSITION_FAILED,
  DELETE_POSITION_REQUESTED,
  DELETE_POSITION_SUCCESS,
  DELETE_POSITION_FAILED,
  CLEAR_POSITION_STATE
} from '../../constants'

const initialState = {
  loading: false,
  isSubmit: false,
  error: null,
  detail: {},
  pagination: {},
  data: [],
  orders: []
}

// eslint-disable-next-line no-unused-vars
export const position = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_POSITIONS_ORDERS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_POSITIONS_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload?.data
      }
    case GET_POSITIONS_ORDERS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_POSITIONS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_POSITIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data,
        pagination: payload?.pagination
      }
    case GET_POSITIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_POSITION_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_POSITION_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    case GET_POSITION_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case POST_POSITION_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case POST_POSITION_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case POST_POSITION_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case DELETE_POSITION_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case DELETE_POSITION_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case DELETE_POSITION_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case UPDATE_POSITION_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case UPDATE_POSITION_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case UPDATE_POSITION_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case CLEAR_POSITION_STATE:
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
