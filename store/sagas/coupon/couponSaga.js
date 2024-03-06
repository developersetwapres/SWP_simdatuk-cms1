/**
 * 
 * @module Saga/coupon/coupon 
 * 
 * @desc Coupon
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_COUPON_REQUESTED,
  GET_COUPON_SUCCESS,
  GET_COUPON_FAILED,
  GET_DETAIL_COUPON_REQUESTED,
  GET_DETAIL_COUPON_SUCCESS,
  GET_DETAIL_COUPON_FAILED,
  POST_COUPON_REQUESTED,
  POST_COUPON_SUCCESS,
  POST_COUPON_FAILED,
  DELETE_COUPON_REQUESTED,
  DELETE_COUPON_SUCCESS,
  DELETE_COUPON_FAILED,
  UPDATE_COUPON_REQUESTED,
  UPDATE_COUPON_SUCCESS,
  UPDATE_COUPON_FAILED,
  DELETE_COUPON_LIST_REQUESTED,
  DELETE_COUPON_LIST_SUCCESS,
  DELETE_COUPON_LIST_FAILED,
  CATCH_ERROR,
  SET_MODAL,
  ACTION_RESPONSER
} from '@/store/constants'
import {
  getCouponAction,
  getDetailCouponAction,
  postCouponAction,
  deleteCouponAction,
  updateCouponAction,
  deleteCouponListAction
} from '../action/coupon/couponAction'

/**
 * Fetch Get Coupon
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetCoupon(action) {
  try {
    const res = yield call(getCouponAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_COUPON_SUCCESS,
      payload: payload
    })
  } catch (err) {
    if (err?.data?.meta?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: err?.data?.meta?.code,
          message: err?.data?.meta?.message,
          redirect: '/profile'
        }
      })
    } else {
      const status = err?.data?.meta
      if (status?.code === 400) {
        yield put({
          type: CATCH_ERROR,
          payload: status?.message
        })
      } else {
        yield put({
          type: GET_COUPON_FAILED,
          payload: status?.message
        })
      }
    }
  }
}

/**
 * Fetch Detail 
 * 
 * @param {*} action
 * @returns
 */
function* fetchDetailCoupon(action) {
  try {
    const res = yield call(getDetailCouponAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_DETAIL_COUPON_SUCCESS,
      payload: payload
    })
  } catch (err) {
    if (err?.data?.meta?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: err?.data?.meta?.code,
          message: err?.data?.meta?.message,
          redirect: '/profile'
        }
      })
    } else {
      yield put({
        type: SET_MODAL,
        payload: {
          code: err?.meta?.code,
          message: 'Kupon tidak ditemukan',
          redirect: '/manajemen-kupon/kupon'
        }
      })
      yield put({
        type: GET_DETAIL_COUPON_FAILED,
        payload: {
          modal: true,
          error: err?.meta?.message
        }
      })
    }
  }
}

/**
 * Post Coupon 
 * 
 * @param {*} action 
 * @returns
 * 
 */
function* postCoupon(action) {
  try {
    const res = yield call(postCouponAction, action?.payload)

    const payload = res?.data

    yield put({
      type: POST_COUPON_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Kupon berhasil ditambahkan',
        redirect: '/manajemen-kupon/kupon'
      }
    })
  } catch (err) {
    if (err?.data?.statusCode !== 403) {
      yield put({
        type: SET_MODAL,
        payload: {
          code: err?.data?.meta?.code,
          message: 'Kupon gagal ditambahkan',
          childMessage: err?.data?.meta?.message
        }
      })
      yield put({
        type: POST_COUPON_FAILED,
        payload: {
          modal: true,
          error: err?.meta?.message
        }
      })
    } else if (err?.data?.meta?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: err?.data?.meta?.code,
          message: err?.data?.meta?.message,
          redirect: '/profile'
        }
      })
    }
  }
}

/**
 * Delete Coupon
 * 
 * @param {*} action 
 * @returns
 */
function* deleteCoupon(action) {
  try {
    const res = yield call(deleteCouponAction, action?.payload)

    const payload = res?.data

    yield put({
      type: DELETE_COUPON_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Kupon berhasil dihapus',
        redirect: '/manajemen-kupon/kupon'
      }
    })
  } catch (err) {
    if (err?.data?.statusCode !== 403) {
      yield put({
        type: SET_MODAL,
        payload: {
          code: err?.meta?.code,
          message: 'Kupon gagal dihapus',
          redirect: '/manajemen-kupon/kupon'
        }
      })
      yield put({
        type: DELETE_COUPON_FAILED,
        payload: {
          modal: true,
          error: err?.meta?.message
        }
      })
    } else if (err?.data?.meta?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: err?.data?.meta?.code,
          message: err?.data?.meta?.message,
          redirect: '/profile'
        }
      })
    }
  }
}


/**
 * Update Coupon 
 * 
 * @param {*} action 
 * @returns
 */
function* updateCoupon(action) {
  try {
    const res = yield call(updateCouponAction, action?.payload)

    const payload = res?.data

    yield put({
      type: UPDATE_COUPON_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Kupon berhasil diubah',
        redirect: '/manajemen-kupon/kupon'
      }
    })
  } catch (err) {
    if (err?.data?.statusCode !== 403) {
      yield put({
        type: SET_MODAL,
        payload: {
          code: err?.data?.meta?.code,
          message: 'Kupon gagal diubah',
          redirect: '/manajemen-kupon/kupon',
          childMessage: err?.data?.meta?.message
        }
      })
      yield put({
        type: UPDATE_COUPON_FAILED,
        payload: {
          modal: true,
          error: err?.meta?.message
        }
      })
    } else if (err?.data?.meta?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: err?.data?.meta?.code,
          message: err?.data?.meta?.message,
          redirect: '/profile'
        }
      })
    }
  }
}

function* deleteCouponList(action) {
  try {
    const res = yield call(deleteCouponListAction, action?.payload)

    const payload = res?.data

    yield put({
      type: DELETE_COUPON_LIST_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const status = err?.data?.meta
    if (status?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: err?.data?.meta?.code,
          message: err?.data?.meta?.message,
          redirect: '/profile'
        }
      })
    } else {
      yield put({
        type: SET_MODAL,
        payload: {
          code: status?.code,
          message: status?.message
          // redirect: '/'
        }
      })
      yield put({
        type: DELETE_COUPON_LIST_FAILED,
        payload: {
          modal: true,
          error: status?.message
        }
      })
    }
  }
}

function* couponSaga() {
  yield takeEvery(GET_COUPON_REQUESTED, fetchGetCoupon)
  yield takeEvery(GET_DETAIL_COUPON_REQUESTED, fetchDetailCoupon)
  yield takeEvery(POST_COUPON_REQUESTED, postCoupon)
  yield takeEvery(DELETE_COUPON_REQUESTED, deleteCoupon)
  yield takeEvery(UPDATE_COUPON_REQUESTED, updateCoupon)
  yield takeEvery(DELETE_COUPON_LIST_REQUESTED, deleteCouponList)
}

export default couponSaga