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
  GET_ROLES_OPTIONS_REQUESTED,
  GET_ROLES_OPTIONS_SUCCESS,
  GET_ROLES_OPTIONS_FAILED,
  GET_ROLE_REQUESTED,
  GET_ROLE_SUCCESS,
  GET_ROLE_FAILED,
  POST_ROLE_REQUESTED,
  POST_ROLE_SUCCESS,
  POST_ROLE_FAILED,
  UPDATE_ROLE_REQUESTED,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAILED,
  DELETE_ROLE_REQUESTED,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAILED,
  GET_PERMISSIONS_REQUESTED,
  GET_PERMISSIONS_SUCCESS,
  GET_PERMISSIONS_FAILED,
  ACTION_RESPONSER,
  CATCH_ERROR,
  SET_MODAL
} from '@/store/constants'
import {
  getRolesAction,
  getRoleAction,
  postRoleAction,
  updateRoleAction,
  deleteRoleAction,
  getPermissionsAction
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
 * Get roles options
 *
 * @param {*} action
 * @returns
 */
function* fetchGetRolesOptions(action) {
  try {
    const res = yield call(getRolesAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_ROLES_OPTIONS_SUCCESS,
      payload
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
          type: GET_ROLES_OPTIONS_FAILED,
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
      type: GET_ROLE_SUCCESS,
      payload
    })
  } catch (err) {
    const errors = err
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
          message: 'Role tidak ditemukan',
          redirect: '/manajemen-pengguna/peran-pengguna'
        }
      })
      yield put({
        type: GET_ROLE_FAILED,
        payload: {
          modal: true,
          error: errors?.message
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
        code: payload?.code,
        message: 'Peran Pengguna berhasil ditambahkan',
        childMessage: payload?.message,
        redirect: '/master-data/role',
        type: 'CREATE'
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
          message: 'Peran Pengguna gagal ditambahkan',
          childMessage: errors?.message
        }
      })
      yield put({
        type: POST_ROLE_FAILED,
        payload: {
          error: errors?.data
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
        code: payload?.code,
        message: 'Data Role Pengguna Berhasil Diedit',
        childMessage: payload?.message,
        redirect: '/master-data/role',
        type: 'UPDATE'
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
          message: 'Data Role Pengguna Gagal Diedit',
          childMessage: errors?.message
        }
      })
      yield put({
        type: UPDATE_ROLE_FAILED,
        payload: {
          error: errors?.data
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
        code: payload?.code,
        message: 'Data Role Pengguna Berhasil Dihapus',
        childMessage: payload?.message,
        redirect: '/master-data/role',
        type: 'DELETE'
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
          message: 'Data Role Pengguna Dagal Dihapus',
          childMessage: errors?.message
        }
      })
      yield put({
        type: DELETE_ROLE_FAILED,
        payload: {
          error: errors?.message
        }
      })
    }
  }
}

/**
 * Get roles
 *
 * @returns
 */
function* fetchGetPermissions() {
  try {
    const res = yield call(getPermissionsAction)

    const payload = res?.data

    yield put({
      type: GET_PERMISSIONS_SUCCESS,
      payload
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
      if (err.status === 500) {
        yield put({
          type: CATCH_ERROR,
          payload: err?.message
        })
      } else {
        yield put({
          type: GET_PERMISSIONS_FAILED,
          payload: err?.message
        })
      }
    }
  }
}

function* roleSaga() {
  yield takeEvery(GET_ROLES_REQUESTED, fetchGetRoles)
  yield takeEvery(GET_ROLES_OPTIONS_REQUESTED, fetchGetRolesOptions)
  yield takeEvery(GET_ROLE_REQUESTED, fetchDetailRole)
  yield takeEvery(POST_ROLE_REQUESTED, postRole)
  yield takeEvery(UPDATE_ROLE_REQUESTED, updateRole)
  yield takeEvery(DELETE_ROLE_REQUESTED, deleteRole)
  yield takeEvery(GET_PERMISSIONS_REQUESTED, fetchGetPermissions)
}

export default roleSaga
