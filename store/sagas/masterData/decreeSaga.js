/**
 *
 * @module Saga/DecreeSaga
 *
 * @desc Decree
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_DECREES_REQUESTED,
  GET_DECREES_SUCCESS,
  GET_DECREES_FAILED
} from '../../constants'
import { getDecreesAction } from '../action/masterData/decreeAction'

/**
 * Get Decrees
 *
 * @param {*} action
 * @returns
 */
function* getDecrees(action) {
  try {
    const res = yield call(getDecreesAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_DECREES_SUCCESS,
      payload: payload
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
          type: GET_DECREES_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

function* decreeSaga() {
  yield takeEvery(GET_DECREES_REQUESTED, getDecrees)
}

export default decreeSaga
