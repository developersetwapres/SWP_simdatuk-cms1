/* eslint-disable indent */
import {
  EXPORT_EXCEL_USER_BLACKLIST_REQUESTED,
  EXPORT_EXCEL_USER_BLACKLIST_SUCCESS,
  EXPORT_EXCEL_USER_BLACKLIST_FAILED,
  EXPORT_EXCEL_USER_REQUESTED,
  EXPORT_EXCEL_USER_SUCCESS,
  EXPORT_EXCEL_USER_FAILED,
  EXPORT_EXCEL_USER_LEVEL_REQUESTED,
  EXPORT_EXCEL_USER_LEVEL_SUCCESS,
  EXPORT_EXCEL_USER_LEVEL_FAILED,
  EXPORT_EXCEL_COUPON_REQUESTED,
  EXPORT_EXCEL_COUPON_SUCCESS,
  EXPORT_EXCEL_COUPON_FAILED,
  EXPORT_EXCEL_USER_LIST_REQUESTED,
  EXPORT_EXCEL_USER_LIST_SUCCESS,
  EXPORT_EXCEL_USER_LIST_FAILED,
  EXPORT_REPORT_COUPON_REQUESTED,
  EXPORT_REPORT_COUPON_SUCCESS,
  EXPORT_REPORT_COUPON_FAILED
} from '@/store/constants'

const initialState = {
  loading: false,
  error: null,
  downloadTemplate: {
    user: false,
    userLevel: false,
    blacklist: false,
    coupon: false,
    userList: false,
    couponSubmission: false
  }
}

export const exportExcel = (state = initialState, action) => {
  const payload = action?.payload

  switch (action?.type) {
    case EXPORT_EXCEL_USER_BLACKLIST_REQUESTED:
      return {
        ...state,
        loading: true,
        downloadTemplate: {
          blacklist: true
        }
      }
    case EXPORT_EXCEL_USER_BLACKLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        downloadTemplate: {
          blacklist: false
        }
      }
    case EXPORT_EXCEL_USER_BLACKLIST_FAILED:
      return {
        ...state,
        loading: false,
        downloadTemplate: {
          blacklist: false
        },
        error: payload?.error
      }
    case EXPORT_EXCEL_USER_REQUESTED:
      return {
        ...state,
        loading: true,
        downloadTemplate: {
          user: true
        }
      }
    case EXPORT_EXCEL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        downloadTemplate: {
          user: false
        }
      }
    case EXPORT_EXCEL_USER_FAILED:
      return {
        ...state,
        loading: false,
        downloadTemplate: {
          user: false
        },
        error: payload?.error
      }
    case EXPORT_EXCEL_USER_LEVEL_REQUESTED:
      return {
        ...state,
        loading: true,
        downloadTemplate: {
          userLevel: true
        }
      }
    case EXPORT_EXCEL_USER_LEVEL_SUCCESS:
      return {
        ...state,
        loading: false,
        downloadTemplate: {
          userLevel: false
        }
      }
    case EXPORT_EXCEL_USER_LEVEL_FAILED:
      return {
        ...state,
        loading: false,
        downloadTemplate: {
          userLevel: false
        },
        error: payload?.error
      }
    case EXPORT_EXCEL_COUPON_REQUESTED:
      return {
        ...state,
        loading: true,
        downloadTemplate: {
          coupon: true
        }
      }
    case EXPORT_EXCEL_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        downloadTemplate: {
          coupon: false
        }
      }
    case EXPORT_EXCEL_COUPON_FAILED:
      return {
        ...state,
        loading: false,
        downloadTemplate: {
          coupon: false
        },
        error: payload?.error
      }
    case EXPORT_EXCEL_USER_LIST_REQUESTED:
      return {
        ...state,
        loading: true,
        downloadTemplate: {
          userList: true
        }
      }
    case EXPORT_EXCEL_USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        downloadTemplate: {
          userList: false
        }
      }
    case EXPORT_EXCEL_USER_LIST_FAILED:
      return {
        ...state,
        loading: false,
        downloadTemplate: {
          userList: false
        },
        error: payload?.error
      }
    case EXPORT_REPORT_COUPON_REQUESTED:
      return {
        ...state,
        loading: true,
        downloadTemplate: {
          couponSubmission: true
        }
      }
    case EXPORT_REPORT_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        downloadTemplate: {
          couponSubmission: false
        }
      }
    case EXPORT_REPORT_COUPON_FAILED:
      return {
        ...state,
        loading: false,
        downloadTemplate: {
          couponSubmission: false
        },
        error: payload?.error
      }
    default:
      return state
  }
}