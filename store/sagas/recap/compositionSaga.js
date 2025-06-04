/**
 *
 * @module Saga/recap/CompositionSaga
 *
 * @desc Recap of Employee Compositions
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_COMPOSITION_REQUESTED,
  GET_COMPOSITION_SUCCESS,
  GET_COMPOSITION_FAILED,
  GET_COMPOSITION_CATEGORY_REQUESTED,
  GET_COMPOSITION_CATEGORY_SUCCESS,
  GET_COMPOSITION_CATEGORY_FAILED,
  ACTION_RESPONSER,
  SET_MODAL
} from '../../constants'
import {
  getCompositionsAction,
  getCompositionsCategoriesAction
} from '../action/recap/compositionAction'

/**
 * GET COMPOSITIONS
 *
 * @returns
 */
function* getCompositions() {
  try {
    const res = yield call(getCompositionsAction)
    const payload = res?.data

    yield put({
      type: GET_COMPOSITION_SUCCESS,
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
          type: GET_COMPOSITION_FAILED,
          payload: { error: error?.message }
        })
      }
    }
  }
}

/**
 * GET COMPOSITIONS CATEGORIES
 *
 * @param {*} action
 * @returns
 */
function* getCompositionsCategories(action) {
  try {
    const res = yield call(getCompositionsCategoriesAction, action?.payload)
    const payload = res?.data

    yield put({
      type: GET_COMPOSITION_CATEGORY_SUCCESS,
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
        type: GET_COMPOSITION_CATEGORY_FAILED,
        payload: { error: error?.message }
      })
    }
  }
}

function* compositionSaga() {
  yield takeEvery(GET_COMPOSITION_REQUESTED, getCompositions)
  yield takeEvery(GET_COMPOSITION_CATEGORY_REQUESTED, getCompositionsCategories)
}

export default compositionSaga
