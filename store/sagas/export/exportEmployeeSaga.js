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
  EXPORT_EMPLOYEE_DETAIL_FAILED,
  EXPORT_EMPLOYEES_REQUESTED,
  EXPORT_EMPLOYEES_SUCCESS,
  EXPORT_EMPLOYEES_FAILED,
  EXPORT_EMPLOYEES_PREVIEW_REQUESTED,
  EXPORT_EMPLOYEES_PREVIEW_SUCCESS,
  EXPORT_EMPLOYEES_PREVIEW_FAILED
} from '../../constants'
import {
  exportEmployeeDetailAction,
  exportEmployeesAction,
  exportEmployeesPreviewAction
} from '../action/export/exportEmployeeAction'

/**
 * Export Employees
 *
 * @param {*} action
 * @returns
 */
function* exportEmployees(action) {
  try {
    const res = yield call(exportEmployeesAction, action?.payload)

    yield put({
      type: EXPORT_EMPLOYEES_SUCCESS,
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
          type: EXPORT_EMPLOYEES_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

/**
 * Export Employees Preview
 *
 * @param {*} action
 * @returns
 */
function* exportEmployeesPreview(action) {
  try {
    const res = yield call(exportEmployeesPreviewAction, action?.payload)

    yield put({
      type: EXPORT_EMPLOYEES_PREVIEW_SUCCESS,
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
          type: EXPORT_EMPLOYEES_PREVIEW_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

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
  yield takeEvery(EXPORT_EMPLOYEES_REQUESTED, exportEmployees)
  yield takeEvery(EXPORT_EMPLOYEES_PREVIEW_REQUESTED, exportEmployeesPreview)
  yield takeEvery(EXPORT_EMPLOYEE_DETAIL_REQUESTED, exportEmployeeDetail)
}

export default exportEmployeeSaga
