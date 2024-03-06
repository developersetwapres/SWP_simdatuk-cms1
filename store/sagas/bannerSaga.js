/**
 * 
 * @module Saga/bannerSaga 
 * 
 * @desc Banner
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_BANNERS_REQUESTED,
  GET_BANNERS_SUCCESS,
  GET_BANNERS_FAILED,
  DELETE_BANNER_REQUESTED,
  DELETE_BANNER_SUCCESS,
  DELETE_BANNER_FAILED,
  POST_BANNER_REQUESTED,
  POST_BANNER_SUCCESS,
  POST_BANNER_FAILED,
  GET_BANNER_REQUESTED,
  GET_BANNER_SUCCESS,
  GET_BANNER_FAILED,
  UPDATE_BANNER_REQUESTED,
  UPDATE_BANNER_SUCCESS,
  UPDATE_BANNER_FAILED,
  DELETE_LIST_BANNER_REQUESTED,
  DELETE_LIST_BANNER_SUCCESS,
  DELETE_LIST_BANNER_FAILED,
  SET_MODAL,
  CATCH_ERROR,
  ACTION_RESPONSER,
  GET_SORT_BANNER_REQUESTED,
  GET_SORT_BANNER_SUCCESS,
  GET_SORT_BANNER_FAILED,
  PATCH_SORT_BANNER_REQUESTED,
  PATCH_SORT_BANNER_SUCCESS,
  PATCH_SORT_BANNER_FAILED
} from '../constants'
import {
  deleteBannerAction,
  getBannersAction,
  postBannerAction,
  getBannerAction,
  updateBannerAction,
  deleteBannerListAction,
  getSortBannerAction,
  patchSortBannerAction
} from './action/bannerAction'

/**
 * Fetch banner 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetBanner(action) {
  try {
    const res = yield call(getBannersAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_BANNERS_SUCCESS,
      payload: payload
    })
  } catch (err) {
    if (err?.data?.meta?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: err?.data?.meta?.code,
          message: err?.data?.meta?.message,
          redirect: '/profile'
        }
      })
    } else {
      const status = err?.data?.meta
      if (status?.code === 400) {
        yield put({
          type: CATCH_ERROR,
          payload: status?.message
        })
      } else {
        yield put({
          type: GET_BANNERS_FAILED,
          payload: status?.message
        })
      }
    }

  }
}


/**
 * Delete banner
 * 
 * @param {*} action 
 * @returns
 */
function* deleteBanner(action) {
  try {
    const res = yield call(deleteBannerAction, action?.payload)

    const payload = res?.data

    yield put({
      type: DELETE_BANNER_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Banner berhasil dihapus',
        redirect: '/banner'
      }
    })
  } catch (err) {
    const status = err?.data?.meta
    if (status?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: err?.data?.meta?.code,
          message: err?.data?.meta?.message,
          redirect: '/profile'
        }
      })
    } else {
      yield put({
        type: SET_MODAL,
        payload: {
          code: err?.data?.statusCode,
          message: 'Banner gagal dihapus'
        }
      })
      yield put({
        type: DELETE_BANNER_FAILED,
        payload: {
          modal: true,
          error: err?.data?.message
        }
      })
    }
  }
}

/**
 * Post Banner 
 * 
 * @param {*} action 
 * @returns
 */
function* postBanner(action) {
  try {
    const res = yield call(postBannerAction, action?.payload)

    const payload = res?.data

    yield put({
      type: POST_BANNER_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Banner berhasil ditambahkan',
        redirect: '/banner'
      }
    })
  } catch (err) {
    const status = err?.data?.meta
    if (status?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: err?.data?.meta?.code,
          message: err?.data?.meta?.message,
          redirect: '/profile'
        }
      })
    } else {
      yield put({
        type: SET_MODAL,
        payload: {
          code: err?.data?.meta?.code,
          message: 'Banner gagal ditambahkan',
          childMessage: err?.data?.meta?.message
        }
      })
      yield put({
        type: POST_BANNER_FAILED,
        payload: {
          modal: true,
          error: err?.data?.message
        }
      })
    }
  }
}

/**
 * Get Banner 
 * 
 * @param {*} action 
 * @returns
 */
function* getBanner(action) {
  try {
    const res = yield call(getBannerAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_BANNER_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const status = err?.data?.meta
    if (status?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: err?.data?.meta?.code,
          message: err?.data?.meta?.message,
          redirect: '/profile'
        }
      })
    } else {
      yield put({
        type: SET_MODAL,
        payload: {
          code: err?.meta?.code,
          message: 'Banner tidak ditemukan',
          redirect: '/banner'
        }
      })
      yield put({
        type: GET_BANNER_FAILED,
        payload: {
          modal: true,
          error: err?.meta?.message
        }
      })
    }
  }
}


/**
 * Update Banner
 * 
 * @param {*} action 
 * @returns
 * 
 */
function* updateBanner(action) {
  try {
    const res = yield call(updateBannerAction, action?.payload)

    const payload = res?.data

    yield put({
      type: UPDATE_BANNER_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Banner berhasil diubah',
        redirect: '/banner'
      }
    })
  } catch (err) {
    const status = err?.data?.meta
    if (status?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: err?.data?.meta?.code,
          message: err?.data?.meta?.message,
          redirect: '/profile'
        }
      })
    } else {
      yield put({
        type: SET_MODAL,
        payload: {
          code: err?.data?.meta?.code || err?.data?.statusCode,
          message: 'Banner gagal diubah',
          childMessage: err?.data?.meta?.message || err?.data?.message
        }
      })
      yield put({
        type: UPDATE_BANNER_FAILED,
        payload: {
          modal: true,
          error: err?.data?.message
        }
      })
    }
  }
}

/**
 * Delete Banner list 
 * 
 * @param {*} action 
 * @returns
 */
function* deleteBannerList(action) {
  try {
    const res = yield call(deleteBannerListAction, action?.payload)

    const payload = res?.data

    yield put({
      type: DELETE_LIST_BANNER_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const status = err?.data?.meta
    if (status?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: err?.data?.meta?.code,
          message: err?.data?.meta?.message,
          redirect: '/profile'
        }
      })
    } else {
      yield put({
        type: CATCH_ERROR,
        payload: status?.message
      })
      yield put({
        type: DELETE_LIST_BANNER_FAILED,
        payload: status?.message
      })
    }
  }
}

/**
 * Get Sort Banner 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchSortBanner(action) {
  try {
    const res = yield call(getSortBannerAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_SORT_BANNER_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const status = err?.data?.meta
    if (status?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: err?.data?.meta?.code,
          message: err?.data?.meta?.message,
          redirect: '/profile'
        }
      })
    } else {
      if (status === 400) {
        yield put({
          type: CATCH_ERROR,
          payload: status?.message
        })
      } else {
        yield put({
          type: GET_SORT_BANNER_FAILED,
          payload: status?.message
        })
      }
    }
  }
}

/**
 * Patch Sort Banner 
 * 
 * @param {*} action 
 * @returns
 */
function* patchSortBanner(action) {
  try {
    const res = yield call(patchSortBannerAction, action?.payload)

    const payload = res?.data

    yield put({
      type: PATCH_SORT_BANNER_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Sort Banner berhasil diubah',
        redirect: '/banner'
      }
    })
  } catch (err) {
    const status = err?.data?.meta
    if (status?.code === 403) {
      yield put({
        type: ACTION_RESPONSER,
        payload: {
          code: err?.data?.meta?.code,
          message: err?.data?.meta?.message,
          redirect: '/profile'
        }
      })
    } else {
      yield put({
        type: SET_MODAL,
        payload: {
          code: err?.meta?.code,
          message: 'Sort Banner gagal diubah',
          redirect: '/banner'
        }
      })
      yield put({
        type: PATCH_SORT_BANNER_FAILED,
        payload: {
          modal: true,
          error: err?.meta?.message
        }
      })
    }
  }
}

function* bannerSaga() {
  yield takeEvery(GET_BANNERS_REQUESTED, fetchGetBanner)
  yield takeEvery(DELETE_BANNER_REQUESTED, deleteBanner)
  yield takeEvery(POST_BANNER_REQUESTED, postBanner)
  yield takeEvery(GET_BANNER_REQUESTED, getBanner)
  yield takeEvery(UPDATE_BANNER_REQUESTED, updateBanner)
  yield takeEvery(DELETE_LIST_BANNER_REQUESTED, deleteBannerList)
  yield takeEvery(GET_SORT_BANNER_REQUESTED, fetchSortBanner)
  yield takeEvery(PATCH_SORT_BANNER_REQUESTED, patchSortBanner)
}

export default bannerSaga