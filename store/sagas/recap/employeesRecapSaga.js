/**
 *
 * @module Saga/EmployeesRecapitulationsSaga
 *
 * @desc Employees Recapitulations
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_EMPLOYEES_RECAP_FAILED,
  GET_EMPLOYEES_RECAP_REQUESTED,
  GET_EMPLOYEES_RECAP_SUCCESS
} from '../../constants'
import { getEmployeesRecapAction } from '../action/recap/employeesRecap'

/**
 * Get Employees Recapitulations
 *
 * @param {*} action
 * @returns
 */
function* getEmployeesRecapitulations(action) {
  try {
    const res = yield call(getEmployeesRecapAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_EMPLOYEES_RECAP_SUCCESS,
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
          type: GET_EMPLOYEES_RECAP_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

function* employeesRecapitulationsSaga() {
  yield takeEvery(GET_EMPLOYEES_RECAP_REQUESTED, getEmployeesRecapitulations)
}

export default employeesRecapitulationsSaga
