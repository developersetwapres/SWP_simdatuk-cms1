/**
 *
 * @module Saga/groupSaga
 *
 * @desc Group
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_GROUPS_REQUESTED,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAILED
} from '../../constants'
import { getGroupsAction } from '../action/masterData/groupAction'

/**
 * Get Groups
 *
 * @param {*} action
 * @returns
 */
function* getGroups(action) {
  try {
    const res = yield call(getGroupsAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_GROUPS_SUCCESS,
      payload: payload
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
          type: GET_GROUPS_FAILED,
          payload: errors?.message
        })
      }
    }
  }
}

function* groupSaga() {
  yield takeEvery(GET_GROUPS_REQUESTED, getGroups)
}

export default groupSaga
