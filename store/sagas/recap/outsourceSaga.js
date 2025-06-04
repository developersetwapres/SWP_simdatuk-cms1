/**
 *
 * @module Saga/recap/OutsourceSaga
 *
 * @desc Recap of Employee Outsource
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_OUTSOURCE_RECAP_REQUESTED,
  GET_OUTSOURCE_RECAP_SUCCESS,
  GET_OUTSOURCE_RECAP_FAILED,
  GET_OUTSOURCE_RECAP_CATEGORY_REQUESTED,
  GET_OUTSOURCE_RECAP_CATEGORY_SUCCESS,
  GET_OUTSOURCE_RECAP_CATEGORY_FAILED,
  ACTION_RESPONSER,
  SET_MODAL
} from '../../constants'
import {
  getOutsourceRecapAction,
  getOutsourceRecapByCategoryAction
} from '../action/recap/outsourceAction'

/**
 * GET OUTSOURCE RECAP
 *
 * @returns
 */
function* getOutsourceRecap() {
  try {
    const res = yield call(getOutsourceRecapAction)
    const payload = res?.data

    yield put({
      type: GET_OUTSOURCE_RECAP_SUCCESS,
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
          type: GET_OUTSOURCE_RECAP_FAILED,
          payload: { error: error?.message }
        })
      }
    }
  }
}

/**
 * GET OUTSOURCE RECAP BY CATEGORY
 *
 * @param {*} action
 * @returns
 */
function* getOutsourceRecapByCategory(action) {
  try {
    const res = yield call(getOutsourceRecapByCategoryAction, action?.payload)
    const payload = res?.data

    yield put({
      type: GET_OUTSOURCE_RECAP_CATEGORY_SUCCESS,
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
        type: GET_OUTSOURCE_RECAP_CATEGORY_FAILED,
        payload: { error: error?.message }
      })
    }
  }
}

function* outsourceRecapSaga() {
  yield takeEvery(GET_OUTSOURCE_RECAP_REQUESTED, getOutsourceRecap)
  yield takeEvery(GET_OUTSOURCE_RECAP_CATEGORY_REQUESTED, getOutsourceRecapByCategory)
}

export default outsourceRecapSaga
