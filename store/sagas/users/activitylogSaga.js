/**
 * 
 * @module Saga/users/activitylogSaga 
 * 
 * @desc acitivylog
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_ACTIVITY_LOGS_REQUESTED,
  GET_ACTIVITY_LOGS_SUCCESS,
  GET_ACTIVITY_LOGS_FAILED,
  CATCH_ERROR,
  ACTION_RESPONSER
} from '@/store/constants'
import {
  getActivitylogAction
} from '../action/users/activitylogAction'

/**
 * Get activityLog 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetActivitylog(action) {
  try {
    const res = yield call(getActivitylogAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_ACTIVITY_LOGS_SUCCESS,
      payload: payload
    })
  } catch (err) {
    if (err?.data?.statusCode === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: err?.data?.statusCode || 403,
          message: 'Mohon maaf, anda tidak diizinkan untuk mengakses halaman ini',
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
          type: GET_ACTIVITY_LOGS_FAILED,
          payload: status?.message
        })
      }
    }
  }
}

function* activitylogSaga() {
  yield takeEvery(GET_ACTIVITY_LOGS_REQUESTED, fetchGetActivitylog)
}

export default activitylogSaga