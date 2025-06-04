/**
 *
 * @module Saga/recap/ASNSaga
 *
 * @desc Recap of Employee ASN
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_ASN_RECAP_REQUESTED,
  GET_ASN_RECAP_SUCCESS,
  GET_ASN_RECAP_FAILED,
  GET_ASN_RECAP_CATEGORY_REQUESTED,
  GET_ASN_RECAP_CATEGORY_SUCCESS,
  GET_ASN_RECAP_CATEGORY_FAILED,
  ACTION_RESPONSER,
  SET_MODAL
} from '../../constants'
import {
  getASNRecapAction,
  getASNRecapByCategoryAction
} from '../action/recap/asnAction'

/**
 * GET ASN RECAP
 *
 * @returns
 */
function* getASNRecap() {
  try {
    const res = yield call(getASNRecapAction)
    const payload = res?.data

    yield put({
      type: GET_ASN_RECAP_SUCCESS,
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
          type: GET_ASN_RECAP_FAILED,
          payload: { error: error?.message }
        })
      }
    }
  }
}

/**
 * GET ASN RECAP BY CATEGORY
 *
 * @param {*} action
 * @returns
 */
function* getASNRecapByCategory(action) {
  try {
    const res = yield call(getASNRecapByCategoryAction, action?.payload)
    const payload = res?.data

    yield put({
      type: GET_ASN_RECAP_CATEGORY_SUCCESS,
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
      yield put({
        type: GET_ASN_RECAP_CATEGORY_FAILED,
        payload: { error: error?.message }
      })
    }
  }
}

function* asnRecapSaga() {
  yield takeEvery(GET_ASN_RECAP_REQUESTED, getASNRecap)
  yield takeEvery(GET_ASN_RECAP_CATEGORY_REQUESTED, getASNRecapByCategory)
}

export default asnRecapSaga
