/**
 *
 * @module Saga/recap/NonASNSaga
 *
 * @desc Recap of Employee Non-ASN
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_NON_ASN_RECAP_REQUESTED,
  GET_NON_ASN_RECAP_SUCCESS,
  GET_NON_ASN_RECAP_FAILED,
  GET_NON_ASN_RECAP_CATEGORY_REQUESTED,
  GET_NON_ASN_RECAP_CATEGORY_SUCCESS,
  GET_NON_ASN_RECAP_CATEGORY_FAILED,
  ACTION_RESPONSER,
  SET_MODAL
} from '../../constants'
import {
  getNonASNRecapAction,
  getNonASNRecapByCategoryAction
} from '../action/recap/nonASNAction'

/**
 * GET NON-ASN RECAP
 *
 * @returns
 */
function* getNonASNRecap() {
  try {
    const res = yield call(getNonASNRecapAction)
    const payload = res?.data

    yield put({
      type: GET_NON_ASN_RECAP_SUCCESS,
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
          type: GET_NON_ASN_RECAP_FAILED,
          payload: { error: error?.message }
        })
      }
    }
  }
}

/**
 * GET NON-ASN RECAP BY CATEGORY
 *
 * @param {*} action
 * @returns
 */
function* getNonASNRecapByCategory(action) {
  try {
    const res = yield call(getNonASNRecapByCategoryAction, action?.payload)
    const payload = res?.data

    yield put({
      type: GET_NON_ASN_RECAP_CATEGORY_SUCCESS,
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
        type: GET_NON_ASN_RECAP_CATEGORY_FAILED,
        payload: { error: error?.message }
      })
    }
  }
}

function* nonASNRecapSaga() {
  yield takeEvery(GET_NON_ASN_RECAP_REQUESTED, getNonASNRecap)
  yield takeEvery(GET_NON_ASN_RECAP_CATEGORY_REQUESTED, getNonASNRecapByCategory)
}

export default nonASNRecapSaga
