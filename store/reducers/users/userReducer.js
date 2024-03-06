/* eslint-disable indent */
import {
  GET_USERS_REQUESTED,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  POST_USERS_REQUESTED,
  POST_USERS_SUCCESS,
  POST_USERS_FAILED,
  DELETE_USER_REQUESTED,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  GET_USER_DETAIL_REQUESTED,
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_FAILED,
  UPDATE_USER_REQUESTED,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  GET_USER_COURSE_REQUESTED,
  GET_USER_COURSE_SUCCESS,
  GET_USER_COURSE_FAILED,
  DELETE_LIST_USER_REQUESTED,
  DELETE_LIST_USER_SUCCESS,
  DELETE_LIST_USER_FAILED
} from '@/store/constants'

import { SUCCESS_ICON, ERROR_ICON } from '@/utils/iconConstant'

const initialState = {
  loading: false,
  error: null,
  user: [],
  pagination: {},
  detail: {},
  userCourse: [],
  createLoading: false,
  updateLoading: false,
  message: '',
  icon: null,
  loadingDeleteList: Boolean
}

// eslint-disable-next-line no-unused-vars
export const user = (state = initialState, actions) => {
  const payload = actions?.payload

  switch (actions.type) {
    case GET_USERS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload?.data,
        pagination: payload?.pagination
      }
    case GET_USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case POST_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
        createLoading: true
      }
    case POST_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        createLoading: false
      }
    case POST_USERS_FAILED:
      return {
        ...state,
        loading: false,
        createLoading: false,
        error: payload?.error
      }
    case GET_USER_DETAIL_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    case GET_USER_DETAIL_FAILED:
      return {
        ...state,
        loading: false,
        error: payload
      }
    case DELETE_USER_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case DELETE_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case UPDATE_USER_REQUESTED:
      return {
        ...state,
        loading: true,
        updateLoading: true
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        updateLoading: false
      }
    case UPDATE_USER_FAILED:
      return {
        ...state,
        loading: false,
        updateLoading: false,
        error: payload?.error
      }
    case GET_USER_COURSE_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_USER_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        userCourse: payload?.data
      }
    case GET_USER_COURSE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case DELETE_LIST_USER_REQUESTED:
      return {
        ...state,
        loadingDeleteList: true,
        icon: null,
        message: '',
        error: null
      }
    case DELETE_LIST_USER_SUCCESS:
      return {
        ...state,
        loadingDeleteList: false,
        icon: SUCCESS_ICON,
        message: 'Pengguna berhasil dihapus'
      }
    case DELETE_LIST_USER_FAILED:
      return {
        ...state,
        loadingDeleteList: false,
        icon: ERROR_ICON,
        error: payload?.error,
        message: 'Pengguna gagal dihapus'
      }
    default:
      return state
  }
}