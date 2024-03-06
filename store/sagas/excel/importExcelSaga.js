/**
 * 
 * @module Saga/importExcel
 * 
 * @desc import Excel
 */

import { call, put, takeEvery } from '@redux-saga/core/effects'
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
import { post } from '@/utils/interceptors'

/**
 * Import Excel User Blacklist 
 * 
 * @param {*} payload
 * @returns 
 */
const importExcelUserBlacklistAction = (payload) => {
  return post(`/import/user-blacklist`, payload)
}

/**
 * Import Excel User 
 * 
 * @param {*} payload 
 * @returns
 */
const importExcelUserAction = (payload) => {
  return post(`/import/user`, payload)
}

/**
 * Import Excel User Level 
 * 
 * @param {*} payload 
 * @returns
 */
const importExcelUserLevelAction = (payload) => {
  return post(`/import/user-level`, payload)
}


/**
 * Import Coupon Excel 
 * 
 * @param {*} payload 
 * @returns
 */
const importExcelCouponAction = (payload) => {
  return post(`/import/coupon`, payload)
}

/**
 * import excel user blacklist (Sagas)
 * 
 * @param {*} action 
 * @returns
 */
function* importExcelUserBlacklist(action) {
  try {
    const res = yield call(importExcelUserBlacklistAction, action?.payload)

    const payload = res?.data

    yield put({
      type: IMPORT_EXCEL_USER_BLACKLIST_SUCCESS,
      payload: payload
    })

    // yield put({
    //   type: SET_MODAL,
    //   payload: {
    //     code: res?.data?.meta?.code,
    //     message: 'Import Blacklist berhasil',
    //     redirect: '/manajemen-pengguna/blacklist'
    //   }
    // })


  } catch (err) {
    // yield put({
    //   type: SET_MODAL,
    //   payload: {
    //     code: err?.data?.meta?.code || err?.data?.statusCode,
    //     message: 'Import Blacklist gagal',
    //     childMessage: err?.data?.meta?.message || err?.data?.message
    //   }
    // })
    yield put({
      type: IMPORT_EXCEL_USER_BLACKLIST_FAILED,
      payload: {
        error: err?.data?.meta?.message
      }
    })
  }
}

/**
 * Import Excel User 
 * 
 * @param {*} action 
 * @returns
 */
function* importExcelUser(action) {
  try {
    const res = yield call(importExcelUserAction, action?.payload)

    const payload = res?.data

    yield put({
      type: IMPORT_EXCEL_USER_SUCCESS,
      payload: payload
    })

    // yield put({
    //   type: SET_MODAL,
    //   payload: {
    //     code: res?.data?.meta?.code,
    //     message: 'Import User berhasil',
    //     redirect: '/blacklist'
    //   }
    // })
  } catch (err) {
    // yield put({
    //   type: SET_MODAL,
    //   payload: {
    //     code: err?.data?.meta?.code || err?.data?.statusCode,
    //     message: 'Import User gagal',
    //     childMessage: err?.data?.meta?.message || err?.data?.message
    //   }
    // })
    yield put({
      type: IMPORT_EXCEL_USER_FAILED,
      payload: {
        // modal: true,
        error: err?.data?.meta?.message
      }
    })
  }
}

/**
 * Import excel user level (Sagas)
 * 
 * @param {*} action 
 * @returns
 */
function* importExcelUserLevel(action) {
  try {
    const res = yield call(importExcelUserLevelAction, action?.payload)

    const payload = res?.data

    yield put({
      type: IMPORT_EXCEL_USER_LEVEL_SUCCESS,
      payload: payload
    })

    // yield put({
    //   type: SET_MODAL,
    //   payload: {
    //     code: res?.data?.meta?.code,
    //     message: 'Import User Level berhasil'
    //   }
    // })
  } catch (err) {
    // yield put({
    //   type: SET_MODAL,
    //   payload: {
    //     code: err?.data?.meta?.code || err?.data?.statusCode,
    //     message: 'Import User Level gagal',
    //     childMessage: err?.data?.meta?.message || err?.data?.message
    //   }
    // })
    yield put({
      type: IMPORT_EXCEL_USER_LEVEL_FAILED,
      payload: {
        // modal: true,
        error: err?.data?.meta?.message
      }
    })
  }
}

/**
 * Import Excel Coupon Sagas 
 * 
 * @param {*} action 
 * @returns
 */
function* importExcelCoupon(action) {
  try {
    const res = yield call(importExcelCouponAction, action?.payload)

    const payload = res?.data

    yield put({
      type: IMPORT_EXCEL_COUPON_SUCCESS,
      payload: payload
    })
  } catch (err) {
    yield put({
      type: IMPORT_EXCEL_COUPON_FAILED,
      payload: {
        error: err?.data?.meta?.message
      }
    })
  }
}

function* importExcelSaga() {
  yield takeEvery(IMPORT_EXCEL_USER_BLACKLIST_REQUESTED, importExcelUserBlacklist)
  yield takeEvery(IMPORT_EXCEL_USER_REQUESTED, importExcelUser)
  yield takeEvery(IMPORT_EXCEL_USER_LEVEL_REQUESTED, importExcelUserLevel)
  yield takeEvery(IMPORT_EXCEL_COUPON_REQUESTED, importExcelCoupon)
}

export default importExcelSaga