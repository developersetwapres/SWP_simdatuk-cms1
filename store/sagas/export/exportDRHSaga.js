/**
 *
 * @module Saga/exportDRHSaga
 *
 * @desc Export DRH
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  EXPORT_DRH_REQUESTED,
  EXPORT_DRH_SUCCESS,
  EXPORT_DRH_FAILED
} from '../../constants'
import { exportDRHAction } from '../action/export/exportDRHAction'

/**
 * Export DRH
 *
 * @param {*} action
 * @returns
 */
function* exportDrh(action) {
  try {
    const res = yield call(exportDRHAction, action?.payload)
    const payload = res?.data
    const pagination = res?.pagination

    yield put({
      type: EXPORT_DRH_SUCCESS,
      payload,
      pagination
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
      yield put({
        type: EXPORT_DRH_FAILED,
        payload: errors
      })
    }
  }
}

function* exportDRHSaga() {
  yield takeEvery(EXPORT_DRH_REQUESTED, exportDrh)
}

export default exportDRHSaga
