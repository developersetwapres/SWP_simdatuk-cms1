/**
 *
 * @module Saga/DecreeSaga
 *
 * @desc Decree
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_DIAGRAMS_FAILED,
  GET_DIAGRAMS_REQUESTED,
  GET_DIAGRAMS_SUCCESS
} from '../../constants'
import { getDiagramsAction } from '../action/recap/diagramAction'

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

function* diagramSaga() {
  yield takeEvery(GET_DIAGRAMS_REQUESTED, getDiagrams)
}

export default diagramSaga
