/**
 *
 * @module Saga/recap/notesSaga
 *
 * @desc Notes
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_NOTES_REQUESTED,
  GET_NOTES_SUCCESS,
  GET_NOTES_FAILED,
  UPDATE_NOTES_REQUESTED,
  UPDATE_NOTES_SUCCESS,
  UPDATE_NOTES_FAILED,
  ACTION_RESPONSER,
  SET_MODAL
} from '../../constants'
import {
  getNotesByUserIDAction,
  updateNotesByUserIDAction
} from '../action/recap/notesAction'

/**
 * GET NOTES BY USER ID
 *
 * @returns
 */
function* getNotesByUserID(action) {
  try {
    const res = yield call(getNotesByUserIDAction, action?.payload)
    const payload = res?.data

    yield put({
      type: GET_NOTES_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const error = err?.data
    if (error?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: error?.code,
          message: error?.message
        }
      })
    } else {
      if (error?.code === 401 || error?.code === 403) {
        yield put({
          type: SET_MODAL,
          payload: {
            message: error?.message

          }
        })
      } else {
        yield put({
          type: GET_NOTES_FAILED,
          payload: { error: error?.message }
        })
      }
    }
  }
}

/**
 * POST UPDATE NOTES BY USER ID
 *
 * @param {*} action
 * @returns
 */
function* updateNotesByUserID(action) {
  try {
    const res = yield call(updateNotesByUserIDAction, action?.payload)
    const payload = res?.data

    yield put({
      type: UPDATE_NOTES_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: payload?.message,
        childMessage: 'Anda telah berhasil menyimpan catatan'
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
          message: `Catatan baru gagal ditambahkan`,
          childMessage: error?.message
        }
      })
      yield put({
        type: UPDATE_NOTES_FAILED,
        payload: {
          error: error?.message
        }
      })
    }
  }
}

function* notesSaga() {
  yield takeEvery(GET_NOTES_REQUESTED, getNotesByUserID)
  yield takeEvery(UPDATE_NOTES_REQUESTED, updateNotesByUserID)
}

export default notesSaga
