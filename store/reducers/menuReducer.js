/* eslint-disable indent */
import {
  GET_MENU_REQUESTED,
  GET_MENU_SUCCESS,
  GET_MENU_FAILED,
  GET_DETAIL_MENU_REQUESTED,
  GET_DETAIL_MENU_SUCCESS,
  GET_DETAIL_MENU_FAILED,
  POST_MENU_REQUESTED,
  POST_MENU_SUCCESS,
  POST_MENU_FAILED,
  DELETE_MENU_REQUESTED,
  DELETE_MENU_SUCCESS,
  DELETE_MENU_FAILED
} from '../constants'

const initialState = {
  menu: [],
  pagination: {},
  error: null,
  loading: false,
  detail: {}
}

export const menu = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_MENU_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_MENU_SUCCESS:
      return {
        ...state,
        loading: false,
        menu: payload?.data,
        pagination: payload?.pagination
      }
    case GET_MENU_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_DETAIL_MENU_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_DETAIL_MENU_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    case GET_DETAIL_MENU_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case POST_MENU_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case POST_MENU_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case POST_MENU_FAILED:
      return {
        ...state,
        loading: false
      }
    case DELETE_MENU_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case DELETE_MENU_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case DELETE_MENU_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    default:
      return state
  }
}