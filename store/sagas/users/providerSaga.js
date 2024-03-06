/**
 * 
 * @module Saga/users/providerSaga
 * 
 * @desc provider
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_PROVIDER_REQUESTED,
  GET_PROVIDER_SUCCESS,
  GET_PROVIDER_FAILED,
  POST_PROVIDER_REQUESTED,
  POST_PROVIDER_SUCCESS,
  POST_PROVIDER_FAILED,
  GET_DETAIL_PROVIDER_REQUESTED,
  GET_DETAIL_PROVIDER_SUCCESS,
  GET_DETAIL_PROVIDER_FAILED,
  UPDATE_PROVIDER_REQUESTED,
  UPDATE_PROVIDER_SUCCESS,
  UPDATE_PROVIDER_FAILED,
  DELETE_PROVIDER_REQUESTED,
  DELETE_PROVIDER_SUCCESS,
  DELETE_PROVIDER_FAILED,
  DELETE_LIST_PROVIDER_REQUESTED,
  DELETE_LIST_PROVIDER_SUCCESS,
  DELETE_LIST_PROVIDER_FAILED,
  CATCH_ERROR,
  SET_MODAL,
  ACTION_RESPONSER
} from '@/store/constants'
import {
  getProviderAction,
  postProviderAction,
  getDetailProviderAction,
  updateProviderAction,
  deleteProviderAction,
  deleteListProviderAction
} from '../action/users/providerAction'

/**
 * Get Provider 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetProvider(action) {
  try {
    const res = yield call(getProviderAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_PROVIDER_SUCCESS,
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
          payload: {
            code: err?.data?.meta?.code,
            message: err?.data?.meta?.message
          }
        }
      })
      yield put({
        type: GET_PROVIDER_FAILED,
        payload: {
          modal: true,
          error: err?.data?.meta?.message
        }
      })
    }
  }
}

/**
 * Get Detail Provider 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchDetailProvider(action) {
  try {
    const res = yield call(getDetailProviderAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_DETAIL_PROVIDER_SUCCESS,
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
      if (err?.data?.statusCode === 400) {
        yield put({
          type: CATCH_ERROR,
          payload: err?.data?.message
        })
      } else {
        yield put({
          type: GET_DETAIL_PROVIDER_FAILED,
          payload: err?.data?.message
        })
      }
    }
  }
}

/**
 * post provider 
 * 
 * @param {*} action 
 * @returns
 */
function* postProvider(action) {
  try {
    const res = yield call(postProviderAction, action?.payload)

    const payload = res?.data

    yield put({
      type: POST_PROVIDER_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Penyelenggara berhasil ditambahkan',
        redirect: '/manajemen-pengguna/penyelenggara'
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
          message: 'Penyelenggara gagal ditambahkan',
          childMessage: err?.data?.meta?.message
        }
      })
      yield put({
        type: POST_PROVIDER_FAILED,
        payload: {
          modal: true,
          error: err?.data?.message
        }
      })
    }
  }
}


/**
 * Update Provider 
 * 
 * @param {*} action 
 * @returns
 */
function* updateProvider(action) {
  try {
    const res = yield call(updateProviderAction, action?.payload)

    const payload = res?.data

    yield put({
      type: UPDATE_PROVIDER_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Perubahan Penyelenggara berhasil disimpan',
        redirect: '/manajemen-pengguna/penyelenggara'
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
          message: 'Perubahan Penyelenggara gagal disimpan',
          childMessage: err?.data?.meta?.message
        }
      })
      yield put({
        type: UPDATE_PROVIDER_FAILED,
        payload: {
          modal: true,
          error: err?.data?.message
        }
      })
    }
  }
}

function* deleteProvider(action) {
  try {
    const res = yield call(deleteProviderAction, action?.payload)

    const payload = res?.data

    yield put({
      type: DELETE_PROVIDER_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Penyelenggara berhasil dihapus',
        redirect: '/manajemen-pengguna/penyelenggara'
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
          message: 'Penyelenggara gagal dihapus'
        }
      })
      yield put({
        type: DELETE_PROVIDER_FAILED,
        payload: {
          modal: true,
          error: err?.data?.message
        }
      })
    }
  }
}

/**
 * Delete List Provider 
 * 
 * @param {*} action 
 * @returns
 */
function* deleteListProvider(action) {
  try {
    const res = yield call(deleteListProviderAction, action?.payload)

    const payload = res?.data

    yield put({
      type: DELETE_LIST_PROVIDER_SUCCESS,
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
          type: DELETE_LIST_PROVIDER_FAILED,
          payload: status?.message
        })
      }
    }
  }
}

function* providerSaga() {
  yield takeEvery(GET_PROVIDER_REQUESTED, fetchGetProvider)
  yield takeEvery(POST_PROVIDER_REQUESTED, postProvider)
  yield takeEvery(GET_DETAIL_PROVIDER_REQUESTED, fetchDetailProvider)
  yield takeEvery(UPDATE_PROVIDER_REQUESTED, updateProvider)
  yield takeEvery(DELETE_PROVIDER_REQUESTED, deleteProvider)
  yield takeEvery(DELETE_LIST_PROVIDER_REQUESTED, deleteListProvider)
}

export default providerSaga