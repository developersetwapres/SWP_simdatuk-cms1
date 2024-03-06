/**
 * 
 * @module Saga/course/editorSaga 
 * 
 * @desc Editor 
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_EDITOR_CHOICE_REQUESTED,
  GET_EDITOR_CHOICE_SUCCESS,
  GET_EDITOR_CHOICE_FAILED,
  POST_EDITOR_CHOICE_REQUESTED,
  POST_EDITOR_CHOICE_SUCCESS,
  POST_EDITOR_CHOICE_FAILED,
  GET_LIST_EDITOR_REQUESTED,
  GET_LIST_EDITOR_SUCCESS,
  GET_LIST_EDITOR_FAILED,
  CATCH_ERROR,
  ACTION_RESPONSER
  // SET_MODAL
} from '@/store/constants'
import {
  getEditorChoiceAction,
  postEditorChoiceAction,
  getListEditorChoiceAction
} from '../action/course/editorAction'

/**
 * Fetch editor 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetEditorChoice(action) {
  try {
    const res = yield call(getEditorChoiceAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_EDITOR_CHOICE_SUCCESS,
      payload: payload
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
      const status = err?.data?.meta
      if (status?.code === 400) {
        yield put({
          type: CATCH_ERROR,
          payload: status?.message
        })
      } else {
        yield put({
          type: GET_EDITOR_CHOICE_FAILED,
          payload: status?.message
        })
      }
    }
  }
}

/**
 * Post Editor Choice 
 * 
 * @param {*} action 
 * @returns
 */
function* postEditorChoice(action) {
  try {
    const res = yield call(postEditorChoiceAction, action?.payload)

    const payload = res?.data

    yield put({
      type: POST_EDITOR_CHOICE_SUCCESS,
      payload: payload
    })

    // yield put({
    //   type: SET_MODAL,
    //   payload: {
    //     code: res?.data?.meta?.code,
    //     message: 'Course berhasil disimpan',
    //     redirect: '/manajemen-course/editor-choice'
    //   }
    // })
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
      yield put({
        type: POST_EDITOR_CHOICE_FAILED,
        payload: err?.data?.meta?.message
      })
    }
    // yield put({
    //   type: SET_MODAL,
    //   payload: {
    //     code: err?.data?.statusCode,
    //     message: 'Course gagal disimpan'
    //   }
    // })

  }
}

/**
 * Fetch get List 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetListEditor(action) {
  try {
    const res = yield call(getListEditorChoiceAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_LIST_EDITOR_SUCCESS,
      payload: payload
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
      const status = err?.data?.meta
      if (status?.code === 400) {
        yield put({
          type: CATCH_ERROR,
          payload: status?.message
        })
      } else {
        yield put({
          type: GET_LIST_EDITOR_FAILED,
          payload: status?.message
        })
      }
    }

  }
}


function* editorSaga() {
  yield takeEvery(GET_EDITOR_CHOICE_REQUESTED, fetchGetEditorChoice)
  yield takeEvery(POST_EDITOR_CHOICE_REQUESTED, postEditorChoice)
  yield takeEvery(GET_LIST_EDITOR_REQUESTED, fetchGetListEditor)
}

export default editorSaga