/**
 *
 * @module Saga/users/roleSaga
 *
 * @desc role
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_ROLES_REQUESTED,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILED,
  CATCH_ERROR,
  SET_MODAL,
  GET_DETAIL_ROLE_REQUESTED,
  GET_DETAIL_ROLE_SUCCESS,
  GET_DETAIL_ROLE_FAILED,
  POST_ROLE_REQUESTED,
  POST_ROLE_SUCCESS,
  POST_ROLE_FAILED,
  UPDATE_ROLE_REQUESTED,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAILED,
  DELETE_ROLE_REQUESTED,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAILED,
  ACTION_RESPONSER
} from '@/store/constants'
import {
  getRolesAction,
  getRoleAction,
  postRoleAction,
  updateRoleAction,
  deleteRoleAction
} from '../action/users/roleAction'

/**
 * Get roles
 *
 * @param {*} action
 * @returns
 */
function* fetchGetRoles(action) {
  try {
    const res = yield call(getRolesAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_ROLES_SUCCESS,
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
      if (err.statusCode === 500) {
        yield put({
          type: CATCH_ERROR,
          payload: err?.message
        })
      } else {
        yield put({
          type: GET_ROLES_FAILED,
          payload: err?.message
        })
      }
    }
  }
}

/**
 * Get Detail
 *
 * @param {*} action
 * @returns
 */
function* fetchDetailRole(action) {
  try {
    const res = yield call(getRoleAction, action?.payload)
    const payload = res?.data

    yield put({
      type: GET_DETAIL_ROLE_SUCCESS,
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
      yield put({
        type: SET_MODAL,
        payload: {
          code: err?.meta?.code,
          message: 'Role tidak ditemukan',
          redirect: '/manajemen-pengguna/peran-pengguna'
        }
      })
      yield put({
        type: GET_DETAIL_ROLE_FAILED,
        payload: {
          modal: true,
          error: err?.data?.message
        }
      })
    }
  }
}

/**
 * Post Role Saga
 *
 * @param {*} action
 * @returns
 */
function* postRole(action) {
  try {
    const res = yield call(postRoleAction, action?.payload)

    const payload = res?.data

    yield put({
      type: POST_ROLE_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Peran Pengguna berhasil ditambahkan',
        redirect: '/manajemen-pengguna/peran-pengguna',
        type: 'CREATE'
      }
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
      yield put({
        type: SET_MODAL,
        payload: {
          code: err?.data?.meta?.code,
          message: 'Peran Pengguna gagal ditambahkan',
          childMessage: err?.data?.meta?.message
        }
      })
      yield put({
        type: POST_ROLE_FAILED,
        payload: {
          modal: true,
          error: err?.data?.meta?.message
        }
      })
    }
  }
}

/**
 * Update ROle
 *
 * @param {*} action
 * @returns
 */
function* updateRole(action) {
  try {
    const res = yield call(updateRoleAction, action?.payload)

    const payload = res?.data

    yield put({
      type: UPDATE_ROLE_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Peran Pengguna berhasil diubah',
        redirect: '/manajemen-pengguna/peran-pengguna',
        type: 'UPDATE'
      }
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
      yield put({
        type: SET_MODAL,
        payload: {
          code: err?.meta?.code,
          message: 'Peran Pengguna gagal diubah'
        }
      })
      yield put({
        type: UPDATE_ROLE_FAILED,
        payload: {
          modal: true,
          error: err?.data?.message
        }
      })
    }
  }
}

/**
 * Delete Role
 *
 * @param {*} action
 * @returns
 */
function* deleteRole(action) {
  try {
    const res = yield call(deleteRoleAction, action?.payload)

    const payload = res?.data

    yield put({
      type: DELETE_ROLE_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Peran Pengguna berhasil dihapus',
        redirect: '/manajemen-pengguna/peran-pengguna',
        type: 'DELETE'
      }
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
      yield put({
        type: SET_MODAL,
        payload: {
          code: err?.meta?.code,
          message: 'Peran Pengguna gagal dihapus'
        }
      })
      yield put({
        type: DELETE_ROLE_FAILED,
        payload: {
          modal: true,
          error: err?.data?.message
        }
      })
    }
  }
}

function* roleSaga() {
  yield takeEvery(GET_ROLES_REQUESTED, fetchGetRoles)
  yield takeEvery(GET_DETAIL_ROLE_REQUESTED, fetchDetailRole)
  yield takeEvery(POST_ROLE_REQUESTED, postRole)
  yield takeEvery(UPDATE_ROLE_REQUESTED, updateRole)
  yield takeEvery(DELETE_ROLE_REQUESTED, deleteRole)
}

export default roleSaga
