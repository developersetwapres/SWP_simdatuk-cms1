/**
 * 
 * @module Saga/users/UserSaga 
 * 
 * @desc User 
*/
import { encryptedItem } from '@/utils/crypt'
// import { setStorages } from '@/utils/storage'
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_USERS_REQUESTED,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  POST_USERS_REQUESTED,
  POST_USERS_SUCCESS,
  POST_USERS_FAILED,
  GET_USER_DETAIL_REQUESTED,
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_FAILED,
  DELETE_USER_REQUESTED,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  CATCH_ERROR,
  SET_MODAL,
  UPDATE_USER_REQUESTED,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  GET_USER_INFORMATION_REQUESTED,
  GET_USER_INFORMATION_SUCCESS,
  GET_USER_INFORMATION_FAILED,
  GET_USER_COURSE_REQUESTED,
  GET_USER_COURSE_SUCCESS,
  GET_USER_COURSE_FAILED,
  DELETE_LIST_USER_FAILED,
  DELETE_LIST_USER_SUCCESS,
  DELETE_LIST_USER_REQUESTED,
  ACTION_RESPONSER
} from '../../constants'
import {
  getDetailUserAction,
  getUserAction,
  postUserAction,
  deleteUserAction,
  updateUserAction,
  getUserInformationAction,
  getUserCourseAction
} from '../action/users/userAction'

/**
 * GET USER 
 * 
 * @param {*} action 
 * @returns 
 */
function* fetchGetUsers(action) {
  try {
    const res = yield call(getUserAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_USERS_SUCCESS,
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
      // if (err?.data?.statusCode || status?.code === 401 || err?.data?.statusCode || status?.code === 403) {
      //   yield put({
      //     type: SET_MODAL,
      //     payload: {
      //       message: 'Forbidden',
      //       redirect: '/profile'
      //     }
      //   })
      // } else {
      yield put({
        type: GET_USERS_FAILED,
        payload: status?.message
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
      type: POST_USERS_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Pengguna Baru berhasil ditambahkan',
        redirect: '/manajemen-pengguna/pengguna'
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
          code: err?.data?.statusCode,
          message: `Pengguna Baru gagal ditambahkan`,
          childMessage: err?.data?.meta?.message
        }
      })
      yield put({
        type: POST_USERS_FAILED,
        payload: {
          modal: true,
          error: err?.data?.message
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
        code: res?.data?.meta?.code,
        message: 'Pengguna berhasil dihapus',
        redirect: '/manajemen-pengguna/pengguna'
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
          code: err?.data?.statusCode,
          message: 'Pengguna gagal dihapus'
        }
      })
      yield put({
        type: DELETE_USER_FAILED,
        payload: {
          modal: true,
          error: err?.data?.message
        }
      })
    }
  }
}


/**
 * Get Detail User 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetDetailUser(action) {
  try {
    const res = yield call(getDetailUserAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_USER_DETAIL_SUCCESS,
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
      yield put({
        type: SET_MODAL,
        payload: {
          code: status?.code || err?.data?.statusCode,
          message: status?.message || err?.data?.message,
          redirect: '/manajemen-pengguna/pengguna'
        }
      })
      yield put({
        type: GET_USER_DETAIL_FAILED,
        payload: {
          modal: true,
          error: status?.message || err?.data?.message
        }
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
        code: res?.data?.meta?.code,
        message: 'Pengguna Baru berhasil diubah',
        redirect: '/manajemen-pengguna/pengguna'
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
          code: err?.data?.statusCode,
          message: `Pengguna Baru gagal diubah`,
          childMessage: err?.data?.meta?.message || err?.data?.message
        }
      })
      yield put({
        type: UPDATE_USER_FAILED,
        payload: {
          modal: true,
          error: err?.data?.meta?.message
        }
      })
    }
  }
}

// eslint-disable-next-line no-unused-vars
function* fetchGetUserInformation(action) {
  try {
    const res = yield call(getUserInformationAction)

    const payload = res?.data
    yield put({
      type: GET_USER_INFORMATION_SUCCESS
    })
    // setStorages([
    //   {
    //     name: '_setneg_user',
    //     value: JSON.stringify({
    // nip: payload?.data?.nip,
    // name: payload?.data?.name,
    // email: payload?.data?.email,
    // roles: payload?.data?.roles,
    // photo: payload?.data?.photo,
    // position: payload?.data?.position,
    // unit: payload?.data?.unit,
    // level: payload?.data?.level
    //     })
    //   }
    // ])
    encryptedItem('my-info', '_setneg_user', JSON.stringify({
      nip: payload?.data?.nip,
      name: payload?.data?.name,
      email: payload?.data?.email,
      roles: payload?.data?.roles,
      photo: payload?.data?.photo,
      position: payload?.data?.position,
      unit: payload?.data?.unit,
      level: payload?.data?.level
    }))
  } catch (err) {
    const code = err?.data?.statusCode

    if (code === 400) {
      yield put({
        type: CATCH_ERROR,
        payload: err?.data?.message
      })
    } else {
      yield put({
        type: GET_USER_INFORMATION_FAILED,
        payload: err?.data?.message
      })
    }
  }
}

/**
 * Get Course User 
 * 
 * @param {*} action 
 * @returns
 */
function* getCourseUser(action) {
  try {
    const res = yield call(getUserCourseAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_USER_COURSE_SUCCESS,
      payload: payload
    })
  } catch (err) {
    // yield put({
    //   type: SET_MODAL,

    // })
    yield put({
      type: GET_USER_COURSE_FAILED,
      payload: err?.data?.meta?.message || err?.data?.message
    })
  }
}

function* deleteListUserAction(action) {
  try {
    const res = yield call(deleteUserAction, action?.payload)

    const payload = res?.data

    yield put({
      type: DELETE_LIST_USER_SUCCESS,
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
        type: DELETE_LIST_USER_FAILED,
        payload: {
          error: err?.data?.meta?.message
        }
      })
    }

  }
}

function* userSaga() {
  yield takeEvery(GET_USER_DETAIL_REQUESTED, fetchGetDetailUser)
  yield takeEvery(GET_USERS_REQUESTED, fetchGetUsers)
  yield takeEvery(POST_USERS_REQUESTED, postUser)
  yield takeEvery(DELETE_USER_REQUESTED, deleteUser)
  yield takeEvery(UPDATE_USER_REQUESTED, updateUser)
  yield takeEvery(GET_USER_INFORMATION_REQUESTED, fetchGetUserInformation)
  yield takeEvery(GET_USER_COURSE_REQUESTED, getCourseUser)
  yield takeEvery(DELETE_LIST_USER_REQUESTED, deleteListUserAction)
}

export default userSaga