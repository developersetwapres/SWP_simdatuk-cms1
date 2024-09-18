/**
 *
 * @module Saga/TrainingSaga
 *
 * @desc Training
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_TRAININGS_REQUESTED,
  GET_TRAININGS_SUCCESS,
  GET_TRAININGS_FAILED,
  GET_TRAINING_REQUESTED,
  GET_TRAINING_SUCCESS,
  GET_TRAINING_FAILED,
  GET_LEVELS_REQUESTED,
  GET_LEVELS_SUCCESS,
  GET_LEVELS_FAILED,
  POST_TRAINING_REQUESTED,
  POST_TRAINING_SUCCESS,
  POST_TRAINING_FAILED,
  UPDATE_TRAINING_REQUESTED,
  UPDATE_TRAINING_SUCCESS,
  UPDATE_TRAINING_FAILED,
  GET_CLUSTERS_SUCCESS,
  GET_CLUSTERS_FAILED,
  GET_CLUSTERS_REQUESTED,
  DELETE_TRAINING_REQUESTED,
  DELETE_TRAINING_SUCCESS,
  DELETE_TRAINING_FAILED,
  SET_MODAL,
  ACTION_RESPONSER
} from '../../constants'
import {
  deleteTrainingAction,
  getTrainingAction,
  getTrainingsAction,
  getLevelsAction,
  postTrainingAction,
  updateTrainingAction,
  getClustersAction
} from '../action/histories/trainingAction'
import Router from 'next/router'

/**
 * Get Clusters
 *
 * @param {*} action
 * @returns
 */
function* getClusters(action) {
  try {
    const res = yield call(getClustersAction, action?.payload)
    const payload = res?.data

    yield put({
      type: GET_CLUSTERS_SUCCESS,
      payload
    })
  } catch (err) {
    const errors = err?.data

    if ([403, 401].includes(errors?.code)) {
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
          childMessage: errors?.message
        }
      })
      yield put({
        type: GET_CLUSTERS_FAILED,
        payload: errors?.message
      })
    }
  }
}

/**
 * Get Levels
 *
 * @param {*} action
 * @returns
 */
function* getLevels(action) {
  try {
    const res = yield call(getLevelsAction, action?.payload)
    const payload = res?.data

    yield put({
      type: GET_LEVELS_SUCCESS,
      payload
    })
  } catch (err) {
    const errors = err?.data

    if ([403, 401].includes(errors?.code)) {
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
          childMessage: errors?.message
        }
      })
      yield put({
        type: GET_LEVELS_FAILED,
        payload: errors?.message
      })
    }
  }
}

/**
 * Get Trainings
 *
 * @param {*} action
 * @returns
 */
function* getTrainings(action) {
  try {
    const res = yield call(getTrainingsAction, action?.payload)
    const payload = res?.data

    yield put({
      type: GET_TRAININGS_SUCCESS,
      payload
    })
  } catch (err) {
    const errors = err?.data

    if ([403, 401].includes(errors?.code)) {
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
          childMessage: errors?.message
        }
      })
      yield put({
        type: GET_TRAININGS_FAILED,
        payload: errors?.message
      })
    }
  }
}

/**
 * Get Training
 *
 * @param {*} action
 * @returns
 */
function* getTraining(action) {
  try {
    const res = yield call(getTrainingAction, action?.payload)
    const payload = res?.data

    yield put({
      type: GET_TRAINING_SUCCESS,
      payload
    })
  } catch (err) {
    const errors = err?.data

    if ([403, 401].includes(errors?.code)) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: errors?.code,
          message: errors?.message,
          redirect: '/profile'
        }
      })
    } else {
      const path = Router.pathname
      const redirect = `/${path.split('/').slice(1, 3).join('/')}`

      yield put({
        type: SET_MODAL,
        payload: {
          code: errors?.code,
          message: 'Warning!',
          childMessage: errors?.message,
          redirect
        }
      })
      yield put({
        type: GET_TRAINING_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Delete Training
 *
 * @param {*} action
 * @returns
 */
function* deleteTraining(action) {
  try {
    const res = yield call(deleteTrainingAction, action?.payload)
    const payload = res?.data
    const path = Router.pathname
    const redirect = path?.includes('detail') ? 'back' : 'refresh'

    yield put({
      type: DELETE_TRAINING_SUCCESS,
      payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Riwayat Pelatihan Berhasil Dihapus',
        childMessage: payload?.message,
        redirect
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
          message: 'Riwayat Pelatihan Gagal Dihapus',
          message: errors?.message
        }
      })
      yield put({
        type: DELETE_TRAINING_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Post Training
 *
 * @param {*} action
 * @returns
 */
function* postTraining(action) {
  try {
    const res = yield call(postTrainingAction, action?.payload)

    const payload = res?.data

    yield put({
      type: POST_TRAINING_SUCCESS,
      payload
    })

    const path = Router.pathname
    const redirect = `/${path.split('/').slice(1, 3).join('/')}`

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Riwayat Pelatihan Berhasil Ditambahkan',
        childMessage: payload?.message,
        redirect
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
          message: 'Riwayat Pelatihan Gagal Ditambahkan',
          childMessage: errors?.message
        }
      })
      yield put({
        type: POST_TRAINING_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

/**
 * Update Training
 *
 * @param {*} action
 * @returns
 *
 */
function* updateTraining(action) {
  try {
    const res = yield call(updateTrainingAction, action?.payload)

    const payload = res?.data

    yield put({
      type: UPDATE_TRAINING_SUCCESS,
      payload
    })

    const path = Router.pathname
    const redirect = `/${path.split('/').slice(1, 3).join('/')}`

    yield put({
      type: SET_MODAL,
      payload: {
        code: payload?.code,
        message: 'Riwayat Pelatihan Berhasil Diubah',
        childMessage: payload?.message,
        redirect
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
          message: 'Riwayat Pelatihan Gagal Diubah',
          childMessage: errors?.message
        }
      })
      yield put({
        type: UPDATE_TRAINING_FAILED,
        payload: { error: errors?.message }
      })
    }
  }
}

function* trainingSaga() {
  yield takeEvery(GET_LEVELS_REQUESTED, getLevels)
  yield takeEvery(GET_TRAININGS_REQUESTED, getTrainings)
  yield takeEvery(GET_CLUSTERS_REQUESTED, getClusters)
  yield takeEvery(GET_TRAINING_REQUESTED, getTraining)
  yield takeEvery(DELETE_TRAINING_REQUESTED, deleteTraining)
  yield takeEvery(POST_TRAINING_REQUESTED, postTraining)
  yield takeEvery(UPDATE_TRAINING_REQUESTED, updateTraining)
}

export default trainingSaga
