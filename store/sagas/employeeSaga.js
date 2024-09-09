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
  SET_MODAL,
  UPDATE_EMPLOYEE_STATUS_REQUESTED,
  UPDATE_EMPLOYEE_STATUS_FAILED,
  UPDATE_EMPLOYEE_STATUS_SUCCESS,
  SYNC_EMPLOYEES_REQUESTED,
  SYNC_EMPLOYEES_SUCCESS,
  SYNC_EMPLOYEES_FAILED,
  DOWNLOAD_TEMPLATE_REQUESTED,
  DOWNLOAD_TEMPLATE_SUCCESS,
  DOWNLOAD_TEMPLATE_FAILED,
  UPLOAD_TEMPLATE_REQUESTED,
  UPLOAD_TEMPLATE_SUCCESS,
  UPLOAD_TEMPLATE_FAILED,
  GET_ACTIVITIES_REQUESTED,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_FAILED,
  DOWNLOAD_LOG_ERROR_REQUESTED,
  DOWNLOAD_LOG_ERROR_SUCCESS,
  DOWNLOAD_LOG_ERROR_FAILED
} from '../constants'
import {
  deleteEmployeeAction,
  getEmployeesAction,
  postEmployeeAction,
  getEmployeeAction,
  updateEmployeeAction,
  updateEmployeeStatusAction,
  synchronizeEmployeesAction,
  downloadTemplateAction,
  uploadTemplateAction,
  getActivitiesHistoryAction,
  downloadLogErrorAction
} from './action/employeeAction'
import Router from 'next/router'

/**
 * Get Activities History
 *
 * @returns
 */
function* getActivitiesHistory(action) {
  try {
    const res = yield call(getActivitiesHistoryAction, action?.payload)
    const payload = res?.data
    const pagination = res?.pagination

    yield put({
      type: GET_ACTIVITIES_SUCCESS,
      payload: {
        data: payload,
        pagination
      }
    })
  } catch (err) {
    const errors = err?.data

    if (errors?.code === 403 || errors?.code === 401) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: errors?.code,
          message: errors?.message,
          redirect: '/profile'
        }
      })
    } else {
      const errorMessage = errors?.message || 'Terjadi Kesalahan'

      yield put({
        type: SET_MODAL,
        payload: {
          code: errors?.code,
          message: errorMessage
        }
      })

      yield put({
        type: GET_ACTIVITIES_FAILED,
        payload: errorMessage
      })
    }
  }
}

/**
 * Upload Template
 *
 * @returns
 */
function* uploadTemplate(action) {
  try {
    const res = yield call(uploadTemplateAction, action?.payload)
    const payload = res?.data

    yield put({
      type: UPLOAD_TEMPLATE_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: payload?.message,
        childMessage: 'Anda telah berhasil menambah data pegawai',
        redirect: 'refresh'
      }
    })
  } catch (err) {
    const errors = err?.data
    const errorCode = errors?.code

    if (errorCode === 403 || errorCode === 401) {
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
        type: UPLOAD_TEMPLATE_FAILED,
        payload: errors
      })
    }
  }
}

/**
 * Download Template
 *
 * @returns
 */
function* downloadTemplate(action) {
  try {
    const res = yield call(downloadTemplateAction, action?.payload)
    const payload = res?.data

    yield put({
      type: DOWNLOAD_TEMPLATE_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const errors = err?.data
    const errorCode = errors?.code

    if (errorCode === 403 || errorCode === 401) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: errors?.code,
          message: errors?.message,
          redirect: '/profile'
        }
      })
    } else {
      const errorMessage = errors?.message || 'Terjadi Kesalahan'

      yield put({
        type: SET_MODAL,
        payload: {
          code: errors?.code,
          message: errorMessage
        }
      })

      yield put({
        type: DOWNLOAD_TEMPLATE_FAILED,
        payload: errorMessage
      })
    }
  }
}

/**
 * Download Log Error
 *
 * @returns
 */
function* downloadLogErrors(action) {
  try {
    const res = yield call(downloadLogErrorAction, action?.payload)
    const payload = res?.data

    yield put({
      type: DOWNLOAD_LOG_ERROR_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const errors = err?.data
    const errorCode = errors?.code

    if (errorCode === 403 || errorCode === 401) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: errors?.code,
          message: errors?.message,
          redirect: '/profile'
        }
      })
    } else {
      const errorMessage = errors?.message || 'Terjadi Kesalahan'

      yield put({
        type: SET_MODAL,
        payload: {
          code: errors?.code,
          message: errorMessage
        }
      })

      yield put({
        type: DOWNLOAD_LOG_ERROR_FAILED,
        payload: {}
      })
    }
  }
}

/**
 * Synchronize Employees Data
 *
 * @returns
 */
function* synchronizeEmployees() {
  try {
    const res = yield call(synchronizeEmployeesAction)
    const payload = res?.data

    yield put({
      type: SYNC_EMPLOYEES_SUCCESS,
      payload: payload,
      redirect: 'refresh'
    })
  } catch (err) {
    const errors = err?.data
    const errorCode = errors?.code

    if (errorCode === 403 || errorCode === 401) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: errors?.code,
          message: errors?.message,
          redirect: '/profile'
        }
      })
    } else {
      const errorMessage = errors?.message || 'Terjadi Kesalahan'

      yield put({
        type: SET_MODAL,
        payload: {
          code: errors?.code,
          message: errorMessage
        }
      })

      yield put({
        type: SYNC_EMPLOYEES_FAILED,
        payload: errorMessage
      })
    }
  }
}

/**
 * Get Employees Data
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
    const errorCode = errors?.code

    if (errorCode === 403 || errorCode === 401) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: errors?.code,
          message: errors?.message,
          redirect: '/profile'
        }
      })
    } else {
      const errorMessage = errors?.message || 'Terjadi Kesalahan'

      yield put({
        type: SET_MODAL,
        payload: {
          code: errors?.code,
          message: errorMessage
        }
      })

      yield put({
        type: GET_EMPLOYEES_FAILED,
        payload: errorMessage
      })
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
    const errors = err?.data
    const errorCode = errors?.code

    if (errorCode === 403 || errorCode === 401) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: errors?.code,
          message: errors?.message,
          redirect: '/profile'
        }
      })
    } else {
      const errorMessage = errors?.message || 'Terjadi Kesalahan'

      yield put({
        type: SET_MODAL,
        payload: {
          code: errors?.code,
          message: errorMessage
        }
      })

      yield put({
        type: GET_EMPLOYEE_FAILED,
        payload: errorMessage
      })
    }
  }
}

/**
 * Delete employee
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
        code: payload?.code,
        message: 'Pegawai berhasil dihapus',
        redirect: 'refresh'
      }
    })
  } catch (err) {
    const status = err?.data?.meta

    if ([403, 401]?.includes(status?.code)) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: status?.code,
          message: status?.message,
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
        redirect: 'refresh'
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
  yield takeEvery(GET_ACTIVITIES_REQUESTED, getActivitiesHistory)
  yield takeEvery(UPLOAD_TEMPLATE_REQUESTED, uploadTemplate)
  yield takeEvery(DOWNLOAD_TEMPLATE_REQUESTED, downloadTemplate)
  yield takeEvery(SYNC_EMPLOYEES_REQUESTED, synchronizeEmployees)
  yield takeEvery(GET_EMPLOYEES_REQUESTED, getEmployees)
  yield takeEvery(GET_EMPLOYEE_REQUESTED, getEmployee)
  yield takeEvery(DELETE_EMPLOYEE_REQUESTED, deleteEmployee)
  yield takeEvery(POST_EMPLOYEE_REQUESTED, postEmployee)
  yield takeEvery(UPDATE_EMPLOYEE_REQUESTED, updateEmployee)
  yield takeEvery(UPDATE_EMPLOYEE_STATUS_REQUESTED, updateEmployeeStatus)
  yield takeEvery(DOWNLOAD_LOG_ERROR_REQUESTED, downloadLogErrors)
}

export default employeeSaga
