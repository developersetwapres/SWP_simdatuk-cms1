/**
 *
 * @module Saga/performanceSaga
 *
 * @desc Performance
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_PERFORMANCES_REQUESTED,
  GET_PERFORMANCES_SUCCESS,
  GET_PERFORMANCES_FAILED,
  GET_PERFORMANCE_REQUESTED,
  GET_PERFORMANCE_SUCCESS,
  GET_PERFORMANCE_FAILED,
  POST_PERFORMANCE_REQUESTED,
  POST_PERFORMANCE_SUCCESS,
  POST_PERFORMANCE_FAILED,
  UPDATE_PERFORMANCE_REQUESTED,
  UPDATE_PERFORMANCE_SUCCESS,
  UPDATE_PERFORMANCE_FAILED,
  DELETE_PERFORMANCE_REQUESTED,
  DELETE_PERFORMANCE_SUCCESS,
  DELETE_PERFORMANCE_FAILED,
  SET_MODAL,
  ACTION_RESPONSER
} from '../../constants'
import {
  deletePerformanceAction,
  getPerformanceAction,
  getPerformancesAction,
  postPerformanceAction,
  updatePerformanceAction
} from '../action/histories/performanceAction'

/**
 * Get Performances
 *
 * @param {*} action
 * @returns
 */
function* getPerformances(action) {
  try {
    const res = yield call(getPerformancesAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_PERFORMANCES_SUCCESS,
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
          type: GET_PERFORMANCES_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

/**
 * Get Performance
 *
 * @param {*} action
 * @returns
 */
function* getPerformance(action) {
  try {
    const res = yield call(getPerformanceAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_PERFORMANCE_SUCCESS,
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
          redirect: '/data-riwayat/ppk'
        }
      })
      yield put({
        type: GET_PERFORMANCE_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Delete Performance
 *
 * @param {*} action
 * @returns
 */
function* deletePerformance(action) {
  try {
    const res = yield call(deletePerformanceAction, action?.payload)

    const payload = res?.data

    yield put({
      type: DELETE_PERFORMANCE_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Riwayat PPK Berhasil Dihapus',
        childMessage: payload?.message,
        redirect: '/data-riwayat/ppk'
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
          message: 'Riwayat PPK Gagal Dihapus',
          message: errors?.message
        }
      })
      yield put({
        type: DELETE_PERFORMANCE_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Post Performance
 *
 * @param {*} action
 * @returns
 */
function* postPerformance(action) {
  try {
    const res = yield call(postPerformanceAction, action?.payload)

    const payload = res?.data

    yield put({
      type: POST_PERFORMANCE_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Riwayat PPK Berhasil Ditambahkan',
        childMessage: payload?.message,
        redirect: '/data-riwayat/ppk'
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
          message: 'Riwayat PPK Gagal Ditambahkan',
          childMessage: errors?.message
        }
      })
      yield put({
        type: POST_PERFORMANCE_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Update Performance
 *
 * @param {*} action
 * @returns
 *
 */
function* updatePerformance(action) {
  try {
    const res = yield call(updatePerformanceAction, action?.payload)

    const payload = res?.data

    yield put({
      type: UPDATE_PERFORMANCE_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Riwayat PPK Berhasil Diubah',
        childMessage: payload?.message,
        redirect: '/data-riwayat/ppk'
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
          message: 'Riwayat PPK Gagal Diubah',
          childMessage: errors?.message
        }
      })
      yield put({
        type: UPDATE_PERFORMANCE_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

function* performanceSaga() {
  yield takeEvery(GET_PERFORMANCES_REQUESTED, getPerformances)
  yield takeEvery(GET_PERFORMANCE_REQUESTED, getPerformance)
  yield takeEvery(DELETE_PERFORMANCE_REQUESTED, deletePerformance)
  yield takeEvery(POST_PERFORMANCE_REQUESTED, postPerformance)
  yield takeEvery(UPDATE_PERFORMANCE_REQUESTED, updatePerformance)
}

export default performanceSaga
