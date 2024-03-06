/**
 * 
 * @module Saga/course/Provider 
 * 
 * @desc Provider 
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_UPDATE_PROVIDER_REQUESTED,
  GET_UPDATE_PROVIDER_SUCCESS,
  GET_UPDATE_PROVIDER_FAILED,
  UPDATE_PROVIDER_BULK_REQUESTED,
  UPDATE_PROVIDER_BULK_SUCCESS,
  UPDATE_PROVIDER_BULK_FAILED,
  CATCH_ERROR,
  ACTION_RESPONSER
} from '@/store/constants'
import {
  getUpdateProviderAction,
  getUpdateBulkProviderAction
} from '../action/course/providerCourseAction'

/**
 * Fetch Get Update Provider 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetProvider(action) {
  try {
    const res = yield call(getUpdateProviderAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_UPDATE_PROVIDER_SUCCESS,
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
          type: GET_UPDATE_PROVIDER_FAILED,
          payload: status?.message
        })
      }
    }
  }
}

/**
 * Update bulk 
 * 
 * @param {*} action 
 * @returns
 */
function* updateBulkProvider(action) {
  try {
    const res = yield call(getUpdateBulkProviderAction, action?.payload)

    const payload = res?.data

    yield put({
      type: UPDATE_PROVIDER_BULK_SUCCESS,
      payload: {
        message: payload?.meta?.message
      }
    })

    // yield put({
    //   type: SET_MODAL,
    //   payload: {
    //     code: res?.data?.meta?.code,
    //     message: 'Kamu berhasil menambahkan Course',
    //     redirect: '/course'
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
      // yield put({
      //   type: SET_MODAL,
      //   payload: {
      //     code: err?.data?.meta?.code || err?.data?.statusCode,
      //     message: err?.data?.meta?.message || err?.data?.message
      //   }
      // })
      // yield put({
      //   type: UPDATE_PROVIDER_BULK_FAILED,
      //   payload: {
      //     modal: true,
      //     error: err?.data?.meta?.message || err?.data?.message
      //   }
      // })
      yield put({
        type: UPDATE_PROVIDER_BULK_FAILED,
        payload: {
          error: err?.data?.meta?.message || err?.data?.message
        }
      })
    }
  }
}

function* providerCourseSaga() {
  yield takeEvery(GET_UPDATE_PROVIDER_REQUESTED, fetchGetProvider)
  yield takeEvery(UPDATE_PROVIDER_BULK_REQUESTED, updateBulkProvider)
}

export default providerCourseSaga