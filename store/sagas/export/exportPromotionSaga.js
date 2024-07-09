/**
 *
 * @module Saga/exportPromotionSaga
 *
 * @desc Export Promotion
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  EXPORT_PROMOTION_REQUESTED,
  EXPORT_PROMOTION_SUCCESS,
  EXPORT_PROMOTION_FAILED
} from '../../constants'
import { exportPromotionUsersAction } from '../action/export/exportPromotionAction'

/**
 * Export Promotion Users
 *
 * @param {*} action
 * @returns
 */
function* exportPromotionUsers(action) {
  try {
    const res = yield call(exportPromotionUsersAction, action?.payload)

    yield put({
      type: EXPORT_PROMOTION_SUCCESS,
      payload: res
    })
  } catch (err) {
    const errors = err?.data
    if (errors?.code === 401 || errors?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: errors?.code,
          message: errors?.message,
          redirect: '/profile'
        }
      })
    } else {
      if (errors?.code === 400) {
        yield put({
          type: CATCH_ERROR,
          payload: errors?.message
        })
      } else {
        yield put({
          type: EXPORT_PROMOTION_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

function* exportPromotionSaga() {
  yield takeEvery(EXPORT_PROMOTION_REQUESTED, exportPromotionUsers)
}

export default exportPromotionSaga
