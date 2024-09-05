/**
 *
 * @module Saga/targetSaga
 *
 * @desc Target
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_TARGETS_REQUESTED,
  GET_TARGETS_SUCCESS,
  GET_TARGETS_FAILED,
  GET_TARGET_REQUESTED,
  GET_TARGET_SUCCESS,
  GET_TARGET_FAILED,
  POST_TARGET_REQUESTED,
  POST_TARGET_SUCCESS,
  POST_TARGET_FAILED,
  UPDATE_TARGET_REQUESTED,
  UPDATE_TARGET_SUCCESS,
  UPDATE_TARGET_FAILED,
  DELETE_TARGET_REQUESTED,
  DELETE_TARGET_SUCCESS,
  DELETE_TARGET_FAILED,
  SET_MODAL,
  ACTION_RESPONSER
} from '../../constants'
import {
  deleteTargetAction,
  getTargetAction,
  getTargetsAction,
  postTargetAction,
  updateTargetAction
} from '../action/histories/targetAction'

/**
 * Get Targets
 *
 * @param {*} action
 * @returns
 */
function* getTargets(action) {
  try {
    const res = yield call(getTargetsAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_TARGETS_SUCCESS,
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
          type: GET_TARGETS_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

/**
 * Get Target
 *
 * @param {*} action
 * @returns
 */
function* getTarget(action) {
  try {
    const res = yield call(getTargetAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_TARGET_SUCCESS,
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
          redirect: '/data-riwayat/skp'
        }
      })
      yield put({
        type: GET_TARGET_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Delete Target
 *
 * @param {*} action
 * @returns
 */
function* deleteTarget(action) {
  try {
    const res = yield call(deleteTargetAction, action?.payload)

    const payload = res?.data

    yield put({
      type: DELETE_TARGET_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Riwayat SKP Berhasil Dihapus',
        childMessage: payload?.message,
        redirect: '/data-riwayat/skp'
      }
    })
  } catch (err) {
    const errors = err?.data
    if ([401, 403]?.includes(errors?.code)) {
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
          message: 'Riwayat SKP Gagal Dihapus',
          message: errors?.message
        }
      })
      yield put({
        type: DELETE_TARGET_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Post Target
 *
 * @param {*} action
 * @returns
 */
function* postTarget(action) {
  try {
    const res = yield call(postTargetAction, action?.payload)

    const payload = res?.data

    yield put({
      type: POST_TARGET_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Riwayat SKP Berhasil Ditambahkan',
        childMessage: payload?.message,
        redirect: '/data-riwayat/skp'
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
          message: 'Riwayat SKP Gagal Ditambahkan',
          childMessage: errors?.message
        }
      })
      yield put({
        type: POST_TARGET_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Update Target
 *
 * @param {*} action
 * @returns
 *
 */
function* updateTarget(action) {
  try {
    const res = yield call(updateTargetAction, action?.payload)

    const payload = res?.data

    yield put({
      type: UPDATE_TARGET_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Riwayat SKP Berhasil Diubah',
        childMessage: payload?.message,
        redirect: '/data-riwayat/skp'
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
          message: 'Riwayat SKP Gagal Diubah',
          childMessage: errors?.message
        }
      })
      yield put({
        type: UPDATE_TARGET_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

function* TARGETSaga() {
  yield takeEvery(GET_TARGETS_REQUESTED, getTargets)
  yield takeEvery(GET_TARGET_REQUESTED, getTarget)
  yield takeEvery(DELETE_TARGET_REQUESTED, deleteTarget)
  yield takeEvery(POST_TARGET_REQUESTED, postTarget)
  yield takeEvery(UPDATE_TARGET_REQUESTED, updateTarget)
}

export default TARGETSaga
