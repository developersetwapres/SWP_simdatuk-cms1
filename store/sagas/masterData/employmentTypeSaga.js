/**
 *
 * @module Saga/employmentTypeSaga
 *
 * @desc Employment Type
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_EMPLOYMENT_TYPES_OPTIONS_REQUESTED,
  GET_EMPLOYMENT_TYPES_OPTIONS_SUCCESS,
  GET_EMPLOYMENT_TYPES_OPTIONS_FAILED,
  GET_EMPLOYMENT_TYPES_REQUESTED,
  GET_EMPLOYMENT_TYPES_SUCCESS,
  GET_EMPLOYMENT_TYPES_FAILED,
  GET_EMPLOYMENT_TYPE_REQUESTED,
  GET_EMPLOYMENT_TYPE_SUCCESS,
  GET_EMPLOYMENT_TYPE_FAILED,
  POST_EMPLOYMENT_TYPE_REQUESTED,
  POST_EMPLOYMENT_TYPE_SUCCESS,
  POST_EMPLOYMENT_TYPE_FAILED,
  UPDATE_EMPLOYMENT_TYPE_REQUESTED,
  UPDATE_EMPLOYMENT_TYPE_SUCCESS,
  UPDATE_EMPLOYMENT_TYPE_FAILED,
  DELETE_EMPLOYMENT_TYPE_REQUESTED,
  DELETE_EMPLOYMENT_TYPE_SUCCESS,
  DELETE_EMPLOYMENT_TYPE_FAILED,
  SET_MODAL,
  ACTION_RESPONSER
} from '../../constants'
import {
  deleteEmploymentTypeAction,
  getEmploymentTypeAction,
  getEmploymentTypesAction,
  postEmploymentTypeAction,
  updateEmploymentTypeAction
} from '../action/masterData/employmentTypeAction'

/**
 * Get Employment Types
 *
 * @param {*} action
 * @returns
 */
function* getEmploymentTypes(action) {
  try {
    const res = yield call(getEmploymentTypesAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_EMPLOYMENT_TYPES_SUCCESS,
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
          type: SET_MODAL,
          payload: {
            code: errors?.code,
            message: 'Warning!',
            childMessage: errors?.message
          }
        })
        yield put({
          type: GET_EMPLOYMENT_TYPES_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

/**
 * Get Employment Types Options
 *
 * @param {*} action
 * @returns
 */
function* getEmploymentTypesOptions(action) {
  try {
    const res = yield call(getEmploymentTypesAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_EMPLOYMENT_TYPES_OPTIONS_SUCCESS,
      payload
    })
  } catch (err) {
    if (err?.data?.meta?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: err?.data?.meta?.code,
          message: err?.data?.meta?.message,
          redirect: '/profile'
        }
      })
    } else {
      if (err.statusCode === 500) {
        yield put({
          type: CATCH_ERROR,
          payload: err?.message
        })
      } else {
        yield put({
          type: GET_EMPLOYMENT_TYPES_OPTIONS_FAILED,
          payload: err?.message
        })
      }
    }
  }
}

/**
 * Get Employment Type
 *
 * @param {*} action
 * @returns
 */
function* getEmploymentType(action) {
  try {
    const res = yield call(getEmploymentTypeAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_EMPLOYMENT_TYPE_SUCCESS,
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
      yield put({
        type: SET_MODAL,
        payload: {
          code: errors?.code,
          message: 'Warning!',
          childMessage: errors?.message,
          redirect: '/master-data/employment-type'
        }
      })
      yield put({
        type: GET_EMPLOYMENT_TYPE_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Delete Employment Type
 *
 * @param {*} action
 * @returns
 */
function* deleteEmploymentType(action) {
  try {
    const res = yield call(deleteEmploymentTypeAction, action?.payload)

    const payload = res?.data

    yield put({
      type: DELETE_EMPLOYMENT_TYPE_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Data Jenis Pegawai Berhasil Dihapus',
        childMessage: payload?.message,
        redirect: '/master-data/employment-type'
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
          message: 'Data Jenis Pegawai Gagal Dihapus',
          message: errors?.message
        }
      })
      yield put({
        type: DELETE_EMPLOYMENT_TYPE_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Post Employment Type
 *
 * @param {*} action
 * @returns
 */
function* postEmploymentType(action) {
  try {
    const res = yield call(postEmploymentTypeAction, action?.payload)

    const payload = res?.data

    yield put({
      type: POST_EMPLOYMENT_TYPE_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Data Jenis Pegawai Berhasil Ditambahkan',
        childMessage: payload?.message,
        redirect: '/master-data/employment-type'
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
          message: 'Data Jenis Pegawai Gagal Ditambahkan',
          childMessage: errors?.message
        }
      })
      yield put({
        type: POST_EMPLOYMENT_TYPE_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Update Employment Type
 *
 * @param {*} action
 * @returns
 *
 */
function* updateEmploymentType(action) {
  try {
    const res = yield call(updateEmploymentTypeAction, action?.payload)

    const payload = res?.data

    yield put({
      type: UPDATE_EMPLOYMENT_TYPE_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Data Jenis Pegawai Berhasil Diubah',
        childMessage: payload?.message,
        redirect: '/master-data/employment-type'
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
          message: 'Data Jenis Pegawai Gagal Diubah',
          childMessage: errors?.message
        }
      })
      yield put({
        type: UPDATE_EMPLOYMENT_TYPE_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

function* employmentTypeSaga() {
  yield takeEvery(
    GET_EMPLOYMENT_TYPES_OPTIONS_REQUESTED,
    getEmploymentTypesOptions
  )
  yield takeEvery(GET_EMPLOYMENT_TYPES_REQUESTED, getEmploymentTypes)
  yield takeEvery(GET_EMPLOYMENT_TYPE_REQUESTED, getEmploymentType)
  yield takeEvery(DELETE_EMPLOYMENT_TYPE_REQUESTED, deleteEmploymentType)
  yield takeEvery(POST_EMPLOYMENT_TYPE_REQUESTED, postEmploymentType)
  yield takeEvery(UPDATE_EMPLOYMENT_TYPE_REQUESTED, updateEmploymentType)
}

export default employmentTypeSaga
