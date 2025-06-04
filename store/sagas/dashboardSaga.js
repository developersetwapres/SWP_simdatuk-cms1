/**
 *
 * @module Saga/dashboard
 *
 * @desc Dashboard
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import { SUMMARIES_SUCCESS, SUMMARIES_FAILED, SUMMARIES_REQUESTED } from '../constants'
import { getSummariesAction } from './action/dashboardAction'

/**
 * Get Summaries
 *
 * @param {*} action
 * @returns
 */
function* getSummaries(action) {
  try {
    const res = yield call(getSummariesAction, action?.payload)
    const payload = res?.data

    yield put({
      type: SUMMARIES_SUCCESS,
      payload
    })
  } catch (err) {
    const error = err?.data

    yield put({
      type: SET_MODAL,
      payload: {
        code: error?.code,
        message: error?.message
      }
    })

    if (error?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: error?.code,
          message: error?.message,
          redirect: '/profile'
        }
      })
    } else {
      yield put({
        type: SUMMARIES_FAILED,
        payload: { error: error?.message }
      })
    }
  }
}

function* dashboardSaga() {
  yield takeEvery(SUMMARIES_REQUESTED, getSummaries)
}

export default dashboardSaga
