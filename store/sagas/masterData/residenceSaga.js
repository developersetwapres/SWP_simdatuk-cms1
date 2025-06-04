/**
 *
 * @module Saga/residenceSaga
 *
 * @desc Residence
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_RESIDENCES_REQUESTED,
  GET_RESIDENCES_SUCCESS,
  GET_RESIDENCES_FAILED
} from '../../constants'
import { getResidencesAction } from '../action/masterData/residenceAction'

/**
 * Get Residences
 *
 * @param {*} action
 * @returns
 */
function* getResidences(action) {
  try {
    const res = yield call(getResidencesAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_RESIDENCES_SUCCESS,
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
          type: GET_RESIDENCES_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

function* residenceSaga() {
  yield takeEvery(GET_RESIDENCES_REQUESTED, getResidences)
}

export default residenceSaga
