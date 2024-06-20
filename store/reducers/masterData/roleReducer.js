/* eslint-disable indent */
import {
  GET_ROLES_REQUESTED,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILED,
  GET_ROLES_OPTIONS_REQUESTED,
  GET_ROLES_OPTIONS_SUCCESS,
  GET_ROLES_OPTIONS_FAILED,
  GET_ROLE_REQUESTED,
  GET_ROLE_SUCCESS,
  GET_ROLE_FAILED,
  POST_ROLE_REQUESTED,
  POST_ROLE_SUCCESS,
  POST_ROLE_FAILED,
  UPDATE_ROLE_REQUESTED,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAILED,
  DELETE_ROLE_REQUESTED,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAILED,
  GET_PERMISSIONS_REQUESTED,
  GET_PERMISSIONS_SUCCESS,
  GET_PERMISSIONS_FAILED,
  CLEAR_ROLE_STATE
} from '@/store/constants'

const initialState = {
  data: [],
  dataPermissions: [],
  options: [],
  detail: {},
  pagination: {},
  loading: false,
  error: null,
  isSubmit: false
}

// eslint-disable-next-line no-unused-vars
export const role = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_ROLES_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_ROLES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data,
        pagination: payload?.pagination
      }
    case GET_ROLES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_ROLES_OPTIONS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_ROLES_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        options: payload?.data
      }
    case GET_ROLES_OPTIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_ROLE_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_ROLE_SUCCESS: {
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    }
    case GET_ROLE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case POST_ROLE_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case POST_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case POST_ROLE_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case UPDATE_ROLE_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case UPDATE_ROLE_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case DELETE_ROLE_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case DELETE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case DELETE_ROLE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error,
        isSubmit: false
      }
    case GET_PERMISSIONS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_PERMISSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        dataPermissions: payload?.data
      }
    case GET_PERMISSIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case CLEAR_ROLE_STATE:
      return {
        data: [],
        dataPermissions: [],
        pagination: {},
        loading: false,
        error: null,
        detail: {},
        isSubmit: false
      }
    default:
      return state
  }
}
