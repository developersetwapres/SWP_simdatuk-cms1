import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_COURSE_CATEGORY_REQUESTED,
  GET_COURSE_CATEGORY_SUCCESS,
  GET_COURSE_CATEGORY_FAILED,
  DELETE_COURSE_CATEGORY_REQUESTED,
  DELETE_COURSE_CATEGORY_SUCCESS,
  DELETE_COURSE_CATEGORY_FAILED,
  GET_COURSE_CATEGORY_ID_REQUESTED,
  GET_COURSE_CATEGORY_ID_SUCCESS,
  GET_COURSE_CATEGORY_ID_FAILED,
  POST_COURSE_CATEGORY_REQUESTED,
  POST_COURSE_CATEGORY_SUCCESS,
  POST_COURSE_CATEGORY_FAILED,
  DELETE_COURSE_CATEGORY_LIST_REQUESTED,
  DELETE_COURSE_CATEGORY_LIST_SUCCESS,
  DELETE_COURSE_CATEGORY_LIST_FAILED,
  UPDATE_COURSE_CATEGORY_REQUESTED,
  UPDATE_COURSE_CATEGORY_SUCCESS,
  UPDATE_COURSE_CATEGORY_FAILED,
  CATCH_ERROR,
  SET_MODAL,
  ACTION_RESPONSER,
  GET_PROGRAM_PKASN_SUCCESS,
  GET_PROGRAM_PKASN_FAILED,
  GET_PROGRAM_PKASN_REQUESTED
} from '../constants'

import {
  getCategoryCourseAction,
  deleteCourseCategoryAction,
  getCategoryCourseByIdAction,
  postCategoryAction,
  deleteCourseCategoryListAction,
  updateCourseCategoryAction,
  getProgramPKASNAction
} from './action/categoryAction'

/**
 * Fetch Course Category 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetCourseCategory(action) {
  try {
    const res = yield call(getCategoryCourseAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_COURSE_CATEGORY_SUCCESS,
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
          type: GET_COURSE_CATEGORY_FAILED,
          payload: status?.message
        })
      }
    }
  }
}

/**
 * Delete Category 
 * 
 * @param {*} action 
 * @returns
 */
function* deleteCategory(action) {
  try {
    const res = yield call(deleteCourseCategoryAction, action?.payload)

    const payload = res?.data

    yield put({
      type: DELETE_COURSE_CATEGORY_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Kategori berhasil didelete',
        redirect: '/category'
      }
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
      yield put({
        type: SET_MODAL,
        payload: {
          code: err?.data?.statusCode,
          message: 'Kategori gagal dihapus'
        }
      })
      yield put({
        type: DELETE_COURSE_CATEGORY_FAILED,
        payload: {
          modal: true,
          error: err?.data?.message
        }
      })
    }
  }
}

/**
 * Get detail category
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetDetailCourse(action) {
  try {
    const res = yield call(getCategoryCourseByIdAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_COURSE_CATEGORY_ID_SUCCESS,
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
          type: GET_COURSE_CATEGORY_ID_FAILED,
          payload: status?.message
        })
      }
    }
  }
}

/**
 * Post categoires 
 * 
 * @param {*} action 
 * @returns
 */
function* postCourseCategories(action) {
  try {
    const res = yield call(postCategoryAction, action?.payload)

    const payload = res?.data

    yield put({
      type: POST_COURSE_CATEGORY_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Kategori berhasil ditambahkan',
        redirect: '/category'
      }
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
      yield put({
        type: SET_MODAL,
        payload: {
          code: err?.data?.meta?.code,
          message: 'Kategori gagal ditambahkan',
          childMessage: err?.data?.meta?.message
        }
      })
      yield put({
        type: POST_COURSE_CATEGORY_FAILED,
        payload: {
          modal: true,
          error: err?.data?.meta?.message
        }
      })
    }
  }
}

/**
 * Delete List Cateogry
 * 
 * @param {*} action 
 * @returns
 */
function* deleteListCategory(action) {
  try {
    const res = yield call(deleteCourseCategoryListAction, action?.payload)

    const payload = res?.data

    yield put({
      type: DELETE_COURSE_CATEGORY_LIST_SUCCESS,
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
      if (status?.code === 400) {
        yield put({
          type: CATCH_ERROR,
          payload: status?.message
        })
      } else {
        yield put({
          type: DELETE_COURSE_CATEGORY_LIST_FAILED,
          payload: status?.message
        })
      }
    }
  }
}


/**
 * Update Course Category 
 * 
 * @param {*} action 
 * @returns
 */
function* updateCourseCategory(action) {
  try {
    const res = yield call(updateCourseCategoryAction, action?.payload)

    const payload = res?.data

    yield put({
      type: UPDATE_COURSE_CATEGORY_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Kategori berhasil diubah',
        redirect: '/category'
      }
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
      yield put({
        type: SET_MODAL,
        payload: {
          code: err?.data?.statusCode,
          message: 'Kategori gagal diubah',
          childMessage: err?.data?.message || err?.data?.meta?.message
        }
      })
      yield put({
        type: UPDATE_COURSE_CATEGORY_FAILED,
        payload: {
          modal: true,
          error: err?.data?.message
        }
      })
    }
  }
}

/**
 * Get Program PKASN Sagas
 * 
 * @param {*} payload 
 * @returns
 */
function* getProgramPKASNActionSaga(action) {
  try {
    const res = yield call(getProgramPKASNAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_PROGRAM_PKASN_SUCCESS,
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
          code: status?.code,
          message: 'Mohon maaf sedang dalam gangguan'
        }
      })
      yield put({
        type: GET_PROGRAM_PKASN_FAILED,
        payload: {
          modal: true,
          error: status?.message
        }
      })
    }
  }
}

function* categorySaga() {
  yield takeEvery(GET_COURSE_CATEGORY_REQUESTED, fetchGetCourseCategory)
  yield takeEvery(DELETE_COURSE_CATEGORY_REQUESTED, deleteCategory)
  yield takeEvery(GET_COURSE_CATEGORY_ID_REQUESTED, fetchGetDetailCourse)
  yield takeEvery(POST_COURSE_CATEGORY_REQUESTED, postCourseCategories)
  yield takeEvery(DELETE_COURSE_CATEGORY_LIST_REQUESTED, deleteListCategory)
  yield takeEvery(UPDATE_COURSE_CATEGORY_REQUESTED, updateCourseCategory)
  yield takeEvery(GET_PROGRAM_PKASN_REQUESTED, getProgramPKASNActionSaga)
}

export default categorySaga
