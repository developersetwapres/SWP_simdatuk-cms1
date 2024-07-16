/**
 *
 * @module Saga/exportDiagramSaga
 *
 * @desc Export Diagram
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  EXPORT_DIAGRAMS_FAILED,
  EXPORT_DIAGRAMS_REQUESTED,
  EXPORT_DIAGRAMS_SUCCESS
} from '../../constants'
import { exportDiagramsAction } from '../action/export/exportDiagramAction'

/**
 * Export Diagram
 *
 * @param {*} action
 * @returns
 */
function* exportDiagrams(action) {
  try {
    const res = yield call(exportDiagramsAction, action?.payload)

    yield put({
      type: EXPORT_DIAGRAMS_SUCCESS,
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
          type: EXPORT_DIAGRAMS_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

function* exportDiagramSaga() {
  yield takeEvery(EXPORT_DIAGRAMS_REQUESTED, exportDiagrams)
}

export default exportDiagramSaga
