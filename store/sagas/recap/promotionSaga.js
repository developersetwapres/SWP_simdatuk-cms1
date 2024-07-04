/**
 *
 * @module Saga/recap/promotionSaga
 *
 * @desc Promotion
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_UNOCCUPIED_POSITIONS_REQUESTED,
  GET_UNOCCUPIED_POSITIONS_SUCCESS,
  GET_UNOCCUPIED_POSITIONS_FAILED,
  GET_UNOCCUPIED_POSITIONS_DETAILS_REQUESTED,
  GET_UNOCCUPIED_POSITIONS_DETAILS_SUCCESS,
  GET_UNOCCUPIED_POSITIONS_DETAILS_FAILED,
  GET_BRIEF_USERS_REQUESTED,
  GET_BRIEF_USERS_SUCCESS,
  GET_BRIEF_USERS_FAILED,
  ACTION_RESPONSER,
  SET_MODAL
} from '../../constants'
import {
  getUnoccupiedPositionsAction,
  getUnoccupiedPositionsDetailAction,
  getBriefEmployeesAction
} from '../action/recap/promotionAction'

/**
 * GET UNOCCUPIED POSITIONS
 *
 * @returns
 */
function* getUnoccupiedPositions() {
  try {
    const res = yield call(getUnoccupiedPositionsAction)
    const payload = res?.data

    yield put({
      type: GET_UNOCCUPIED_POSITIONS_SUCCESS,
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
          type: GET_UNOCCUPIED_POSITIONS_FAILED,
          payload: { error: error?.message }
        })
      }
    }
  }
}

/**
 * GET UNOCCUPIED POSITIONS DETAIL
 *
 * @returns
 */
function* getUnoccupiedPositionsDetail(action) {
  try {
    const res = yield call(getUnoccupiedPositionsDetailAction, action?.payload)
    const payload = res?.data

    yield put({
      type: GET_UNOCCUPIED_POSITIONS_DETAILS_SUCCESS,
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
          type: GET_UNOCCUPIED_POSITIONS_DETAILS_FAILED,
          payload: { error: error?.message }
        })
      }
    }
  }
}

/**
 * POST FILTER GET EMPLOYEES
 *
 * @param {*} action
 * @returns
 */
function* getBriefEmployees(action) {
  try {
    const res = yield call(getBriefEmployeesAction, action?.payload)
    const payload = res?.data

    yield put({
      type: GET_BRIEF_USERS_SUCCESS,
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
          type: GET_BRIEF_USERS_FAILED,
          payload: { error: error?.message }
        })
      }
    }
  }
}

function* promotionSaga() {
  yield takeEvery(GET_UNOCCUPIED_POSITIONS_REQUESTED, getUnoccupiedPositions)
  yield takeEvery(GET_UNOCCUPIED_POSITIONS_DETAILS_REQUESTED, getUnoccupiedPositionsDetail)
  yield takeEvery(GET_BRIEF_USERS_REQUESTED, getBriefEmployees)
}

export default promotionSaga
