/**
 *
 * @module Saga/authentication
 *
 * @desc Authentication
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  AUTHENTICATION_REQUESTED,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILED,
  GET_USER_INFORMATION_REQUESTED,
  UPDATE_PASSWORD_REQUESTED,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILED,
  FORGET_PASSWORD_REQUESTED,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAILED,
  GET_PROFILE_REQUESTED,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
  UPDATE_PROFILE_REQUESTED,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  SET_MODAL,
  AUTHENTICATION_LOGOUT_REQUESTED,
  GET_HASH_URL_PASSWORD_REQUESTED,
  GET_HASH_URL_PASSWORD_SUCCESS,
  GET_HASH_URL_PASSWORD_FAILED,
  RESET_PASSWORD_REQUESTED,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  AUTHENTICATION_QR_REQUESTED,
  AUTHENTICATION_QR_SUCCESS,
  AUTHENTICATION_QR_FAILED
} from '../constants'
import {
  authenticationPost,
  updatePasswordAction,
  forgetPasswordAction,
  updateProfileAction,
  getHashUrlPasswordAction,
  resetPasswordAction,
  authenticationQrCodeAction,
  getProfileAction
} from './action/authenticationAction'
import { delay } from './sagaUtils'
import Router from 'next/router'
import { clearStorages, setStorages } from '@/utils/storage'
import { encryptedItem } from '@/utils/crypt'

function* postAuthentication(action) {
  try {
    const res = yield call(authenticationPost, action?.payload)

    if (res) {
      const payload = res?.data
      yield put({
        type: AUTHENTICATION_SUCCESS,
        payload: payload
      })
      setStorages([
        {
          name: 'user_info',
          value: JSON.stringify(payload.user)
        }
      ])
      setStorages([
        {
          name: 'setneg_token',
          value: payload.token
        }
      ])
      encryptedItem(
        'my-menu',
        'setneg_menu',
        JSON.stringify({ access: payload?.menu_access })
      )
      yield delay(1000)
      yield put({ type: GET_USER_INFORMATION_REQUESTED })
      Router.push('/dashboard')
    }
  } catch (err) {
    const data = err?.data

    yield put({
      type: SET_MODAL,
      payload: {
        code: data?.code,
        message: data?.message || 'Mohon maaf kami sedang dalam gangguan'
      }
    })

    yield put({
      type: AUTHENTICATION_FAILED,
      payload: {
        code: err?.data?.meta?.code || err?.data?.message,
        message: err?.data?.meta?.message || err?.data?.message
      }
    })
  }
}

function* updatePassword(action) {
  try {
    const res = yield call(updatePasswordAction, action?.payload)

    const payload = res?.data
    yield put({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: payload
    })

    localStorage.removeItem('setneg_token')
    localStorage.removeItem('_setneg_user')
    localStorage.removeItem('setneg_menu')
    localStorage.removeItem('setneg_notification')
    // window.location
    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Password berhasil diubah',
        redirect: '/auth/login'
      }
    })
  } catch (err) {
    yield put({
      type: SET_MODAL,
      payload: {
        code: err?.statusCode,
        message: 'Password gagal diubah',
        redirect: '/profile'
      }
    })
    yield put({
      type: UPDATE_PASSWORD_FAILED,
      payload: {
        modal: true,
        error: err?.message
      }
    })
  }
}

/**
 * Forget Password Sagas
 *
 * @param {*} action
 * @returns
 */
function* forgetPassword(action) {
  try {
    const res = yield call(forgetPasswordAction, action?.payload)

    const payload = res?.data
    yield put({
      type: FORGET_PASSWORD_SUCCESS,
      payload: payload
    })
    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: payload?.message
      }
    })
  } catch (err) {
    yield put({
      type: SET_MODAL,
      payload: {
        code: err?.data?.code,
        message: err?.data?.message
      }
    })
    yield put({
      type: FORGET_PASSWORD_FAILED,
      payload: {
        error: err?.data?.meta?.message
      }
    })
  }
}

/**
 * Get Profile
 *
 * @returns
 */
function* getProfile() {
  try {
    const res = yield call(getProfileAction)
    const payload = res?.data

    yield put({
      type: GET_PROFILE_SUCCESS,
      payload
    })
  } catch (err) {
    const error = err?.data

    yield put({
      type: SET_MODAL,
      payload: {
        code: error?.code,
        message: error?.message
      }
    })

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
        type: GET_PROFILE_FAILED,
        payload: { error: error?.message }
      })
    }
  }
}

/**
 * Update Profile
 *
 * @param {*} action
 * @returns
 */
function* updateProfileSagas(action) {
  try {
    const res = yield call(updateProfileAction, action?.payload)
    const payload = res?.data
    // const getUser = decryptItem('_setneg_user', 'my-info')
    // encryptedItem(
    //   'my-info',
    //   '_setneg_user',
    //   JSON.stringify({
    //     nip: getUser.nip,
    //     name: getUser.name,
    //     email: payload?.data?.email,
    //     roles: getUser.roles,
    //     photo: payload?.data?.photo,
    //     position: getUser.position,
    //     unit: getUser.unit,
    //     level: getUser.level
    //   })
    // )
    yield put({
      type: UPDATE_PROFILE_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Profil Berhasil Diedit',
        childMessage: 'Anda telah berhasil mengedit profil',
        redirect: '/profile'
      }
    })
  } catch (err) {
    yield put({
      type: SET_MODAL,
      payload: {
        code: err?.data?.code,
        message: err?.data?.message
      }
    })
    yield put({
      type: UPDATE_PROFILE_FAILED,
      payload: err.data?.meta?.message
    })
  }
}

/**
 * Logout Sagas
 *
 * @returns
 */
function* authenticationLogout() {
  clearStorages(['setneg_token', 'setneg_menu'])
  Router.push('/auth/login')
}

/**
 * Get Hash Sagas
 *
 * @param {*} action
 * @returns
 */
function* getHashPassword(action) {
  try {
    const res = yield call(getHashUrlPasswordAction, action?.payload)

    const payload = res?.data
    yield put({
      type: GET_HASH_URL_PASSWORD_SUCCESS,
      payload: payload
    })
  } catch (err) {
    yield put({
      type: GET_HASH_URL_PASSWORD_FAILED,
      payload: err?.data?.meta?.message
    })
  }
}

/**
 * Reset Password
 *
 * @param {*} action
 * @returns
 */
function* resetPasswordSaga(action) {
  const isNewPassword = action?.payload?.status

  try {
    const res = yield call(resetPasswordAction, action?.payload)
    const payload = res?.data
    const message = isNewPassword ?
      'Password Baru Berhasil Disimpan' : 'Reset Password Berhasil Disimpan'
    const childMessage = isNewPassword ?
      'Anda telah berhasil menyimpan password baru' : 'Anda telah berhasil melakukan reset password'

    yield put({
      type: RESET_PASSWORD_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message,
        childMessage,
        redirect: '/'
      }
    })
  } catch (err) {
    yield put({
      type: SET_MODAL,
      payload: {
        code: err?.data?.code,
        message: err?.data?.message
      }
    })
    yield put({
      type: RESET_PASSWORD_FAILED,
      payload: {
        modal: true,
        error: err?.message
      }
    })
  }
}

/**
 * Authentication QR Code
 *
 * @param {*} action
 * @returns
 */
function* postQRCodeAction(action) {
  try {
    const res = yield call(authenticationQrCodeAction, action?.payload)

    const payload = res?.data?.data
    yield put({
      type: AUTHENTICATION_QR_SUCCESS,
      payload: Object.assign({ status: res?.data?.meta?.code }, payload)
    })
  } catch (err) {
    yield put({
      type: AUTHENTICATION_QR_FAILED,
      payload: {
        code: err?.data?.meta?.code,
        message: err?.data?.meta?.message
      }
    })
  }
}

function* authSaga() {
  yield takeEvery(AUTHENTICATION_REQUESTED, postAuthentication)
  yield takeEvery(UPDATE_PASSWORD_REQUESTED, updatePassword)
  yield takeEvery(FORGET_PASSWORD_REQUESTED, forgetPassword)
  yield takeEvery(GET_PROFILE_REQUESTED, getProfile)
  yield takeEvery(UPDATE_PROFILE_REQUESTED, updateProfileSagas)
  yield takeEvery(AUTHENTICATION_LOGOUT_REQUESTED, authenticationLogout)
  yield takeEvery(GET_HASH_URL_PASSWORD_REQUESTED, getHashPassword)
  yield takeEvery(RESET_PASSWORD_REQUESTED, resetPasswordSaga)
  yield takeEvery(AUTHENTICATION_QR_REQUESTED, postQRCodeAction)
}

export default authSaga
