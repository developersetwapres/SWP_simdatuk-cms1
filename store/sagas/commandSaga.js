/**
 * 
 * @module Saga/commandSaga 
 * 
 * @desc Command
 */
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_COMMAND_TOPIC_FAILED,
  GET_COMMAND_TOPIC_SUCCESS,
  GET_COMMAND_TOPIC_REQUESTED,
  GET_COMMAND_COURSE_LEVEL_REQUESTED,
  GET_COMMAND_COURSE_LEVEL_SUCCESS,
  GET_COMMAND_COURSE_LEVEL_FAILED,
  GET_COMMAND_COURSE_CATEGORY_REQUESTED,
  GET_COMMAND_COURSE_CATEGORY_SUCCESS,
  GET_COMMAND_COURSE_CATEGORY_FAILED,
  GET_USER_ME_REQUESTED,
  GET_USER_ME_SUCCESS,
  GET_USER_ME_FAILED,
  UPDATE_PASSWORD_USER_ME_REQUESTED,
  UPDATE_PASSWORD_USER_ME_SUCCESS,
  UPDATE_PASSWORD_USER_ME_FAILED,
  GET_COMMAND_COURSES_REQUESTED,
  GET_COMMAND_COURSES_SUCCESS,
  GET_COMMAND_COURSES_FAILED,
  GET_COMMAND_MENU_REQUESTED,
  GET_COMMAND_MENU_SUCCESS,
  GET_COMMAND_MENU_FAILED,
  GET_COMMAND_LANGUAGE_REQUESTED,
  GET_COMMAND_LANGUAGE_SUCCESS,
  GET_COMMAND_LANGUAGE_FAILED,
  GET_COMMAND_PRICE_REQUESTED,
  GET_COMMAND_PRICE_SUCCESS,
  GET_COMMAND_PRICE_FAILED,
  GET_COMMAND_ORGANIZER_REQUESTED,
  GET_COMMAND_ORGANIZER_SUCCESS,
  GET_COMMAND_ORGANIZER_FAILED,
  CATCH_ERROR,
  SET_MODAL,
  GET_COMMAND_COUPON_FAILED,
  GET_COMMAND_COUPON_SUCCESS,
  GET_COMMAND_COUPON_REQUESTED,
  GET_COMMAND_ROLES_REQUESTED,
  GET_COMMAND_ROLES_SUCCESS,
  GET_COMMAND_ROLES_FAILED,
  GET_COMMAND_CATEGORY_REQUESTED,
  GET_COMMAND_CATEGORY_SUCCESS,
  GET_COMMAND_CATEGORY_FAILED,
  GET_COMMAND_USER_LEVEL_REQUESTED,
  GET_COMMAND_USER_LEVEL_SUCCESS,
  GET_COMMAND_USER_LEVEL_FAILED,
  GET_COMMAND_USER_POSITION_REQUESTED,
  GET_COMMAND_USER_POSITION_SUCCESS,
  GET_COMMAND_USER_POSITION_FAILED,
  GET_COMMAND_USER_UNIT_REQUESTED,
  GET_COMMAND_USER_UNIT_SUCCESS,
  GET_COMMAND_USER_UNIT_FAILED,
  GET_COMMAND_CATEGORY_TOPIC_SUCCESS,
  GET_COMMAND_CATEGORY_TOPIC_FAILED,
  GET_COMMAND_CATEGORY_TOPIC_REQUESTED,
  GET_COMMAND_COURSE_USER_REQUESTED,
  GET_COMMAND_COURSE_USER_SUCCESS,
  GET_COMMAND_COURSE_USER_FAILED,
  GET_COMMAND_DURATION_REQUESTED,
  GET_COMMAND_DURATION_SUCCESS,
  GET_COMMAND_DURATION_FAILED,
  GET_NOTIFICATION_REQUESTED,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_FAILED,
  FILTER_COURSE_BY_PROVIDER_REQUESTED,
  FILTER_COURSE_BY_PROVIDER_SUCCESS,
  FILTER_COURSE_BY_PROVIDER_FAILED,
  GET_COMMAND_FILTER_COUPON_SUBMISSION_FAILED,
  GET_COMMAND_FILTER_COUPON_SUBMISSION_SUCCESS,
  GET_COMMAND_FILTER_COUPON_SUBMISSION_REQUESTED,
  POST_NOTIFICATION_REQUESTED,
  POST_NOTIFICATION_SUCCESS,
  POST_NOTIFICATION_FAILED,
  ACTION_RESPONSER
} from '../constants'
import { queryParams } from '@/utils/'
import { get, post, put as Update } from '@/utils/interceptors'

/**
 * GET Topic 
 * 
 * @param {*} payload 
 * @returns
 */
function getTopicAction() {
  return get(`/topics${queryParams(1, 1000, '', '', '')}`)
}

/**
 * Get Course Level 
 * 
 * @returns
 */
function getCourseLevelAction() {
  return get(`/course/levels${queryParams(1, 1000, '', '', '')}`)
}

/**
 * get course category 
 * 
 * @returns
 */
function getCourseCategoryAction() {
  return get(`/course/categories${queryParams(1, 1000, '', '', '')}`)
}

/**
 * Get Command course 
 * 
 * @returns
 */
function getCommandCoursesAction() {
  return post(`/admin/course/list${queryParams(1, 1000, '', '', '')}`)
}

/**
 * GET USER ME 
 * 
 * @returns
 */
function getUserMeAction() {
  return get(`/auth/me`)
}

/**
 * Update Password Me 
 * 
 * @param {*} payload 
 * @returns
 */
function updatePasswordMeAction(payload) {
  return Update(`/auth/me`, payload)
}

/**
 * Get Command Menu 
 * 
 * @param {*} payload 
 * @returns
 */
function getCommandMenu() {
  return get(`/menu${queryParams(1, 10000, '', '', '')}`)
}

/**
 * Get Command Language
 * 
 * @returns
 */
function getCommandLanguage() {
  return get(`/course/language${queryParams(1, 10000, '', '', '')}`)
}

/**
 * Get Command Price
 * 
 * @returns
 */
function getCommandPrice() {
  return get(`/course/price${queryParams(1, 10000, '', '', '')}`)
}


/**
 * Get Command Organizer
 * 
 * @returns
 */
function getCommandOrganizer() {
  return get(`/providers${queryParams(1, 1000, '', '', '')}&with_topics=true`)
}

/**
 * Get Command Coupon 
 * 
 * @returns
 */
function getCommandCouponAction() {
  return get(`/coupon${queryParams(1, 1000, '', '', '')}&status=0`)
}

/**
 * Get command roles 
 * 
 * @returns
 */
function getCommandRolesAction() {
  return get(`/role${queryParams(1, 1000, '', '', '')}`)
}

/**
 * Get Command Categori 
 * 
 * @returns
 */
function getCommandCategoryAction() {
  return get(`/course/categories${queryParams(1, 1000, '', '', '')}`)
}

/**
 * Get command Category Topic 
 * 
 * @returns
 */
function getCommandCategoryTopicAction() {
  return get(`/course/categories${queryParams(1, 1000, '', '', '')}&with_topics=true`)
}


/**
 * Get Command User Level 
 * 
 * @returns
 */
function getCommandUserLevelAction() {
  return get(`/employee-level${queryParams(1, 1000, '', '', '')}`)
}

/**
 * Get command User Position
 * 
 * @returns
 */
function getCommandUserPositionAction() {
  return get(`/employee-position${queryParams(1, 1000, '', '', '')}`)
}

/**
 * Get command User Unit
 * 
 * @returns
 */
function getCommandUserUnitAction() {
  return get(`/employee-unit${queryParams(1, 1000, '', '', '')}`)
}

/**
 * Get Command Course User 
 * 
 * @param {*} id 
 * @returns
 */
function getCommandCourseUser(id) {
  return get(`/admin/courses${queryParams(1, 100, '', '', '')}&user_id=${id}`)
}

/**
 * Get Command course Duration 
 * 
 * @returns
 */
function getCommandCourseDuration() {
  return get(`/course/durations${queryParams(1, 100, '', '', '')}`)
}

/**
 * Get Notification Action 
 * 
 * @param {*} payload 
 * @returns
 */
function getNotificationAction() {
  return get(`/notification?source=${2}`)
}

/**
 * Filter Course by Proivder 
 * 
 * @param {*} payload 
 * @returns
 */
function filterCourseByProviderAction(payload) {
  return post(`/admin/course/list${queryParams(1, 1000, '', '', '')}&provider=${payload}`)
}

/**
 * Filter Command Filter COupon Submission
 * 
 * @param {*} payload 
 * @returns
 */
function filterCouponSubmissionAction(payload) {
  const moreParams = `&provider_id=${payload.provider_id}&status=${0}`
  return get(`/coupon${queryParams(1, 1000, '', '', '')}${moreParams} `)
}

/**
 * Post Notification 
 * 
 * @param {*} payload 
 * @returns
 */
function postNotificationAction(payload) {
  return post(`/notification/token`, payload)
}

/**
 * Fetch Get Topic 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetTopic(action) {
  try {
    const res = yield call(getTopicAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_COMMAND_TOPIC_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const status = err?.data?.meta
    if (status?.code === 400) {
      yield put({
        type: CATCH_ERROR,
        payload: status?.message
      })
    } else {
      yield put({
        type: GET_COMMAND_TOPIC_FAILED,
        payload: status?.message
      })
    }
  }
}

/**
 * Fetch Get COurse level 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetCourseLevel(action) {
  try {
    const res = yield call(getCourseLevelAction, action?.payload)

    const payload = res?.data
    yield put({
      type: GET_COMMAND_COURSE_LEVEL_SUCCESS,
      payload: payload
    })
  } catch (err) {
    if (err?.data?.statusCode === 400) {
      yield put({
        type: CATCH_ERROR,
        payload: err?.data?.message
      })
    } else {
      yield put({
        type: GET_COMMAND_COURSE_LEVEL_FAILED,
        payload: err?.data?.message
      })
    }
  }
}

/**
 * Fetch get course category 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetCourseCategory(action) {
  try {
    const res = yield call(getCourseCategoryAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_COMMAND_COURSE_CATEGORY_SUCCESS,
      payload: payload
    })
  } catch (err) {
    if (err?.data?.statusCode === 400) {
      yield put({
        type: CATCH_ERROR,
        payload: err?.data?.message
      })
    } else {
      yield put({
        type: GET_COMMAND_COURSE_CATEGORY_FAILED,
        payload: err?.data?.message
      })
    }
  }
}

/**
 * Get User Me
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetUserMe(action) {
  try {
    const res = yield call(getUserMeAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_USER_ME_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const status = err?.data?.meta
    if (status?.code === 400) {
      yield put({
        type: CATCH_ERROR,
        payload: status?.message
      })
    } else {
      yield put({
        type: GET_USER_ME_FAILED,
        payload: status?.message
      })
    }
  }
}

/**
 * Update Password Me 
 * 
 * @param {*} action 
 * @returns
 */
function* updatePasswordMe(action) {
  try {
    const res = yield call(updatePasswordMeAction, action?.payload)

    const payload = res?.data

    yield put({
      type: UPDATE_PASSWORD_USER_ME_SUCCESS,
      payload: payload
    })

    yield put({
      type: SET_MODAL,
      payload: {
        code: res?.data?.meta?.code,
        message: 'Password berhasil diubah',
        redirect: '/profile'
      }
    })
  } catch (err) {
    yield put({
      type: SET_MODAL,
      payload: err?.data?.statusCode,
      message: 'Password gagal diubah'
    })
    yield put({
      type: UPDATE_PASSWORD_USER_ME_FAILED,
      payload: {
        modal: true,
        error: err?.data?.message
      }
    })
  }
}

/**
 * Fetch get courses
 * 
 * @param {*} action 
 * @returns
  */
function* fetchGetCourses(action) {
  try {
    const res = yield call(getCommandCoursesAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_COMMAND_COURSES_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const status = err?.data?.meta
    if (status?.code === 400) {
      yield put({
        type: CATCH_ERROR,
        payload: status?.message
      })
    } else {
      yield put({
        type: GET_COMMAND_COURSES_FAILED,
        payload: status?.message
      })
    }
  }
}

/**
 * Fetch get Menu 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetMenu(action) {
  try {
    const res = yield call(getCommandMenu, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_COMMAND_MENU_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const status = err?.data?.meta
    if (status?.code === 400) {
      yield put({
        type: CATCH_ERROR,
        payload: status?.message
      })
    } else {
      yield put({
        type: GET_COMMAND_MENU_FAILED,
        payload: status?.message
      })
    }
  }
}

/**
 * Fetch Language 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetLanguage(action) {
  try {
    const res = yield call(getCommandLanguage, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_COMMAND_LANGUAGE_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const status = err?.data?.meta
    if (status?.code === 400) {
      yield put({
        type: CATCH_ERROR,
        payload: status?.message
      })
    } else {
      yield put({
        type: GET_COMMAND_LANGUAGE_FAILED,
        payload: status?.message
      })
    }
  }
}

/**
 * Fetch Price
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetPrice(action) {
  try {
    const res = yield call(getCommandPrice, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_COMMAND_PRICE_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const status = err?.data?.meta
    if (status?.code === 400) {
      yield put({
        type: CATCH_ERROR,
        payload: status?.message
      })
    } else {
      yield put({
        type: GET_COMMAND_PRICE_FAILED,
        payload: status?.message
      })
    }
  }
}


/**
 * Fetch Organizer
 * 
 * @param {*} action
 * @returns
 */
function* fetchGetOrganizer(action) {
  try {
    const res = yield call(getCommandOrganizer, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_COMMAND_ORGANIZER_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const status = err?.data?.meta
    if (status?.code === 400) {
      yield put({
        type: CATCH_ERROR,
        payload: status?.message
      })
    } else {
      yield put({
        type: GET_COMMAND_ORGANIZER_FAILED,
        payload: status?.message
      })
    }
  }
}

/**
 * Fetch command coupon 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetCommandCoupon(action) {
  try {
    const res = yield call(getCommandCouponAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_COMMAND_COUPON_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const status = err?.data?.meta
    if (status?.code === 400) {
      yield put({
        type: CATCH_ERROR,
        payload: status?.message
      })
    } else {
      yield put({
        type: GET_COMMAND_COUPON_FAILED,
        payload: status?.message
      })
    }
  }
}

/**
 * Fetch Command rOles 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetCommandRoles(action) {
  try {
    const res = yield call(getCommandRolesAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_COMMAND_ROLES_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const status = err?.data?.meta
    if (status?.code === 400) {
      yield put({
        type: CATCH_ERROR,
        payload: status?.message
      })
    } else {
      yield put({
        type: GET_COMMAND_ROLES_FAILED,
        payload: status?.message
      })
    }
  }
}

/**
 * Fetch Command Categori 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetCommandCategory(action) {
  try {
    const res = yield call(getCommandCategoryAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_COMMAND_CATEGORY_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const status = err?.data?.meta
    if (status?.code === 400) {
      yield put({
        type: CATCH_ERROR,
        payload: status?.message
      })
    } else {
      yield put({
        type: GET_COMMAND_CATEGORY_FAILED,
        payload: status?.message
      })
    }
  }
}

/**
 * Fetch Command Level 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchCommandLevel(action) {
  try {
    const res = yield call(getCommandUserLevelAction, action)
    const payload = res?.data

    yield put({
      type: GET_COMMAND_USER_LEVEL_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const status = err?.data
    if (status?.statusCode === 400) {
      yield put({
        type: CATCH_ERROR,
        payload: status?.message
      })
    } else {
      yield put({
        type: GET_COMMAND_USER_LEVEL_FAILED,
        payload: status?.message
      })
    }
  }
}

/**
 * Fetch Command Position
 * 
 * @param {*} action 
 * @returns
 */
function* fetchCommandPosition(action) {
  try {
    const res = yield call(getCommandUserPositionAction, action)
    const payload = res?.data

    yield put({
      type: GET_COMMAND_USER_POSITION_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const status = err?.data
    if (status?.statusCode === 400) {
      yield put({
        type: CATCH_ERROR,
        payload: status?.message
      })
    } else {
      yield put({
        type: GET_COMMAND_USER_POSITION_FAILED,
        payload: status?.message
      })
    }
  }
}

/**
 * Fetch Command Unit 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchCommandUnit(action) {
  try {
    const res = yield call(getCommandUserUnitAction, action)
    const payload = res?.data

    yield put({
      type: GET_COMMAND_USER_UNIT_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const status = err?.data
    if (status?.statusCode === 400) {
      yield put({
        type: CATCH_ERROR,
        payload: status?.message
      })
    } else {
      yield put({
        type: GET_COMMAND_USER_UNIT_FAILED,
        payload: payload
      })
    }
  }
}

/**
 * Fetch Notification 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchNotification(action) {
  try {
    const res = yield call(getNotificationAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_NOTIFICATION_SUCCESS,
      payload: payload
    })
  } catch (err) {
    if (err?.data?.meta?.code === 400) {
      yield put({
        type: CATCH_ERROR,
        payload: err?.data?.meta?.message
      })
    } else {
      yield put({
        type: GET_NOTIFICATION_FAILED,
        payload: err?.data?.meta?.message
      })
    }
  }
}

/**
 * Fetch Command Categori with TOpic 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchCommandCategoryTopic(action) {
  try {
    const res = yield call(getCommandCategoryTopicAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_COMMAND_CATEGORY_TOPIC_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const status = err?.data
    if (status?.statusCode == 400) {
      yield put({
        type: CATCH_ERROR,
        payload: status?.message
      })
    } else {
      yield put({
        type: GET_COMMAND_CATEGORY_TOPIC_FAILED,
        payload: status?.message
      })
    }
  }
}

/**
 * Fetch Command Course category 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetCommandCourseUser(action) {
  try {
    const res = yield call(getCommandCourseUser, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_COMMAND_COURSE_USER_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const status = err?.data
    if (status?.statusCode === 400) {
      yield put({
        type: CATCH_ERROR,
        payload: status?.message
      })
    } else {
      yield put({
        type: GET_COMMAND_COURSE_USER_FAILED,
        payload: status?.message
      })
    }
  }
}

/**
 * Get command Duraiton 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchGetCommandCourseDuration(action) {
  try {
    const res = yield call(getCommandCourseDuration, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_COMMAND_DURATION_SUCCESS,
      payload: payload
    })
  } catch (err) {
    const status = err?.data
    if (status?.statusCode === 400) {
      yield put({
        type: CATCH_ERROR,
        payload: status?.message
      })
    } else {
      yield put({
        type: GET_COMMAND_DURATION_FAILED,
        payload: status?.message
      })
    }
  }
}

/**
 * Filter Course by Provider 
 * 
 * @param {*} action 
 * @returns
 */
function* fetchFilterCoursebyProvider(action) {
  try {
    const res = yield call(filterCourseByProviderAction, action?.payload)
    const payload = res?.data
    yield put({
      type: FILTER_COURSE_BY_PROVIDER_SUCCESS,
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
          code: err?.data?.meta?.code || err?.data?.statusCode,
          message: 'Mohon Maaf kami sedang dalam gangguan'
        }
      })
      yield put({
        type: FILTER_COURSE_BY_PROVIDER_FAILED,
        payload: {
          modal: true,
          error: err?.data?.message
        }
      })
    }
  }
}

function* fetchCommandFilterCouponSubmission(action) {
  try {
    const res = yield call(filterCouponSubmissionAction, action?.payload)

    const payload = res?.data

    yield put({
      type: GET_COMMAND_FILTER_COUPON_SUBMISSION_SUCCESS,
      payload: payload
    })
  } catch (err) {
    if (err?.data?.meta?.code === 500 || err?.data?.statusCode === 500) {
      yield put({
        type: SET_MODAL,
        payload: {
          code: err?.data?.meta?.code || err?.data?.statusCode,
          message: 'Mohon Maaf kami sedang dalam gangguan'
        }
      })
      yield put({
        type: GET_COMMAND_FILTER_COUPON_SUBMISSION_FAILED,
        payload: {
          modal: true,
          error: err?.data?.message
        }
      })
    }
  }
}

function* postNotificationSaga(action) {
  try {
    const res = yield call(postNotificationAction, action?.payload)

    const payload = res?.data

    yield put({
      type: POST_NOTIFICATION_SUCCESS,
      payload: payload
    })
  } catch (err) {
    yield put({
      type: POST_NOTIFICATION_FAILED,
      payload: err
    })
  }
}

function* commandSaga() {
  yield takeEvery(GET_COMMAND_TOPIC_REQUESTED, fetchGetTopic)
  yield takeEvery(GET_COMMAND_COURSE_LEVEL_REQUESTED, fetchGetCourseLevel)
  yield takeEvery(GET_COMMAND_COURSE_CATEGORY_REQUESTED, fetchGetCourseCategory)
  yield takeEvery(GET_USER_ME_REQUESTED, fetchGetUserMe)
  yield takeEvery(UPDATE_PASSWORD_USER_ME_REQUESTED, updatePasswordMe)
  yield takeEvery(GET_COMMAND_COURSES_REQUESTED, fetchGetCourses)
  yield takeEvery(GET_COMMAND_MENU_REQUESTED, fetchGetMenu)
  yield takeEvery(GET_COMMAND_LANGUAGE_REQUESTED, fetchGetLanguage)
  yield takeEvery(GET_COMMAND_PRICE_REQUESTED, fetchGetPrice)
  yield takeEvery(GET_COMMAND_ORGANIZER_REQUESTED, fetchGetOrganizer)
  yield takeEvery(GET_COMMAND_COUPON_REQUESTED, fetchGetCommandCoupon)
  yield takeEvery(GET_COMMAND_ROLES_REQUESTED, fetchGetCommandRoles)
  yield takeEvery(GET_COMMAND_CATEGORY_REQUESTED, fetchGetCommandCategory)
  yield takeEvery(GET_COMMAND_USER_LEVEL_REQUESTED, fetchCommandLevel)
  yield takeEvery(GET_COMMAND_USER_POSITION_REQUESTED, fetchCommandPosition)
  yield takeEvery(GET_COMMAND_USER_UNIT_REQUESTED, fetchCommandUnit)
  yield takeEvery(GET_COMMAND_CATEGORY_TOPIC_REQUESTED, fetchCommandCategoryTopic)
  yield takeEvery(GET_COMMAND_COURSE_USER_REQUESTED, fetchGetCommandCourseUser)
  yield takeEvery(GET_COMMAND_DURATION_REQUESTED, fetchGetCommandCourseDuration)
  yield takeEvery(GET_NOTIFICATION_REQUESTED, fetchNotification)
  yield takeEvery(FILTER_COURSE_BY_PROVIDER_REQUESTED, fetchFilterCoursebyProvider)
  yield takeEvery(GET_COMMAND_FILTER_COUPON_SUBMISSION_REQUESTED, fetchCommandFilterCouponSubmission)
  yield takeEvery(POST_NOTIFICATION_REQUESTED, postNotificationSaga)
}

export default commandSaga