/* eslint-disable indent */
import {
  IMPORT_EXCEL_USER_BLACKLIST_REQUESTED,
  IMPORT_EXCEL_USER_BLACKLIST_SUCCESS,
  IMPORT_EXCEL_USER_BLACKLIST_FAILED,
  IMPORT_EXCEL_USER_REQUESTED,
  IMPORT_EXCEL_USER_SUCCESS,
  IMPORT_EXCEL_USER_FAILED,
  IMPORT_EXCEL_USER_LEVEL_REQUESTED,
  IMPORT_EXCEL_USER_LEVEL_SUCCESS,
  IMPORT_EXCEL_USER_LEVEL_FAILED,
  IMPORT_EXCEL_COUPON_REQUESTED,
  IMPORT_EXCEL_COUPON_SUCCESS,
  IMPORT_EXCEL_COUPON_FAILED
} from '@/store/constants'
import { SUCCESS_ICON, ERROR_ICON } from '@/utils/iconConstant'
const initialState = {
  loading: Boolean,
  error: null,
  message: '',
  icon: null
}

export const importExcel = (state = initialState, action) => {
  const payload = action?.payload

  switch (action?.type) {
    case IMPORT_EXCEL_USER_BLACKLIST_REQUESTED:
      return {
        ...state,
        loading: true,
        icon: null,
        message: '',
        error: null
      }
    case IMPORT_EXCEL_USER_BLACKLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        icon: SUCCESS_ICON,
        message: 'Pengguna yang di blacklist berhasil ditambahkan'
      }
    case IMPORT_EXCEL_USER_BLACKLIST_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error,
        icon: ERROR_ICON,
        message: 'Pengguna yang di blacklist gagal ditambahkan'
      }
    case IMPORT_EXCEL_USER_REQUESTED:
      return {
        ...state,
        loading: true,
        icon: '',
        message: ''
      }
    case IMPORT_EXCEL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        icon: SUCCESS_ICON,
        message: 'Tambah Pengguna berhasil disimpan'
      }
    case IMPORT_EXCEL_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error,
        icon: ERROR_ICON,
        message: 'Tambah Pengguna gagal disimpan'
      }
    case IMPORT_EXCEL_USER_LEVEL_REQUESTED:
      return {
        ...state,
        loading: true,
        icon: '',
        message: ''
      }
    case IMPORT_EXCEL_USER_LEVEL_SUCCESS:
      return {
        ...state,
        loading: false,
        icon: SUCCESS_ICON,
        message: 'Update Level Pengguna berhasil disimpan'
      }
    case IMPORT_EXCEL_USER_LEVEL_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error,
        icon: ERROR_ICON,
        message: 'Update Level Pengguna gagal disimpan'
      }
    case IMPORT_EXCEL_COUPON_REQUESTED:
      return {
        ...state,
        loading: true,
        icon: '',
        message: ''
      }
    case IMPORT_EXCEL_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        icon: SUCCESS_ICON,
        message: 'Kupon berhasil disimpan'
      }
    case IMPORT_EXCEL_COUPON_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error,
        icon: ERROR_ICON,
        message: 'Kupon gagal disimpan'
      }
    default:
      return state
  }
}