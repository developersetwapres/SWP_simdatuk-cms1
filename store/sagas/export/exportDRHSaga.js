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
  EXPORT_DRH_FAILED,
  SET_MODAL
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

    if (
      errors?.code === 403 ||
      errors?.code === 401
    ) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: errors?.code,
          message: errors?.message,
          redirect: '/profile'
        }
      })
    } else {
      let errorMessage = errors?.message

      if (errors?.message) {
        errorMessage = errors?.message
      } else if (err?.status === 400) {
        errorMessage = 'Data Tidak Ditemukan'
      } else {
        errorMessage = 'Terjadi Kesalahan'
      }

      yield put({
        type: SET_MODAL,
        payload: {
          code: errors?.code,
          message: errorMessage
        }
      })

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
