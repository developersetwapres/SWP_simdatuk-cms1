/**
 *
 * @module Saga/bannerSaga
 *
 * @desc Banner
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_EMPLOYEES_REQUESTED,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAILED,
  GET_EMPLOYEE_REQUESTED,
  GET_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_FAILED,
  POST_EMPLOYEE_REQUESTED,
  POST_EMPLOYEE_SUCCESS,
  POST_EMPLOYEE_FAILED,
  UPDATE_EMPLOYEE_REQUESTED,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAILED,
  DELETE_EMPLOYEE_REQUESTED,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAILED,
  CATCH_ERROR,
  SET_MODAL,
  UPDATE_EMPLOYEE_STATUS_REQUESTED,
  UPDATE_EMPLOYEE_STATUS_FAILED,
  UPDATE_EMPLOYEE_STATUS_SUCCESS
} from '../constants'
import {
  deleteEmployeeAction,
  getEmployeesAction,
  postEmployeeAction,
  getEmployeeAction,
  updateEmployeeAction,
  updateEmployeeStatusAction
} from './action/employeeAction'
import Router from 'next/router'

/**
 * Get Pathname
 *
 *
 * @returns
 */
function* pathname() {
  return ''
}

/**
 * Fetch banner
 *
 * @param {*} action
 * @returns
 */
function* getEmployees(action) {
  try {
    const res = yield call(getEmployeesAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_EMPLOYEES_SUCCESS,
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
          type: GET_EMPLOYEES_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

/**
 * Get Banner
 *
 * @param {*} action
 * @returns
 */
function* getEmployee(action) {
  try {
    const res = yield call(getEmployeeAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_EMPLOYEE_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const status = err?.data?.meta

    if (status?.code === 403 || status?.code === 401) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: err?.data?.meta?.code,
          message: err?.data?.meta?.message,
          redirect: '/profile'
        }
      })
    } else {
      yield put({
        type: GET_EMPLOYEE_FAILED,
        payload: {
          modal: true,
          error: err?.meta?.message
        }
      })
    }
  }
}

/**
 * Delete banner
 *
 * @param {*} action
 * @returns
 */
function* deleteEmployee(action) {
  try {
    const res = yield call(deleteEmployeeAction, action?.payload)

    const payload = res?.data

    yield put({
      type: DELETE_EMPLOYEE_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Pegawai berhasil dihapus',
        redirect: '/'
      }
    })
  } catch (err) {
    const status = err?.data?.meta
    if (status?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: err?.data?.meta?.code,
          message: err?.data?.meta?.message,
          redirect: '/profile'
        }
      })
    } else {
      yield put({
        type: SET_MODAL,
        payload: {
          code: err?.data?.statusCode,
          message: 'Pegawai gagal dihapus'
        }
      })
      yield put({
        type: DELETE_EMPLOYEE_FAILED,
        payload: {
          modal: true,
          error: err?.data?.message
        }
      })
    }
  }
}

/**
 * Post Banner
 *
 * @param {*} action
 * @returns
 */
function* postEmployee(action) {
  try {
    const pathname = Router?.pathname
    const path = pathname.split('/').slice(0, 3).join('/')
    const res = yield call(postEmployeeAction, action?.payload)

    const payload = res?.data

    yield put({
      type: POST_EMPLOYEE_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Pegawai berhasil ditambahkan',
        redirect: path
      }
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
      yield put({
        type: SET_MODAL,
        payload: {
          code: errors?.code,
          message: 'Pegawai gagal ditambahkan',
          childMessage: errors?.message
        }
      })
      yield put({
        type: POST_EMPLOYEE_FAILED,
        payload: errors
      })
    }
  }
}

/**
 * Update Employee
 *
 * @param {*} action
 * @returns
 *
 */
function* updateEmployee(action) {
  try {
    const pathname = Router?.pathname
    const path = pathname.split('/').slice(0, 3).join('/')
    const res = yield call(updateEmployeeAction, action?.payload)
    const payload = res?.data

    yield put({
      type: UPDATE_EMPLOYEE_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Pegawai berhasil diubah',
        redirect: path
      }
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
      yield put({
        type: SET_MODAL,
        payload: {
          code: errors?.code,
          message: 'Pegawai gagal diubah',
          childMessage: errors?.message
        }
      })
      yield put({
        type: UPDATE_EMPLOYEE_FAILED,
        payload: errors
      })
    }
  }
}

/**
 * Update Employee Status
 *
 * @param {*} action
 * @returns
 *
 */
function* updateEmployeeStatus(action) {
  try {
    const pathname = Router?.pathname
    const path = pathname.split('/').slice(0, 3).join('/')
    const res = yield call(updateEmployeeStatusAction, action?.payload)

    const payload = res?.data

    yield put({
      type: UPDATE_EMPLOYEE_STATUS_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Edit Status Pegawai Berhasil',
        redirect: ''
      }
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
      yield put({
        type: SET_MODAL,
        payload: {
          code: errors?.code,
          message: 'Pegawai gagal diubah',
          childMessage: errors?.message
        }
      })
      yield put({
        type: UPDATE_EMPLOYEE_STATUS_FAILED,
        payload: {
          error: errors?.message
        }
      })
    }
  }
}

function* employeeSaga() {
  yield takeEvery(GET_EMPLOYEES_REQUESTED, getEmployees)
  yield takeEvery(GET_EMPLOYEE_REQUESTED, getEmployee)
  yield takeEvery(DELETE_EMPLOYEE_REQUESTED, deleteEmployee)
  yield takeEvery(POST_EMPLOYEE_REQUESTED, postEmployee)
  yield takeEvery(UPDATE_EMPLOYEE_REQUESTED, updateEmployee)
  yield takeEvery(UPDATE_EMPLOYEE_STATUS_REQUESTED, updateEmployeeStatus)
}

export default employeeSaga
