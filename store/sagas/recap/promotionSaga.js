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
  SET_MODAL,
  GET_COMPARE_USERS_REQUESTED,
  GET_COMPARE_USERS_SUCCESS,
  GET_COMPARE_USERS_FAILED,
  GET_PROMOTION_USERS_REQUESTED,
  GET_PROMOTION_USERS_SUCCESS,
  GET_PROMOTION_USERS_FAILED
} from '../../constants'
import {
  getUnoccupiedPositionsAction,
  getUnoccupiedPositionsDetailAction,
  getBriefEmployeesAction,
  getEmployeesCompareAction,
  getEmployeesPromotionAction
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
    const pagination = res?.pagination

    yield put({
      type: GET_BRIEF_USERS_SUCCESS,
      payload,
      pagination
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

/**
 * POST GET EMPLOYEES COMPARISON DETAIL
 *
 * @param {*} action
 * @returns
 */
function* getCompareUsers(action) {
  try {
    const res = yield call(getEmployeesCompareAction, action?.payload)
    const payload = res?.data

    yield put({
      type: GET_COMPARE_USERS_SUCCESS,
      payload
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
          type: GET_COMPARE_USERS_FAILED,
          payload: { error: error?.message }
        })
      }
    }
  }
}

/**
 * POST GET EMPLOYEES PROMOTION DETAIL
 *
 * @param {*} action
 * @returns
 */
function* getPromotionUsers(action) {
  try {
    const res = yield call(getEmployeesPromotionAction, action?.payload)
    const payload = res?.data

    yield put({
      type: GET_PROMOTION_USERS_SUCCESS,
      payload
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
          type: GET_PROMOTION_USERS_FAILED,
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
  yield takeEvery(GET_COMPARE_USERS_REQUESTED, getCompareUsers)
  yield takeEvery(GET_PROMOTION_USERS_REQUESTED, getPromotionUsers)
}

export default promotionSaga
