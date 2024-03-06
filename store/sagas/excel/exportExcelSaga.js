/**
 * 
 * @module Saga/ExportExcel 
 * 
 * @desc Export Excel
 */

import { call, put, takeEvery } from '@redux-saga/core/effects'
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
  SET_MODAL,
  EXPORT_EXCEL_USER_LIST_REQUESTED,
  EXPORT_EXCEL_USER_LIST_SUCCESS,
  EXPORT_EXCEL_USER_LIST_FAILED,
  EXPORT_REPORT_COUPON_REQUESTED,
  EXPORT_REPORT_COUPON_SUCCESS,
  EXPORT_REPORT_COUPON_FAILED
} from '@/store/constants'
import { getBlob } from '@/utils/interceptors'

/**
 * Export Excel User Blacklist 
 * 
 * @returns
 */
const exportExcelUserBlacklistAction = () => {
  return getBlob(`/import/user-blacklist`)
}

/**
 * Export Excel User 
 * 
 * @returns
 */
const exportExcelUserAction = () => {
  return getBlob(`/import/user`)
}

/**
 * Export Excel User Level 
 * 
 * @returns
 */
const exportExcelUserLevelAction = () => {
  return getBlob(`/import/user-level`)
}

/**
 * Export Excel Coupon 
 * 
 * @returns
 */
const exportExcelCouponAction = () => {
  return getBlob(`/import/coupon`)
}

/**
 * Export Excel List User 
 * 
 * @returns
 */
const exportExcelListUsers = () => {
  return getBlob(`/export/users`)
}

/**
 * Export Report Excel 
 * 
 * @returns
 */
const exportReportExcelCoupon = (payload) => {
  if (payload.start_date === null && payload.end_date === null) {
    return getBlob(`/export/coupon-submission`)
  } else {
    return getBlob(`/export/coupon-submission?start_date=${payload.start_date}&end_date=${payload.end_date}`)
  }

}


/**
 * Export Excel User blacklist (Sagas)
 * 
 * @param {*} action 
 * @returns
 */
function* exportExcelUserBlacklist(action) {
  try {
    const res = yield call(exportExcelUserBlacklistAction, action?.payload)



    yield put({
      type: EXPORT_EXCEL_USER_BLACKLIST_SUCCESS
    })

    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `user-blacklist-${new Date().getUTCFullYear()}.xlsx`)
    document.body.appendChild(link)
    link.click()

  } catch (err) {
    yield put({
      type: SET_MODAL,
      payload: {
        code: err?.data?.meta?.code || err?.data?.statusCode,
        message: 'Download File Template gagal',
        childMessage: err?.data?.meta?.message || err?.data?.message
      }
    })
    yield put({
      type: EXPORT_EXCEL_USER_BLACKLIST_FAILED,
      payload: {
        modal: true,
        error: err?.data?.meta?.message
      }
    })
  }
}


/**
 * Export Excel User 
 * 
 * @param {*} action 
 * @returns
 */
function* exportExcelUser(action) {
  try {
    const res = yield call(exportExcelUserAction, action?.payload)


    yield put({
      type: EXPORT_EXCEL_USER_SUCCESS
    })

    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `user-${new Date().getUTCFullYear()}.xlsx`)
    document.body.appendChild(link)
    link.click()
  } catch (err) {
    yield put({
      type: SET_MODAL,
      payload: {
        code: err?.data?.meta?.code || err?.data?.statusCode,
        message: 'Download File Template gagal',
        childMessage: err?.data?.meta?.message || err?.data?.message
      }
    })
    yield put({
      type: EXPORT_EXCEL_USER_FAILED,
      payload: {
        modal: true,
        error: err?.data?.meta?.message
      }
    })
  }
}

/**
 * Export Excel Level 
 * 
 * @param {*} action 
 * @returns
 */
function* exportExcelUserLevel(action) {
  try {
    const res = yield call(exportExcelUserLevelAction, action?.payload)

    yield put({
      type: EXPORT_EXCEL_USER_LEVEL_SUCCESS
    })

    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `user-level-${new Date().getUTCFullYear()}.xlsx`)
    document.body.appendChild(link)
    link.click()
  } catch (err) {
    yield put({
      type: SET_MODAL,
      payload: {
        code: err?.data?.meta?.code || err?.data?.statusCode,
        message: 'Download File Template gagal',
        childMessage: err?.data?.meta?.message || err?.data?.message
      }
    })
    yield put({
      type: EXPORT_EXCEL_USER_LEVEL_FAILED,
      payload: {
        modal: true,
        error: err?.data?.meta?.message
      }
    })
  }
}

/**
 * Export Excel COupon 
 * 
 * @param {*} action 
 * @returns
 */
function* exportExcelCoupon(action) {
  try {
    const res = yield call(exportExcelCouponAction, action?.payload)

    yield put({
      type: EXPORT_EXCEL_COUPON_SUCCESS
    })
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `coupon-${new Date().getUTCFullYear()}.xlsx`)
    document.body.appendChild(link)
    link.click()
  } catch (err) {
    yield put({
      type: SET_MODAL,
      payload: {
        code: err?.data?.meta?.code || err?.data?.statusCode,
        message: 'Download File Template gagal',
        childMessage: err?.data?.meta?.message || err?.data?.message
      }
    })
    yield put({
      type: EXPORT_EXCEL_COUPON_FAILED,
      payload: {
        modal: true,
        error: err?.data?.meta?.message
      }
    })
  }
}

/**
 * Export User List 
 * 
 * @param {*} action 
 * @returns
 */
function* exportUserList(action) {
  try {
    const res = yield call(exportExcelListUsers, action?.payload)

    yield put({
      type: EXPORT_EXCEL_USER_LIST_SUCCESS
    })

    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `user-list-${new Date().getUTCFullYear()}.xlsx`)
    document.body.appendChild(link)
    link.click()
  } catch (err) {
    yield put({
      type: SET_MODAL,
      payload: {
        code: err?.data?.meta?.code || err?.data?.statusCode,
        message: 'Export File gagal',
        childMessage: err?.data?.meta?.message || err?.data?.message
      }
    })
    yield put({
      type: EXPORT_EXCEL_USER_LIST_FAILED,
      payload: {
        modal: true,
        error: err?.data?.meta?.message
      }
    })
  }
}

/**
 * Export Report Coupon
 * 
 * @param {*} action 
 * @returns 
 */
function* exportReportCouponSaga(action) {
  try {
    const res = yield call(exportReportExcelCoupon, action?.payload)

    yield put({
      type: EXPORT_REPORT_COUPON_SUCCESS
    })


    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `coupon-submission-${new Date().getUTCFullYear()}.xlsx`)
    document.body.appendChild(link)
    link.click()
  } catch (err) {
    yield put({
      type: SET_MODAL,
      payload: {
        code: err?.data?.meta?.code || err?.data?.statusCode,
        message: 'Unduh Laporan gagal',
        childMessage: err?.data?.meta?.message || err?.data?.message || 'Data tidak ditemukan'
      }
    })
    yield put({
      type: EXPORT_REPORT_COUPON_FAILED,
      payload: {
        modal: true,
        error: err?.data?.meta?.message
      }
    })
  }
}




function* exportExcelSaga() {
  yield takeEvery(EXPORT_EXCEL_USER_BLACKLIST_REQUESTED, exportExcelUserBlacklist)
  yield takeEvery(EXPORT_EXCEL_USER_REQUESTED, exportExcelUser)
  yield takeEvery(EXPORT_EXCEL_USER_LEVEL_REQUESTED, exportExcelUserLevel)
  yield takeEvery(EXPORT_EXCEL_COUPON_REQUESTED, exportExcelCoupon)
  yield takeEvery(EXPORT_EXCEL_USER_LIST_REQUESTED, exportUserList)
  yield takeEvery(EXPORT_REPORT_COUPON_REQUESTED, exportReportCouponSaga)
}

export default exportExcelSaga