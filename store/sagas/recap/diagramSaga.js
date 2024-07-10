/**
 *
 * @module Saga/DecreeSaga
 *
 * @desc Decree
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  EXPORT_DIAGRAMS_FAILED,
  EXPORT_DIAGRAMS_REQUESTED,
  EXPORT_DIAGRAMS_SUCCESS,
  GET_DIAGRAMS_FAILED,
  GET_DIAGRAMS_REQUESTED,
  GET_DIAGRAMS_SUCCESS
} from '../../constants'
import {
  exportDiagramsAction,
  getDiagramsAction
} from '../action/recap/diagramAction'

/**
 * Get Diagrams
 *
 * @param {*} action
 * @returns
 */
function* getDiagrams(action) {
  try {
    const res = yield call(getDiagramsAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_DIAGRAMS_SUCCESS,
      payload
    })
  } catch (err) {
    const errors = err?.data
    if (errors?.code === 403) {
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
          type: GET_DIAGRAMS_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

/**
 * Export Diagrams
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
    if (errors?.code === 403) {
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

function* diagramSaga() {
  yield takeEvery(GET_DIAGRAMS_REQUESTED, getDiagrams)
  yield takeEvery(EXPORT_DIAGRAMS_REQUESTED, exportDiagrams)
}

export default diagramSaga
