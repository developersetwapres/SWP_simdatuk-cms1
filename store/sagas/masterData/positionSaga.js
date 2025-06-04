/**
 *
 * @module Saga/positionSaga
 *
 * @desc Position
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_POSITIONS_ORDERS_REQUESTED,
  GET_POSITIONS_ORDERS_SUCCESS,
  GET_POSITIONS_ORDERS_FAILED,
  GET_POSITIONS_REQUESTED,
  GET_POSITIONS_SUCCESS,
  GET_POSITIONS_FAILED,
  GET_POSITION_REQUESTED,
  GET_POSITION_SUCCESS,
  GET_POSITION_FAILED,
  POST_POSITION_REQUESTED,
  POST_POSITION_SUCCESS,
  POST_POSITION_FAILED,
  UPDATE_POSITION_REQUESTED,
  UPDATE_POSITION_SUCCESS,
  UPDATE_POSITION_FAILED,
  DELETE_POSITION_REQUESTED,
  DELETE_POSITION_SUCCESS,
  DELETE_POSITION_FAILED,
  SET_MODAL,
  ACTION_RESPONSER
} from '../../constants'
import {
  deletePositionAction,
  getPositionAction,
  getPositionsAction,
  getPositionsOrdersAction,
  postPositionAction,
  updatePositionAction
} from '../action/masterData/positionAction'

/**
 * Get Positions Orders
 *
 * @param {*} action
 * @returns
 */
function* getPositionsOrders(action) {
  try {
    const res = yield call(getPositionsOrdersAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_POSITIONS_ORDERS_SUCCESS,
      payload
    })
  } catch (err) {
    const errors = err?.data
    if (errors?.code === 403) {
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
          type: GET_POSITIONS_ORDERS_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

/**
 * Get Positions
 *
 * @param {*} action
 * @returns
 */
function* getPositions(action) {
  try {
    const res = yield call(getPositionsAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_POSITIONS_SUCCESS,
      payload
    })
  } catch (err) {
    const errors = err?.data
    if (errors?.code === 403) {
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
          type: SET_MODAL,
          payload: {
            code: errors?.code,
            message: 'Warning!',
            childMessage: errors?.message
          }
        })
        yield put({
          type: GET_POSITIONS_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

/**
 * Get Position
 *
 * @param {*} action
 * @returns
 */
function* getPosition(action) {
  try {
    const res = yield call(getPositionAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_POSITION_SUCCESS,
      payload
    })
  } catch (err) {
    const errors = err?.data

    if (errors?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: errors?.code,
          message: errors?.message,
          redirect: '/profile'
        }
      })
    } else {
      yield put({
        type: SET_MODAL,
        payload: {
          code: errors?.code,
          message: 'Warning!',
          childMessage: errors?.message,
          redirect: '/master-data/position'
        }
      })
      yield put({
        type: GET_POSITION_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Delete Position
 *
 * @param {*} action
 * @returns
 */
function* deletePosition(action) {
  try {
    const res = yield call(deletePositionAction, action?.payload)

    const payload = res?.data

    yield put({
      type: DELETE_POSITION_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Data Jabatan Berhasil Dihapus',
        childMessage: payload?.message,
        redirect: '/master-data/position'
      }
    })
  } catch (err) {
    const errors = err?.data
    if (errors?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: errors?.code,
          message: errors?.message,
          redirect: '/profile'
        }
      })
    } else {
      yield put({
        type: SET_MODAL,
        payload: {
          code: errors?.code,
          message: 'Data Jabatan Gagal Dihapus',
          message: errors?.message
        }
      })
      yield put({
        type: DELETE_POSITION_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Post Position
 *
 * @param {*} action
 * @returns
 */
function* postPosition(action) {
  try {
    const res = yield call(postPositionAction, action?.payload)

    const payload = res?.data

    yield put({
      type: POST_POSITION_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Data Jabatan Berhasil Ditambahkan',
        childMessage: payload?.message,
        redirect: '/master-data/position'
      }
    })
  } catch (err) {
    const errors = err?.data
    if (errors?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: errors?.code,
          message: errors?.message,
          redirect: '/profile'
        }
      })
    } else {
      yield put({
        type: SET_MODAL,
        payload: {
          code: errors?.code,
          message: 'Data Jabatan Gagal Ditambahkan',
          childMessage: errors?.message
        }
      })
      yield put({
        type: POST_POSITION_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Update Position
 *
 * @param {*} action
 * @returns
 *
 */
function* updatePosition(action) {
  try {
    const res = yield call(updatePositionAction, action?.payload)

    const payload = res?.data

    yield put({
      type: UPDATE_POSITION_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Data Jabatan Berhasil Diubah',
        childMessage: payload?.message,
        redirect: '/master-data/position'
      }
    })
  } catch (err) {
    const errors = err?.data
    if (errors?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: errors?.code,
          message: errors?.message,
          redirect: '/profile'
        }
      })
    } else {
      yield put({
        type: SET_MODAL,
        payload: {
          code: errors?.code,
          message: 'Data Jabatan Gagal Diubah',
          childMessage: errors?.message
        }
      })
      yield put({
        type: UPDATE_POSITION_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

function* PositionSaga() {
  yield takeEvery(GET_POSITIONS_ORDERS_REQUESTED, getPositionsOrders)
  yield takeEvery(GET_POSITIONS_REQUESTED, getPositions)
  yield takeEvery(GET_POSITION_REQUESTED, getPosition)
  yield takeEvery(DELETE_POSITION_REQUESTED, deletePosition)
  yield takeEvery(POST_POSITION_REQUESTED, postPosition)
  yield takeEvery(UPDATE_POSITION_REQUESTED, updatePosition)
}

export default PositionSaga
