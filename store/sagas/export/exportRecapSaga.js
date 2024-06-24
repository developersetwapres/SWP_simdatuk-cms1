/**
 *
 * @module Saga/exportRecapSaga
 *
 * @desc Export DRH
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  EXPORT_RECAP_REQUESTED,
  EXPORT_RECAP_SUCCESS,
  EXPORT_RECAP_FAILED
} from '../../constants'
import { getRecapExport } from '../action/export/exportRecapAction'

/**
 * Export Recap
 *
 * @param {*} action
 * @returns
 */
function* exportRecap(action) {
  try {
    const res = yield call(getRecapExport, action?.payload)

    yield put({
      type: EXPORT_RECAP_SUCCESS,
      payload: res
    })
  } catch (err) {
    const errors = err?.data
    if (errors?.code === 401 || errors?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: errors?.code,
          message: errors?.message,
          redirect: '/profile'
        }
      })
    } else {
      if (errors?.code === 400) {
        yield put({
          type: CATCH_ERROR,
          payload: errors?.message
        })
      } else {
        yield put({
          type: EXPORT_RECAP_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

function* exportRecapSaga() {
  yield takeEvery(EXPORT_RECAP_REQUESTED, exportRecap)
}

export default exportRecapSaga
