/**
 *
 * @module Saga/disciplinarySaga
 *
 * @desc Disciplinary
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_DISCIPLINARIES_OPTIONS_REQUESTED,
  GET_DISCIPLINARIES_OPTIONS_SUCCESS,
  GET_DISCIPLINARIES_OPTIONS_FAILED,
  GET_DISCIPLINARIES_REQUESTED,
  GET_DISCIPLINARIES_SUCCESS,
  GET_DISCIPLINARIES_FAILED,
  GET_DISCIPLINARY_REQUESTED,
  GET_DISCIPLINARY_SUCCESS,
  GET_DISCIPLINARY_FAILED,
  POST_DISCIPLINARY_REQUESTED,
  POST_DISCIPLINARY_SUCCESS,
  POST_DISCIPLINARY_FAILED,
  UPDATE_DISCIPLINARY_REQUESTED,
  UPDATE_DISCIPLINARY_SUCCESS,
  UPDATE_DISCIPLINARY_FAILED,
  DELETE_DISCIPLINARY_REQUESTED,
  DELETE_DISCIPLINARY_SUCCESS,
  DELETE_DISCIPLINARY_FAILED,
  SET_MODAL,
  ACTION_RESPONSER
} from '../../constants'
import {
  getDisciplinariesAction,
  deleteDisciplinaryAction,
  getDisciplinaryAction,
  postDisciplinaryAction,
  updateDisciplinaryAction,
  getDisciplinariesOptionsAction
} from '../action/histories/disciplinaryAction'
import Router from 'next/router'

/**
 * Get Disciplinaries Options
 *
 * @param {*} action
 * @returns
 */
function* getDisciplinariesOptions(action) {
  try {
    const res = yield call(getDisciplinariesOptionsAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_DISCIPLINARIES_OPTIONS_SUCCESS,
      payload
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
        type: GET_DISCIPLINARIES_OPTIONS_FAILED,
        payload: errorMessage
      })
    }
  }
}

/**
 * Get Disciplinaries
 *
 * @param {*} action
 * @returns
 */
function* getDisciplinaries(action) {
  try {
    const res = yield call(getDisciplinariesAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_DISCIPLINARIES_SUCCESS,
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
          type: GET_DISCIPLINARIES_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

/**
 * Get Disciplinary
 *
 * @param {*} action
 * @returns
 */
function* getDisciplinary(action) {
  try {
    const res = yield call(getDisciplinaryAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_DISCIPLINARY_SUCCESS,
      payload
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
      yield put({
        type: SET_MODAL,
        payload: {
          code: errors?.code,
          message: 'Warning!',
          childMessage: errors?.message,
          redirect: '/data-riwayat/hukuman-disiplin'
        }
      })
      yield put({
        type: GET_DISCIPLINARY_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Delete Disciplinary
 *
 * @param {*} action
 * @returns
 */
function* deleteDisciplinary(action) {
  try {
    const res = yield call(deleteDisciplinaryAction, action?.payload)
    const payload = res?.data
    const path = Router.pathname
    const redirect = path?.includes('detail') ? 
      `/${path.split('/').slice(1, 3).join('/')}` : ''

    yield put({
      type: DELETE_DISCIPLINARY_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Riwayat Hukuman Disiplin Berhasil Dihapus',
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
          message: 'Riwayat Hukuman Disiplin Gagal Dihapus',
          message: errors?.message
        }
      })
      yield put({
        type: DELETE_DISCIPLINARY_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Post Disciplinary
 *
 * @param {*} action
 * @returns
 */
function* postDisciplinary(action) {
  try {
    const res = yield call(postDisciplinaryAction, action?.payload)

    const payload = res?.data

    yield put({
      type: POST_DISCIPLINARY_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Riwayat Hukuman Disiplin Berhasil Ditambahkan',
        childMessage: payload?.message,
        redirect: '/data-riwayat/hukuman-disiplin'
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
      yield put({
        type: SET_MODAL,
        payload: {
          code: errors?.code,
          message: 'Riwayat Hukuman Disiplin Gagal Ditambahkan',
          childMessage: errors?.message
        }
      })
      yield put({
        type: POST_DISCIPLINARY_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Update Disciplinary
 *
 * @param {*} action
 * @returns
 *
 */
function* updateDisciplinary(action) {
  try {
    const res = yield call(updateDisciplinaryAction, action?.payload)

    const payload = res?.data

    yield put({
      type: UPDATE_DISCIPLINARY_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Riwayat Hukuman Disiplin Berhasil Diubah',
        childMessage: payload?.message,
        redirect: '/data-riwayat/hukuman-disiplin'
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
      yield put({
        type: SET_MODAL,
        payload: {
          code: errors?.code,
          message: 'Riwayat Hukuman Disiplin Gagal Diubah',
          childMessage: errors?.message
        }
      })
      yield put({
        type: UPDATE_DISCIPLINARY_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

function* disciplinarySaga() {
  yield takeEvery(
    GET_DISCIPLINARIES_OPTIONS_REQUESTED,
    getDisciplinariesOptions
  )
  yield takeEvery(GET_DISCIPLINARIES_REQUESTED, getDisciplinaries)
  yield takeEvery(GET_DISCIPLINARY_REQUESTED, getDisciplinary)
  yield takeEvery(DELETE_DISCIPLINARY_REQUESTED, deleteDisciplinary)
  yield takeEvery(POST_DISCIPLINARY_REQUESTED, postDisciplinary)
  yield takeEvery(UPDATE_DISCIPLINARY_REQUESTED, updateDisciplinary)
}

export default disciplinarySaga
