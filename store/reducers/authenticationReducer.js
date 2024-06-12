/* eslint-disable indent */
import {
  AUTHENTICATION_REQUESTED,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILED,
  // GET_USER_INFORMATION,
  UPDATE_PASSWORD_REQUESTED,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILED,
  FORGET_PASSWORD_REQUESTED,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAILED,
  GET_PROFILE_REQUESTED,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
  UPDATE_PROFILE_REQUESTED,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  AUTHENTICATION_LOGOUT_REQUESTED,
  AUTHENTICATION_LOGOUT_SUCCESS,
  AUTHENTICATION_LOGOUT_FAILED,
  GET_HASH_URL_PASSWORD_REQUESTED,
  GET_HASH_URL_PASSWORD_SUCCESS,
  GET_HASH_URL_PASSWORD_FAILED,
  RESET_PASSWORD_REQUESTED,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  AUTHENTICATION_QR_REQUESTED,
  AUTHENTICATION_QR_SUCCESS,
  AUTHENTICATION_QR_FAILED
} from '../constants'
import { SUCCESS_ICON, ERROR_ICON } from '@/utils/iconConstant'

const initialState = {
  isAuth: false,
  loading: false,
  error: null,
  userInformation: {},
  message: '',
  loadingProfile: Boolean,
  icon: null,
  resetPassword: {},
  isBusy: false,
  forgetStatus: '',
  statusCode: 200,
  qrCode: null
}

export const authentication = (state = initialState, actions) => {
  // eslint-disable-next-line no-unused-vars
  const payload = actions?.payload

  switch (actions.type) {
    case AUTHENTICATION_REQUESTED:
      return {
        ...state,
        loading: true,
        isBusy: true,
        error: ''
      }
    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
        isBusy: false,
        statusCode: 200
      }
    case AUTHENTICATION_FAILED:
      return {
        ...state,
        loading: false,
        isAuth: false,
        isBusy: false,
        message: payload?.message,
        statusCode: payload?.code,
        error: payload
      }
    // case GET_USER_INFORMATION:
    //   return {
    //     ...state,
    //     loading: false,
    //     isAuth: true,
    //     userInformation: payload?.user,
    //   };
    case UPDATE_PASSWORD_REQUESTED:
      return {
        ...state,
        isBusy: true,
        loading: true
      }
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isBusy: false
      }
    case UPDATE_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        isBusy: false,
        error: payload?.error
      }
    case FORGET_PASSWORD_REQUESTED:
      return {
        ...state,
        loading: true,
        forgetStatus: 'IDLE'
      }
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        forgetStatus: 'SUCCESS'
      }
    case FORGET_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        forgetStatus: 'FAILED',
        error: payload?.error
      }
    case GET_PROFILE_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        userInformation: payload?.data
      }
    case GET_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case UPDATE_PROFILE_REQUESTED:
      return {
        ...state,
        loading: true,
        isBusy: true,
        icon: null,
        message: ''
      }
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isBusy: false,
        icon: SUCCESS_ICON,
        message: 'Perubahan Profil berhasil disimpan'
      }
    case UPDATE_PROFILE_FAILED:
      return {
        ...state,
        error: payload?.error,
        loading: false,
        isBusy: false,
        icon: ERROR_ICON,
        message: 'Perubahan Profil gagal disimpan'
      }
    case AUTHENTICATION_LOGOUT_REQUESTED:
      return {
        ...state,
        loading: true,
        isBusy: true
      }
    case AUTHENTICATION_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isBusy: false
      }
    case AUTHENTICATION_LOGOUT_FAILED:
      return {
        ...state,
        loading: false,
        isBusy: false,
        error: payload?.error
      }
    case GET_HASH_URL_PASSWORD_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_HASH_URL_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        resetPassword: payload?.data
      }
    case GET_HASH_URL_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case RESET_PASSWORD_REQUESTED:
      return {
        ...state,
        loading: true,
        isBusy: true
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isBusy: false
      }
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        isBusy: false,
        error: payload?.error
      }
    case AUTHENTICATION_QR_REQUESTED:
      return {
        ...state,
        loading: true,
        isBusy: true,
        error: null
      }
    case AUTHENTICATION_QR_SUCCESS:
      return {
        ...state,
        loading: false,
        isBusy: false,
        qrCode: payload,
        statusCode: 200
      }
    case AUTHENTICATION_QR_FAILED:
      return {
        ...state,
        loading: false,
        isBusy: false,
        error: payload
      }
    default:
      return state
  }
}
