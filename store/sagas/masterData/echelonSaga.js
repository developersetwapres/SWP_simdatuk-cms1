/**
 *
 * @module Saga/ECHELONs/ECHELONSaga
 *
 * @desc ECHELON
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_ECHELONS_OPTIONS_REQUESTED,
  GET_ECHELONS_OPTIONS_SUCCESS,
  GET_ECHELONS_OPTIONS_FAILED,
  GET_ECHELONS_REQUESTED,
  GET_ECHELONS_SUCCESS,
  GET_ECHELONS_FAILED,
  GET_ECHELON_REQUESTED,
  GET_ECHELON_SUCCESS,
  GET_ECHELON_FAILED,
  POST_ECHELON_REQUESTED,
  POST_ECHELON_SUCCESS,
  POST_ECHELON_FAILED,
  UPDATE_ECHELON_REQUESTED,
  UPDATE_ECHELON_SUCCESS,
  UPDATE_ECHELON_FAILED,
  DELETE_ECHELON_REQUESTED,
  DELETE_ECHELON_SUCCESS,
  DELETE_ECHELON_FAILED,
  ACTION_RESPONSER,
  SET_MODAL
} from '../../constants'
import {
  getEchelonsAction,
  getEchelonAction,
  postEchelonAction,
  deleteEchelonAction,
  updateEchelonAction
} from '../action/users/echelonAction'

/**
 * Get Echelons Options
 *
 * @param {*} action
 * @returns
 */
function* getEchelonsOptions(action) {
  try {
    const res = yield call(getEchelonsAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_ECHELONS_OPTIONS_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const error = err?.data
    if (error?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: error?.code,
          message: error?.message,
          redirect: '/profile'
        }
      })
    } else {
      if (error?.code === 401 || error?.code === 403) {
        yield put({
          type: SET_MODAL,
          payload: {
            message: error?.message,
            redirect: '/profile'
          }
        })
      } else {
        yield put({
          type: GET_ECHELONS_OPTIONS_FAILED,
          payload: { error: error?.message }
        })
      }
    }
  }
}

/**
 * GET ECHELON
 *
 * @param {*} action
 * @returns
 */
function* getEchelons(action) {
  try {
    const res = yield call(getEchelonsAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_ECHELONS_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const error = err?.data
    if (error?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: error?.code,
          message: error?.message,
          redirect: '/profile'
        }
      })
    } else {
      if (error?.code === 401 || error?.code === 403) {
        yield put({
          type: SET_MODAL,
          payload: {
            message: error?.message,
            redirect: '/profile'
          }
        })
      } else {
        yield put({
          type: GET_ECHELONS_FAILED,
          payload: { error: error?.message }
        })
      }
    }
  }
}

/**
 * Get Detail ECHELON
 *
 * @param {*} action
 * @returns
 */
function* getEchelon(action) {
  try {
    const res = yield call(getEchelonAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_ECHELON_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const error = err?.data
    if (error?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: error?.code,
          message: error?.message,
          redirect: '/profile'
        }
      })
    } else {
      yield put({
        type: GET_ECHELON_FAILED,
        payload: { error: error?.message }
      })
    }
  }
}

/**
 * POST ECHELON
 *
 * @param {*} action
 * @returns
 */
function* postEchelon(action) {
  try {
    const res = yield call(postEchelonAction, action?.payload)

    const payload = res?.data

    yield put({
      type: POST_ECHELON_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: payload?.message,
        childMessage: 'Anda telah berhasil menambah data eselon',
        redirect: '/master-data/eselon'
      }
    })
  } catch (err) {
    const error = err?.data
    if (error?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: error?.code,
          message: error?.message,
          redirect: '/profile'
        }
      })
    } else {
      yield put({
        type: SET_MODAL,
        payload: {
          code: error?.code,
          message: `Eselon Baru gagal ditambahkan`,
          childMessage: error?.message
        }
      })
      yield put({
        type: POST_ECHELON_FAILED,
        payload: {
          error: error?.message
        }
      })
    }
  }
}

/**
 * Delete ECHELON
 *
 * @param {*} action
 * @returns
 */
function* deleteEchelon(action) {
  try {
    const res = yield call(deleteEchelonAction, action?.payload)

    const payload = res?.data

    yield put({
      type: DELETE_ECHELON_SUCCESS,
      payload: payload,
      modal: true
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Eselon berhasil dihapus',
        redirect: '/master-data/eselon'
      }
    })
  } catch (err) {
    const error = err?.data
    if (error?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: error?.code,
          message: error?.message,
          redirect: '/profile'
        }
      })
    } else {
      yield put({
        type: SET_MODAL,
        payload: {
          code: error?.code,
          message: error?.message
        }
      })
      yield put({
        type: DELETE_ECHELON_FAILED,
        payload: { error: err?.data?.message }
      })
    }
  }
}

/**
 * Update ECHELON
 *
 * @param {*} action
 * @returns
 */
function* updateEchelon(action) {
  try {
    const res = yield call(updateEchelonAction, action?.payload)

    const payload = res?.data

    yield put({
      type: UPDATE_ECHELON_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: payload?.message,
        childMessage: 'Anda telah berhasil mengedit data eselon',
        redirect: '/master-data/eselon'
      }
    })
  } catch (err) {
    const error = err?.data
    if (error?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: error?.code,
          message: error?.message,
          redirect: '/profile'
        }
      })
    } else {
      yield put({
        type: SET_MODAL,
        payload: {
          code: error?.code,
          message: `Eselon Baru gagal diubah`,
          childMessage: error?.message
        }
      })
      yield put({
        type: UPDATE_ECHELON_FAILED,
        payload: { error: error?.message }
      })
    }
  }
}

function* echelonSaga() {
  yield takeEvery(GET_ECHELONS_OPTIONS_REQUESTED, getEchelonsOptions)
  yield takeEvery(GET_ECHELONS_REQUESTED, getEchelons)
  yield takeEvery(GET_ECHELON_REQUESTED, getEchelon)
  yield takeEvery(POST_ECHELON_REQUESTED, postEchelon)
  yield takeEvery(DELETE_ECHELON_REQUESTED, deleteEchelon)
  yield takeEvery(UPDATE_ECHELON_REQUESTED, updateEchelon)
}

export default echelonSaga
