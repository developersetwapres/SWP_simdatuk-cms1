/**
 *
 * @module Saga/positionSaga
 *
 * @desc Position
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_POSITIONS_HISTORIES_REQUESTED,
  GET_POSITIONS_HISTORIES_SUCCESS,
  GET_POSITIONS_HISTORIES_FAILED,
  GET_POSITION_HISTORIES_REQUESTED,
  GET_POSITION_HISTORIES_SUCCESS,
  GET_POSITION_HISTORIES_FAILED,
  POST_POSITION_HISTORIES_REQUESTED,
  POST_POSITION_HISTORIES_SUCCESS,
  POST_POSITION_HISTORIES_FAILED,
  UPDATE_POSITION_HISTORIES_REQUESTED,
  UPDATE_POSITION_HISTORIES_SUCCESS,
  UPDATE_POSITION_HISTORIES_FAILED,
  DELETE_POSITION_HISTORIES_REQUESTED,
  DELETE_POSITION_HISTORIES_SUCCESS,
  DELETE_POSITION_HISTORIES_FAILED,
  SET_MODAL,
  ACTION_RESPONSER
} from '../../constants'
import {
  deletePositionHistoriesAction,
  getPositionsHistoriesAction,
  getPositionHistoriesAction,
  postPositionHistoriesAction,
  updatePositionHistoriesAction
} from '../action/histories/positionAction'

/**
 * Get Positions
 *
 * @param {*} action
 * @returns
 */
function* getPositions(action) {
  try {
    const res = yield call(getPositionsHistoriesAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_POSITIONS_HISTORIES_SUCCESS,
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
          type: GET_POSITIONS_HISTORIES_FAILED,
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
    const res = yield call(getPositionHistoriesAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_POSITION_HISTORIES_SUCCESS,
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
          redirect: '/data-riwayat/jabatan'
        }
      })
      yield put({
        type: GET_POSITION_HISTORIES_FAILED,
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
    const res = yield call(deletePositionHistoriesAction, action?.payload)

    const payload = res?.data

    yield put({
      type: DELETE_POSITION_HISTORIES_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Riwayat Jabatan Berhasil Dihapus',
        childMessage: payload?.message,
        redirect: '/data-riwayat/jabatan'
      }
    })
  } catch (err) {
    const errors = err?.data
    if ([401, 403]?.includes(errors?.code)) {
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
          message: 'Riwayat Jabatan Gagal Dihapus',
          message: errors?.message
        }
      })
      yield put({
        type: DELETE_POSITION_HISTORIES_FAILED,
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
    const res = yield call(postPositionHistoriesAction, action?.payload)

    const payload = res?.data

    yield put({
      type: POST_POSITION_HISTORIES_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Riwayat Jabatan Berhasil Ditambahkan',
        childMessage: payload?.message,
        redirect: '/data-riwayat/jabatan'
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
          message: 'Riwayat Jabatan Gagal Ditambahkan',
          childMessage: errors?.message
        }
      })
      yield put({
        type: POST_POSITION_HISTORIES_FAILED,
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
    const res = yield call(updatePositionHistoriesAction, action?.payload)

    const payload = res?.data

    yield put({
      type: UPDATE_POSITION_HISTORIES_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Riwayat Jabatan Berhasil Diubah',
        childMessage: payload?.message,
        redirect: '/data-riwayat/jabatan'
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
          message: 'Riwayat Jabatan Gagal Diubah',
          childMessage: errors?.message
        }
      })
      yield put({
        type: UPDATE_POSITION_HISTORIES_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

function* PositionSaga() {
  yield takeEvery(GET_POSITIONS_HISTORIES_REQUESTED, getPositions)
  yield takeEvery(GET_POSITION_HISTORIES_REQUESTED, getPosition)
  yield takeEvery(DELETE_POSITION_HISTORIES_REQUESTED, deletePosition)
  yield takeEvery(POST_POSITION_HISTORIES_REQUESTED, postPosition)
  yield takeEvery(UPDATE_POSITION_HISTORIES_REQUESTED, updatePosition)
}

export default PositionSaga
