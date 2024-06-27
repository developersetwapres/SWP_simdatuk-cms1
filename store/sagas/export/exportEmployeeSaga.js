/**
 *
 * @module Saga/exportEmployeeSaga
 *
 * @desc Export Employee
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  EXPORT_EMPLOYEE_DETAIL_REQUESTED,
  EXPORT_EMPLOYEE_DETAIL_SUCCESS,
  EXPORT_EMPLOYEE_DETAIL_FAILED
} from '../../constants'
import { exportEmployeeDetailAction } from '../action/export/exportEmployeeAction'

/**
 * Export Employee Detail
 *
 * @param {*} action
 * @returns
 */
function* exportEmployeeDetail(action) {
  try {
    const res = yield call(exportEmployeeDetailAction, action?.payload)

    yield put({
      type: EXPORT_EMPLOYEE_DETAIL_SUCCESS,
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
          type: EXPORT_EMPLOYEE_DETAIL_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

function* exportEmployeeSaga() {
  yield takeEvery(EXPORT_EMPLOYEE_DETAIL_REQUESTED, exportEmployeeDetail)
}

export default exportEmployeeSaga
