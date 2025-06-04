/**
 *
 * @module Saga/users/UserSaga
 *
 * @desc User
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_USERS_REQUESTED,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  GET_USER_REQUESTED,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  POST_USER_REQUESTED,
  POST_USER_SUCCESS,
  POST_USER_FAILED,
  UPDATE_USER_REQUESTED,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  DELETE_USER_REQUESTED,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  ACTION_RESPONSER,
  SET_MODAL,
  UPDATE_USER_STATUS_REQUESTED,
  UPDATE_USER_STATUS_SUCCESS,
  UPDATE_USER_STATUS_FAILED
} from '../../constants'
import {
  getUsersAction,
  getUserAction,
  postUserAction,
  deleteUserAction,
  updateUserAction,
  updateUserStatusAction
} from '../action/users/userAction'

/**
 * GET USER
 *
 * @param {*} action
 * @returns
 */
function* getUsers(action) {
  try {
    const res = yield call(getUsersAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_USERS_SUCCESS,
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
          type: GET_USERS_FAILED,
          payload: { error: error?.message }
        })
      }
    }
  }
}

/**
 * Get Detail User
 *
 * @param {*} action
 * @returns
 */
function* getUser(action) {
  try {
    const res = yield call(getUserAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_USER_SUCCESS,
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
        type: GET_USER_FAILED,
        payload: { error: error?.message }
      })
    }
  }
}

/**
 * POST User
 *
 * @param {*} action
 * @returns
 */
function* postUser(action) {
  try {
    const res = yield call(postUserAction, action?.payload)

    const payload = res?.data

    yield put({
      type: POST_USER_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: payload?.message,
        childMessage: 'Anda telah berhasil menambah data pengguna',
        redirect: '/master-data/user'
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
          message: `Pengguna Baru gagal ditambahkan`,
          childMessage: error?.message
        }
      })
      yield put({
        type: POST_USER_FAILED,
        payload: {
          error: error?.message
        }
      })
    }
  }
}

/**
 * Delete User
 *
 * @param {*} action
 * @returns
 */
function* deleteUser(action) {
  try {
    const res = yield call(deleteUserAction, action?.payload)

    const payload = res?.data

    yield put({
      type: DELETE_USER_SUCCESS,
      payload: payload,
      modal: true
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Pengguna berhasil dihapus',
        redirect: '/master-data/user'
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
        type: DELETE_USER_FAILED,
        payload: { error: err?.data?.message }
      })
    }
  }
}

/**
 * Update User
 *
 * @param {*} action
 * @returns
 */
function* updateUser(action) {
  try {
    const res = yield call(updateUserAction, action?.payload)

    const payload = res?.data

    yield put({
      type: UPDATE_USER_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: payload?.message,
        childMessage: 'Anda telah berhasil mengedit data pengguna',
        redirect: '/master-data/user'
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
          message: `Pengguna Baru gagal diubah`,
          childMessage: error?.message
        }
      })
      yield put({
        type: UPDATE_USER_FAILED,
        payload: { error: error?.message }
      })
    }
  }
}

/**
 * Update User Status
 *
 * @param {*} action
 * @returns
 */
function* updateUserStatus(action) {
  try {
    const res = yield call(updateUserStatusAction, action?.payload)

    const payload = res?.data

    yield put({
      type: UPDATE_USER_STATUS_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: payload?.message,
        childMessage: 'Status pengguna berhasil diubah',
        redirect: 'refresh'
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
          message: `Status pengguna gagal diubah`,
          childMessage: error?.message
        }
      })
      yield put({
        type: UPDATE_USER_STATUS_FAILED,
        payload: { error: error?.message }
      })
    }
  }
}

function* userSaga() {
  yield takeEvery(GET_USERS_REQUESTED, getUsers)
  yield takeEvery(GET_USER_REQUESTED, getUser)
  yield takeEvery(POST_USER_REQUESTED, postUser)
  yield takeEvery(DELETE_USER_REQUESTED, deleteUser)
  yield takeEvery(UPDATE_USER_REQUESTED, updateUser)
  yield takeEvery(UPDATE_USER_STATUS_REQUESTED, updateUserStatus)
}

export default userSaga
