/**
 * 
 * @module Saga/course/courseSaga 
 * 
 * @desc Course  
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_COURSE_REQUESTED,
  GET_COURSE_SUCCESS,
  GET_COURSE_FAILED,
  DELETE_COURSE_REQUESTED,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAILED,
  POST_COURSE_REQUESTED,
  POST_COURSE_SUCCESS,
  POST_COURSE_FAILED,
  DELETE_COURSE_LIST_REQUESTED,
  DELETE_COURSE_LIST_SUCCESS,
  DELETE_COURSE_LIST_FAILED,
  GET_DETAIL_COURSE_REQUESTED,
  GET_DETAIL_COURSE_SUCCESS,
  GET_DETAIL_COURSE_FAILED,
  UPDATE_COURSE_REQUESTED,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAILED,
  SET_MODAL,
  ACTION_RESPONSER,
  CATCH_ERROR,
  PATCH_BULK_COURSE_REQUESTED,
  PATCH_BULK_COURSE_SUCCESS,
  PATCH_BULK_COURSE_FAILED,
  FILTER_COURSE_CATEGORY_REQUESTED,
  FILTER_COURSE_CATEGORY_SUCCESS,
  FILTER_COURSE_CATEGORY_FAILED
} from '../../constants'
import {
  getCourseAction,
  deleteCourseAction,
  postCourseAction,
  deleteListCourseAction,
  getDetailCourseAction,
  updateCourseAction,
  bulkCourseAction,
  filterCourseAction
} from '../action/course/courseAction'

/**
 * Fetch Course 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchCourse(action) {
  try {
    const res = yield call(getCourseAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_COURSE_SUCCESS,
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
          type: GET_COURSE_FAILED,
          payload: status?.message
        })
      }
    }
  }
}

/**
 * 
 * Delete Course 
 * 
 * @param {*} action 
 * @returns
 */
function* deleteCourse(action) {
  try {
    const res = yield call(deleteCourseAction, action?.payload)

    const payload = res?.data

    yield put({
      type: DELETE_COURSE_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Course berhasil dihapus',
        redirect: '/manajemen-course/course'
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
          message: 'Course gagal dihapus'
        }
      })
      yield put({
        type: DELETE_COURSE_FAILED,
        payload: {
          modal: true,
          error: err?.data?.message
        }
      })
    }
  }
}


/**
 * 
 * Post Course 
 * 
 * @param {*} action 
 * @returns
 */
function* postCourse(action) {
  try {

    const res = yield call(postCourseAction, action?.payload)

    const payload = res?.data

    yield put({
      type: POST_COURSE_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Course berhasil disimpan',
        redirect: '/manajemen-course/course'
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
          message: 'Course gagal ditambahkan',
          childMessage: err?.data?.meta?.message
        }
      })
      yield put({
        type: POST_COURSE_FAILED,
        payload: {
          modal: true,
          error: err?.data?.message
        }
      })
    }
  }
}

function* deleteCourseList(action) {
  try {
    const res = yield call(deleteListCourseAction, action?.payload)

    const payload = res?.data

    yield put({
      type: DELETE_COURSE_LIST_SUCCESS,
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
          type: DELETE_COURSE_LIST_FAILED,
          payload: status?.message
        })
      }
    }
  }
}


/**
 * Get detail course 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetCourseDetail(action) {
  try {
    const res = yield call(getDetailCourseAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_DETAIL_COURSE_SUCCESS,
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
      yield put({
        type: SET_MODAL,
        payload: {
          code: err?.meta?.code,
          message: 'Course tidak ditemukan',
          redirect: '/manajemen-course/course'
        }
      })
      yield put({
        type: GET_DETAIL_COURSE_FAILED,
        payload: {
          modal: true,
          error: err?.meta?.message
        }
      })
    }
  }
}

/**
 * Update Course 
 * 
 * @param {*} action 
 * @returns
 */
function* updateCourse(action) {
  try {
    const res = yield call(updateCourseAction, action?.payload)

    const payload = res?.data

    yield put({
      type: UPDATE_COURSE_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Course berhasil diubah',
        redirect: '/manajemen-course/course'
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
          message: 'Course gagal diubah',
          redirect: '/manajemen-course/course',
          childMessage: err?.data?.meta?.message
        }
      })
      yield put({
        type: UPDATE_COURSE_FAILED,
        payload: {
          modal: true,
          error: err?.meta?.message
        }
      })
    }
  }
}

/**
 * Patch Bulk Course Action 
 * 
 * @param {*} action
 * @returns
 */
function* patchBulkCourse(action) {
  try {
    const res = yield call(bulkCourseAction, action?.payload)

    const payload = res?.data

    yield put({
      type: PATCH_BULK_COURSE_SUCCESS,
      payload: payload
    })

    // yield put({
    //   type: SET_MODAL,
    //   payload: {
    //     code: res?.data?.meta?.code,
    //     message: 'Bulk Course berhasil',
    //     redirect: '/manajemen-course/course'
    //   }
    // })
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


      // yield put({
      //   type: SET_MODAL,
      //   payload: {
      //     code: err?.data?.statusCode,
      //     message: 'Bulk Course gagal',
      //     childMessage: err?.data?.meta?.message
      //   }
      // })
      yield put({
        type: PATCH_BULK_COURSE_FAILED,
        payload: err?.data?.meta?.message
        // payload: {
        //   modal: true,
        //   error: err?.data?.message
        // }
      })
    }
  }
}

/**
 * Filter COurse 
 * 
 * @param {*} action 
 * @returns
 */
function* filterCourseCategory(action) {
  try {
    const res = yield call(filterCourseAction, action?.payload)

    const payload = res?.data

    yield put({
      type: FILTER_COURSE_CATEGORY_SUCCESS,
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
      yield put({
        type: FILTER_COURSE_CATEGORY_FAILED,
        error: err?.data?.meta?.message || err?.data?.message
      })
    }
  }
}


function* courseSaga() {
  yield takeEvery(GET_COURSE_REQUESTED, fetchCourse)
  yield takeEvery(DELETE_COURSE_REQUESTED, deleteCourse)
  yield takeEvery(POST_COURSE_REQUESTED, postCourse)
  yield takeEvery(DELETE_COURSE_LIST_REQUESTED, deleteCourseList)
  yield takeEvery(GET_DETAIL_COURSE_REQUESTED, fetchGetCourseDetail)
  yield takeEvery(UPDATE_COURSE_REQUESTED, updateCourse)
  yield takeEvery(PATCH_BULK_COURSE_REQUESTED, patchBulkCourse)
  yield takeEvery(FILTER_COURSE_CATEGORY_REQUESTED, filterCourseCategory)
}

export default courseSaga