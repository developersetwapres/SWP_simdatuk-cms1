/* eslint-disable indent */
import {
  GET_COUPON_SUBMISSION_REQUESTED,
  GET_COUPON_SUBMISSION_SUCCESS,
  GET_COUPON_SUBMISSION_FAILED,
  GET_DETAIL_COUPON_SUBMISSION_REQUESTED,
  GET_DETAIL_COUPON_SUBMISSION_SUCCESS,
  GET_DETAIL_COUPON_SUBMISSION_FAILED,
  REJECT_COUPON_SUBMISSION_REQUESTED,
  REJECT_COUPON_SUBMISSION_SUCCESS,
  REJECT_COUPON_SUBMISSION_FAILED,
  APPROVE_COUPON_SUBMISSION_REQUESTED,
  APPROVE_COUPON_SUBMISSION_SUCCESS,
  APPROVE_COUPON_SUBMISSION_FAILED,
  REJECT_COUPON_SUBMISSION_LIST_REQUESTED,
  REJECT_COUPON_SUBMISSION_LIST_SUCCESS,
  REJECT_COUPON_SUBMISSION_LIST_FAILED,
  APPROVE_COUPON_SUBMISSION_LIST_REQUSTED,
  APPROVE_COUPON_SUBMISSION_LIST_SUCCESS,
  APPROVE_COUPON_SUBMISSION_LIST_FAILED
} from '@/store/constants'

import { SUCCESS_ICON, ERROR_ICON } from '@/utils/iconConstant'

const initialState = {
  couponSubmission: [],
  detail: {},
  pagination: {},
  loading: false,
  error: null,
  icon: null,
  message: '',
  loadingList: false
}

// eslint-disable-next-line no-unused-vars
export const couponSubmission = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_COUPON_SUBMISSION_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COUPON_SUBMISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        couponSubmission: payload?.data,
        pagination: payload?.pagination
      }
    case GET_COUPON_SUBMISSION_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_DETAIL_COUPON_SUBMISSION_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_DETAIL_COUPON_SUBMISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    case GET_DETAIL_COUPON_SUBMISSION_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case REJECT_COUPON_SUBMISSION_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case REJECT_COUPON_SUBMISSION_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case REJECT_COUPON_SUBMISSION_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case APPROVE_COUPON_SUBMISSION_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case APPROVE_COUPON_SUBMISSION_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case APPROVE_COUPON_SUBMISSION_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case REJECT_COUPON_SUBMISSION_LIST_REQUESTED:
      return {
        ...state,
        loading: true,
        icon: null,
        message: ''
      }
    case REJECT_COUPON_SUBMISSION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        message: 'Pengajuan Kupon berhasil ditolak',
        icon: SUCCESS_ICON
      }
    case REJECT_COUPON_SUBMISSION_LIST_FAILED:
      return {
        ...state,
        loading: false,
        message: 'Pengajuan Kupon gagal ditolak',
        icon: ERROR_ICON,
        error: payload?.error
      }
    case APPROVE_COUPON_SUBMISSION_LIST_REQUSTED:
      return {
        ...state,
        loadingList: true,
        icon: null,
        message: ''
      }
    case APPROVE_COUPON_SUBMISSION_LIST_SUCCESS:
      return {
        ...state,
        loadingList: false,
        icon: SUCCESS_ICON,
        message: 'Pengajuan Kupon berhasil disetujui'
      }
    case APPROVE_COUPON_SUBMISSION_LIST_FAILED:
      return {
        ...state,
        loadingList: false,
        error: payload,
        message: 'Pengajuan Kupon gagal disetujui',
        icon: ERROR_ICON
      }
    default:
      return state
  }
}