/**
 * 
 * @module Saga/menuSaga 
 * 
 * @desc Menu
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_MENU_REQUESTED,
  GET_MENU_SUCCESS,
  GET_MENU_FAILED,
  GET_DETAIL_MENU_REQUESTED,
  GET_DETAIL_MENU_SUCCESS,
  GET_DETAIL_MENU_FAILED,
  POST_MENU_REQUESTED,
  POST_MENU_SUCCESS,
  POST_MENU_FAILED,
  SET_MODAL,
  CATCH_ERROR,
  DELETE_MENU_REQUESTED,
  DELETE_MENU_SUCCESS,
  DELETE_MENU_FAILED
} from '../constants'
import { get, post, del } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

/**
 * Get Menu 
 * 
 * @param {*} payload 
 * @returns
 */
const getMenuAction = (payload) => {
  const { page, limit, sortBy, sortDesc, search } = payload
  return get(`/menu${queryParams(page, limit, sortBy, sortDesc, search)}`)
}

/**
 * Get Detail Menu 
 * 
 * @param {*} id 
 * @returns
 */
const getDetailMenuAction = (id) => {
  return get(`/menu/${id}`)
}

/**
 * Post Menu 
 * 
 * @param {*} payload 
 * @returns
 */
const postMenuAction = (payload) => {
  return post(`/menu`, payload)
}

/**
 * Delete Menu 
 * 
 * @param {*} id 
 * @returns
 */
const deleteMenuAction = (id) => {
  return del(`/menu/${id}`)
}

/**
 * Get Menu Saga 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetMenu(action) {
  try {
    const res = yield call(getMenuAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_MENU_SUCCESS,
      payload: payload
    })
  } catch (err) {
    if (err?.statusCode === 500) {
      yield put({
        type: CATCH_ERROR,
        payload: err?.message
      })
    } else {
      yield put({
        type: GET_MENU_FAILED,
        payload: err?.message
      })
    }
  }
}

/**
 * Get detail menu 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchDetailMenu(action) {
  try {
    const res = yield call(getDetailMenuAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_DETAIL_MENU_SUCCESS,
      payload: payload
    })
  } catch (err) {
    yield put({
      type: SET_MODAL,
      payload: {
        code: err?.meta?.code,
        message: 'Menu tidak ditemukan',
        redirect: '/users/role'
      }
    })
    yield put({
      type: GET_DETAIL_MENU_FAILED,
      payload: {
        modal: true,
        error: err?.meta?.message
      }
    })
  }
}

/**
 * Post Menu 
 * 
 * @param {*} action 
 * @returns
 */
function* postMenu(action) {
  try {
    const res = yield call(postMenuAction, action?.payload)

    const payload = res?.data

    yield put({
      type: POST_MENU_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Menu berhasil ditambahkan',
        redirect: '/users/role'
      }
    })
  } catch (err) {
    yield put({
      type: SET_MODAL,
      payload: {
        code: err?.meta?.code,
        message: 'Menu gagal ditambakan',
        redirect: '/users/role'
      }
    })
    yield put({
      type: POST_MENU_FAILED,
      payload: {
        modal: true,
        error: err?.meta?.message
      }
    })
  }
}

/**
 * Delete Menu 
 * 
 * @param {*} action 
 * @returns
 */
function* deleteMenu(action) {
  try {
    const res = yield call(deleteMenuAction, action?.payload)

    const payload = res?.data

    yield put({
      type: DELETE_MENU_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Menu berhasil dihapus',
        redirect: '/users/role'
      }
    })
  } catch (err) {
    yield put({
      type: SET_MODAL,
      payload: {
        code: err?.meta?.code,
        message: 'Menu gagal dihapus',
        redirect: '/users/role'
      }
    })
    yield put({
      type: DELETE_MENU_FAILED,
      payload: {
        modal: true,
        error: err?.meta?.message
      }
    })
  }
}

function* menuSaga() {
  yield takeEvery(GET_MENU_REQUESTED, fetchGetMenu)
  yield takeEvery(GET_DETAIL_MENU_REQUESTED, fetchDetailMenu)
  yield takeEvery(POST_MENU_REQUESTED, postMenu)
  yield takeEvery(DELETE_MENU_REQUESTED, deleteMenu)
}

export default menuSaga