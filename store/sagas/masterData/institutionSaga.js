/**
 *
 * @module Saga/institutionSaga
 *
 * @desc Institution
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_INSTITUTIONS_OPTIONS_REQUESTED,
  GET_INSTITUTIONS_OPTIONS_SUCCESS,
  GET_INSTITUTIONS_OPTIONS_FAILED,
  GET_INSTITUTIONS_REQUESTED,
  GET_INSTITUTIONS_SUCCESS,
  GET_INSTITUTIONS_FAILED,
  GET_INSTITUTION_REQUESTED,
  GET_INSTITUTION_SUCCESS,
  GET_INSTITUTION_FAILED,
  POST_INSTITUTION_REQUESTED,
  POST_INSTITUTION_SUCCESS,
  POST_INSTITUTION_FAILED,
  UPDATE_INSTITUTION_REQUESTED,
  UPDATE_INSTITUTION_SUCCESS,
  UPDATE_INSTITUTION_FAILED,
  DELETE_INSTITUTION_REQUESTED,
  DELETE_INSTITUTION_SUCCESS,
  DELETE_INSTITUTION_FAILED,
  SET_MODAL,
  ACTION_RESPONSER
} from '../../constants'
import {
  deleteInstitutionAction,
  getInstitutionAction,
  getInstitutionsAction,
  postInstitutionAction,
  updateInstitutionAction
} from '../action/masterData/institutionAction'

/**
 * Get Institutions
 *
 * @param {*} action
 * @returns
 */
function* getInstitutions(action) {
  try {
    const res = yield call(getInstitutionsAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_INSTITUTIONS_SUCCESS,
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
          type: GET_INSTITUTIONS_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

/**
 * Get Institutions Options
 *
 * @param {*} action
 * @returns
 */
function* getInstitutionsOptions(action) {
  try {
    const res = yield call(getInstitutionsAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_INSTITUTIONS_OPTIONS_SUCCESS,
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
          type: GET_INSTITUTIONS_OPTIONS_FAILED,
          payload: err?.message
        })
      }
    }
  }
}

/**
 * Get Institution
 *
 * @param {*} action
 * @returns
 */
function* getInstitution(action) {
  try {
    const res = yield call(getInstitutionAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_INSTITUTION_SUCCESS,
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
          redirect: '/master-data/institution'
        }
      })
      yield put({
        type: GET_INSTITUTION_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Delete Institution
 *
 * @param {*} action
 * @returns
 */
function* deleteInstitution(action) {
  try {
    const res = yield call(deleteInstitutionAction, action?.payload)

    const payload = res?.data

    yield put({
      type: DELETE_INSTITUTION_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Data Instansi Berhasil Dihapus',
        childMessage: payload?.message,
        redirect: '/master-data/institution'
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
          message: 'Data Instansi Gagal Dihapus',
          message: errors?.message
        }
      })
      yield put({
        type: DELETE_INSTITUTION_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Post Institution
 *
 * @param {*} action
 * @returns
 */
function* postInstitution(action) {
  try {
    const res = yield call(postInstitutionAction, action?.payload)

    const payload = res?.data

    yield put({
      type: POST_INSTITUTION_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Data Instansi Berhasil Ditambahkan',
        childMessage: payload?.message,
        redirect: '/master-data/institution'
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
          message: 'Data Instansi Gagal Ditambahkan',
          childMessage: errors?.message
        }
      })
      yield put({
        type: POST_INSTITUTION_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Update Institution
 *
 * @param {*} action
 * @returns
 *
 */
function* updateInstitution(action) {
  try {
    const res = yield call(updateInstitutionAction, action?.payload)

    const payload = res?.data

    yield put({
      type: UPDATE_INSTITUTION_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Data Instansi Berhasil Diubah',
        childMessage: payload?.message,
        redirect: '/master-data/institution'
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
          message: 'Data Instansi Gagal Diubah',
          childMessage: errors?.message
        }
      })
      yield put({
        type: UPDATE_INSTITUTION_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

function* institutionSaga() {
  yield takeEvery(GET_INSTITUTIONS_OPTIONS_REQUESTED, getInstitutionsOptions)
  yield takeEvery(GET_INSTITUTIONS_REQUESTED, getInstitutions)
  yield takeEvery(GET_INSTITUTION_REQUESTED, getInstitution)
  yield takeEvery(DELETE_INSTITUTION_REQUESTED, deleteInstitution)
  yield takeEvery(POST_INSTITUTION_REQUESTED, postInstitution)
  yield takeEvery(UPDATE_INSTITUTION_REQUESTED, updateInstitution)
}

export default institutionSaga
