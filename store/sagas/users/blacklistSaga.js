/**
 * 
 * @module Saga/users/blacklistSaga 
 * 
 * @desc Blacklist
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_BLACKLIST_REQUESTED,
  GET_BLACKLIST_SUCCESS,
  GET_BLACKLIST_FAILED,
  GET_DETAIL_BLACKLIST_REQUESTED,
  GET_DETAIL_BLACKLIST_SUCCESS,
  GET_DETAIL_BLACKLIST_FAILED,
  OPEN_BLACKLIST_REQUESTED,
  OPEN_BLACKLIST_SUCCESS,
  OPEN_BLACKLIST_FAILED,
  CATCH_ERROR,
  SET_MODAL,
  ACTION_RESPONSER
} from '@/store/constants'
import { get, patch } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

/**
 * Get Blacklist 
 * 
 * @param {*} payload 
 * @returns
 */
const getBlacklistAction = (payload) => {
  const { page, limit, sortBy, sortDesc, search } = payload
  const moreParams = `&position_id=${payload.position}&unit_id=${payload.unit}&level_id=${payload.level}&role_id=${payload.role}`
  return get(`/blacklist/users${queryParams(page, limit, sortBy, sortDesc, search)}${moreParams}`)
}

/**
 * Get detail blacklist
 * 
 * @param {*} id 
 * @returns
 */
const getDetailBlacklistAction = (id) => {
  return get(`/blacklist/users/${id}`)
}


/**
 * Open blacklist 
 * 
 * @param {*} id 
 * @returns
 */
const openBlacklistAction = (payload) => {
  return patch(`/blacklist/users/${payload?.id}`, payload?.payload)
}

/**
 * Fetch blacklist
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetBlacklist(action) {
  try {
    const res = yield call(getBlacklistAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_BLACKLIST_SUCCESS,
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
          type: GET_BLACKLIST_FAILED,
          payload: status?.message
        })
      }
    }
  }
}

/**
 * Get Detail blacklist 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetDetailBlacklist(action) {
  try {
    const res = yield call(getDetailBlacklistAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_DETAIL_BLACKLIST_SUCCESS,
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
          message: 'Blacklist tidak ditemukan',
          redirect: '/manajemen-pengguna/blacklist'
        }
      })
      yield put({
        type: GET_DETAIL_BLACKLIST_FAILED,
        payload: {
          modal: true,
          error: err?.meta?.message
        }
      })
    }
  }
}


/**
 * Open blacklist 
 * 
 * @param {*} action 
 * @returns
 */
function* openBlacklist(action) {
  try {
    const res = yield call(openBlacklistAction, action?.payload)

    const payload = res?.data

    yield put({
      type: OPEN_BLACKLIST_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Blacklist berhasil dibuka',
        redirect: '/manajemen-pengguna/blacklist'
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
          message: 'Blacklist gagal dibuka',
          redirect: '/manajemen-pengguna/blacklist'
        }
      })
      yield put({
        type: OPEN_BLACKLIST_FAILED,
        payload: {
          modal: true,
          error: err?.meta?.message
        }
      })
    }
  }
}

function* blacklistSaga() {
  yield takeEvery(GET_BLACKLIST_REQUESTED, fetchGetBlacklist)
  yield takeEvery(GET_DETAIL_BLACKLIST_REQUESTED, fetchGetDetailBlacklist)
  yield takeEvery(OPEN_BLACKLIST_REQUESTED, openBlacklist)
}

export default blacklistSaga