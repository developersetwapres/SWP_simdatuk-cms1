/**
 *
 * @module Saga/GradeSaga
 *
 * @desc Grade
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_GRADES_OPTIONS_REQUESTED,
  GET_GRADES_OPTIONS_SUCCESS,
  GET_GRADES_OPTIONS_FAILED,
  GET_GRADES_REQUESTED,
  GET_GRADES_SUCCESS,
  GET_GRADES_FAILED,
  GET_GRADE_REQUESTED,
  GET_GRADE_SUCCESS,
  GET_GRADE_FAILED,
  POST_GRADE_REQUESTED,
  POST_GRADE_SUCCESS,
  POST_GRADE_FAILED,
  UPDATE_GRADE_REQUESTED,
  UPDATE_GRADE_SUCCESS,
  UPDATE_GRADE_FAILED,
  DELETE_GRADE_REQUESTED,
  DELETE_GRADE_SUCCESS,
  DELETE_GRADE_FAILED,
  SET_MODAL,
  ACTION_RESPONSER
} from '../../constants'
import {
  deleteGradeAction,
  getGradeAction,
  getGradesAction,
  getGradesOptionsAction,
  postGradeAction,
  updateGradeAction
} from '../action/histories/gradeAction'
import Router from 'next/router'

/**
 * Get Grades Options
 *
 * @param {*} action
 * @returns
 */
function* getGradesOptions(action) {
  try {
    const res = yield call(getGradesOptionsAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_GRADES_OPTIONS_SUCCESS,
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
          type: GET_GRADES_OPTIONS_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

/**
 * Get Grades
 *
 * @param {*} action
 * @returns
 */
function* getGrades(action) {
  try {
    const res = yield call(getGradesAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_GRADES_SUCCESS,
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
          type: GET_GRADES_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

/**
 * Get Grade
 *
 * @param {*} action
 * @returns
 */
function* getGrade(action) {
  try {
    const res = yield call(getGradeAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_GRADE_SUCCESS,
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
          redirect: '/data-riwayat/golongan'
        }
      })
      yield put({
        type: GET_GRADE_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Delete Grade
 *
 * @param {*} action
 * @returns
 */
function* deleteGrade(action) {
  try {
    const res = yield call(deleteGradeAction, action?.payload)
    const payload = res?.data
    const path = Router.asPath
    const redirect = path?.includes('detail') ? 'back' : 'refresh'

    yield put({
      type: DELETE_GRADE_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Riwayat Golongan Berhasil Dihapus',
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
          message: 'Riwayat Golongan Gagal Dihapus',
          message: errors?.message
        }
      })
      yield put({
        type: DELETE_GRADE_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Post Grade
 *
 * @param {*} action
 * @returns
 */
function* postGrade(action) {
  try {
    const res = yield call(postGradeAction, action?.payload)

    const payload = res?.data

    yield put({
      type: POST_GRADE_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Riwayat Golongan Berhasil Ditambahkan',
        childMessage: payload?.message,
        redirect: '/data-riwayat/golongan'
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
          message: 'Riwayat Golongan Gagal Ditambahkan',
          childMessage: errors?.message
        }
      })
      yield put({
        type: POST_GRADE_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Update Grade
 *
 * @param {*} action
 * @returns
 *
 */
function* updateGrade(action) {
  try {
    const res = yield call(updateGradeAction, action?.payload)

    const payload = res?.data

    yield put({
      type: UPDATE_GRADE_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Riwayat Golongan Berhasil Diubah',
        childMessage: payload?.message,
        redirect: '/data-riwayat/golongan'
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
          message: 'Riwayat Golongan Gagal Diubah',
          childMessage: errors?.message
        }
      })
      yield put({
        type: UPDATE_GRADE_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

function* GradeSaga() {
  yield takeEvery(GET_GRADES_OPTIONS_REQUESTED, getGradesOptions)
  yield takeEvery(GET_GRADES_REQUESTED, getGrades)
  yield takeEvery(GET_GRADE_REQUESTED, getGrade)
  yield takeEvery(DELETE_GRADE_REQUESTED, deleteGrade)
  yield takeEvery(POST_GRADE_REQUESTED, postGrade)
  yield takeEvery(UPDATE_GRADE_REQUESTED, updateGrade)
}

export default GradeSaga
