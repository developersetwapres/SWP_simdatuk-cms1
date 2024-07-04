/**
 *
 * @module Saga/exportComparisonSaga
 *
 * @desc Export Comparison
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  EXPORT_COMPARISON_REQUESTED,
  EXPORT_COMPARISON_SUCCESS,
  EXPORT_COMPARISON_FAILED
} from '../../constants'
import { getComparisonExportAction } from '../action/export/exportComparisonAction'

/**
 * Export Comparison
 *
 * @param {*} action
 * @returns
 */
function* exportComparison(action) {
  try {
    const res = yield call(getComparisonExportAction, action?.payload)

    yield put({
      type: EXPORT_COMPARISON_SUCCESS,
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
          type: EXPORT_COMPARISON_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

function* exportComparisonSaga() {
  yield takeEvery(EXPORT_COMPARISON_REQUESTED, exportComparison)
}

export default exportComparisonSaga
