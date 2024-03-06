/**
 * 
 * @module Saga/coupon/couponSubmission 
 * 
 * @desc couponSubmission
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
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
  APPROVE_COUPON_SUBMISSION_LIST_FAILED,
  SET_MODAL,
  CATCH_ERROR,
  ACTION_RESPONSER
} from '@/store/constants'
import {
  getCouponSubmissionAction,
  getDetailCouponSubmissionAction,
  rejectCouponSubmissionAction,
  approveCouponSubmissionAction,
  rejectCouponSubmissionListAction,
  approveCouponSubmissionListAction
} from '../action/coupon/couponSubmissionAction'

/**
 * Fetch Coupon Submission
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetCouponSubmission(action) {
  try {
    const res = yield call(getCouponSubmissionAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_COUPON_SUBMISSION_SUCCESS,
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
          type: GET_COUPON_SUBMISSION_FAILED,
          payload: status?.message
        })
      }
    }
  }
}


/**
 * Get detail 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchDetailCouponSubmission(action) {
  try {
    const res = yield call(getDetailCouponSubmissionAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_DETAIL_COUPON_SUBMISSION_SUCCESS,
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
          code: err?.data?.statusCode,
          message: 'Pengajuan Kupon tidak ditemukan',
          redirect: '/manajemen-kupon/pengajuan-kupon'
        }
      })
      yield put({
        type: GET_DETAIL_COUPON_SUBMISSION_FAILED,
        payload: {
          modal: true,
          error: err?.data?.mesasge
        }
      })
    }
  }
}


/**
 * Reject coupon 
 * 
 * @param {*} action 
 * @returns
 */
function* rejectCouponSubmission(action) {
  try {
    const res = yield call(rejectCouponSubmissionAction, action?.payload)

    const payload = res?.data

    yield put({
      type: REJECT_COUPON_SUBMISSION_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Pengajuan Kupon berhasil ditolak',
        redirect: '/manajemen-kupon/pengajuan-kupon'
      }
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
          code: err?.data?.statusCode,
          message: 'Pengajuan Kupon gagal ditolak'
        }
      })
      yield put({
        type: REJECT_COUPON_SUBMISSION_FAILED,
        payload: {
          modal: true,
          error: err?.data?.message
        }
      })
    }
  }
}


/**
 * Approve Saga
 * 
 * @param {*} action 
 * @returns
 */
function* approveCouponSubmission(action) {
  try {
    const res = yield call(approveCouponSubmissionAction, action?.payload)

    const payload = res?.data

    yield put({
      type: APPROVE_COUPON_SUBMISSION_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Pengajuan Kupon berhasil disetujui',
        redirect: '/manajemen-kupon/pengajuan-kupon'
      }
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
          code: err?.data?.statusCode,
          message: 'Pengajuan Kupon gagal disetujui',
          childMessage: err?.data?.meta?.message
        }
      })
      yield put({
        type: APPROVE_COUPON_SUBMISSION_FAILED,
        payload: {
          modal: true,
          error: err?.data?.message
        }
      })
    }
  }
}

/**
 * Reject COupon List 
 * 
 * @param {*} action 
 * @returns
 */
function* rejectCouponSubmissionList(action) {
  try {
    const res = yield call(rejectCouponSubmissionListAction, action?.payload)

    const payload = res?.data

    yield put({
      type: REJECT_COUPON_SUBMISSION_LIST_SUCCESS,
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
          type: REJECT_COUPON_SUBMISSION_LIST_FAILED,
          payload: status?.message
        })
      }
    }
  }
}

/**
 * Approve COupon list 
 * 
 * @param {*} action 
 * @returns
 */
function* approveCouponSubmissionListActionSagas(action) {
  try {
    // const res = yield call(approveCouponSubmissionAction, action?.payload)
    const res = yield call(approveCouponSubmissionListAction, action?.payload)

    const payload = res?.data

    yield put({
      type: APPROVE_COUPON_SUBMISSION_LIST_SUCCESS,
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
        type: APPROVE_COUPON_SUBMISSION_LIST_FAILED,
        payload: err?.data?.meta?.message
      })
    }
  }
}


function* couponSubmissionSaga() {
  yield takeEvery(GET_COUPON_SUBMISSION_REQUESTED, fetchGetCouponSubmission)
  yield takeEvery(GET_DETAIL_COUPON_SUBMISSION_REQUESTED, fetchDetailCouponSubmission)
  yield takeEvery(REJECT_COUPON_SUBMISSION_REQUESTED, rejectCouponSubmission)
  yield takeEvery(APPROVE_COUPON_SUBMISSION_REQUESTED, approveCouponSubmission)
  yield takeEvery(REJECT_COUPON_SUBMISSION_LIST_REQUESTED, rejectCouponSubmissionList)
  yield takeEvery(APPROVE_COUPON_SUBMISSION_LIST_REQUSTED, approveCouponSubmissionListActionSagas)
}

export default couponSubmissionSaga