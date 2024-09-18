/**
 *
 * @module Saga/RecognitionSaga
 *
 * @desc Recognition
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_RECOGNITIONS_REQUESTED,
  GET_RECOGNITIONS_SUCCESS,
  GET_RECOGNITIONS_FAILED,
  GET_RECOGNITION_REQUESTED,
  GET_RECOGNITION_SUCCESS,
  GET_RECOGNITION_FAILED,
  POST_RECOGNITION_REQUESTED,
  POST_RECOGNITION_SUCCESS,
  POST_RECOGNITION_FAILED,
  UPDATE_RECOGNITION_REQUESTED,
  UPDATE_RECOGNITION_SUCCESS,
  UPDATE_RECOGNITION_FAILED,
  DELETE_RECOGNITION_REQUESTED,
  DELETE_RECOGNITION_SUCCESS,
  DELETE_RECOGNITION_FAILED,
  SET_MODAL,
  ACTION_RESPONSER,
  GET_RECOGNITIONS_OPTIONS_REQUESTED,
  GET_RECOGNITIONS_OPTIONS_SUCCESS,
  GET_RECOGNITIONS_OPTIONS_FAILED
} from '../../constants'
import {
  deleteRecognitionAction,
  getRecognitionAction,
  getRecognitionsAction,
  getRecognitionsOptionsAction,
  postRecognitionAction,
  updateRecognitionAction
} from '../action/histories/recognitionAction'
import Router from 'next/router'

/**
 * Get Recognitions Options
 *
 * @param {*} action
 * @returns
 */
function* getRecognitionsOptions(action) {
  try {
    const res = yield call(getRecognitionsOptionsAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_RECOGNITIONS_OPTIONS_SUCCESS,
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
          type: GET_RECOGNITIONS_OPTIONS_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

/**
 * Get Recognitions
 *
 * @param {*} action
 * @returns
 */
function* getRecognitions(action) {
  try {
    const res = yield call(getRecognitionsAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_RECOGNITIONS_SUCCESS,
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
          type: GET_RECOGNITIONS_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

/**
 * Get Recognition
 *
 * @param {*} action
 * @returns
 */
function* getRecognition(action) {
  try {
    const res = yield call(getRecognitionAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_RECOGNITION_SUCCESS,
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
          redirect: '/data-riwayat/penghargaan'
        }
      })
      yield put({
        type: GET_RECOGNITION_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Delete Recognition
 *
 * @param {*} action
 * @returns
 */
function* deleteRecognition(action) {
  try {
    const res = yield call(deleteRecognitionAction, action?.payload)
    const payload = res?.data
    const path = Router.pathname
    const redirect = path?.includes('detail') ? 
      `/${path.split('/').slice(1, 3).join('/')}` : ''

    yield put({
      type: DELETE_RECOGNITION_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Riwayat Penghargaan Berhasil Dihapus',
        childMessage: payload?.message,
        redirect
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
          message: 'Riwayat Penghargaan Gagal Dihapus',
          message: errors?.message
        }
      })
      yield put({
        type: DELETE_RECOGNITION_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Post Recognition
 *
 * @param {*} action
 * @returns
 */
function* postRecognition(action) {
  try {
    const res = yield call(postRecognitionAction, action?.payload)

    const payload = res?.data

    yield put({
      type: POST_RECOGNITION_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Riwayat Penghargaan Berhasil Ditambahkan',
        childMessage: payload?.message,
        redirect: '/data-riwayat/penghargaan'
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
          message: 'Riwayat Penghargaan Gagal Ditambahkan',
          childMessage: errors?.message
        }
      })
      yield put({
        type: POST_RECOGNITION_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Update Recognition
 *
 * @param {*} action
 * @returns
 *
 */
function* updateRecognition(action) {
  try {
    const res = yield call(updateRecognitionAction, action?.payload)

    const payload = res?.data

    yield put({
      type: UPDATE_RECOGNITION_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Riwayat Penghargaan Berhasil Diubah',
        childMessage: payload?.message,
        redirect: '/data-riwayat/penghargaan'
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
          message: 'Riwayat Penghargaan Gagal Diubah',
          childMessage: errors?.message
        }
      })
      yield put({
        type: UPDATE_RECOGNITION_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

function* recognitionSaga() {
  yield takeEvery(GET_RECOGNITIONS_OPTIONS_REQUESTED, getRecognitionsOptions)
  yield takeEvery(GET_RECOGNITIONS_REQUESTED, getRecognitions)
  yield takeEvery(GET_RECOGNITION_REQUESTED, getRecognition)
  yield takeEvery(DELETE_RECOGNITION_REQUESTED, deleteRecognition)
  yield takeEvery(POST_RECOGNITION_REQUESTED, postRecognition)
  yield takeEvery(UPDATE_RECOGNITION_REQUESTED, updateRecognition)
}

export default recognitionSaga
