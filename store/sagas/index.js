/**
 *
 * Root Sagas
 *
 */
import { all } from '@redux-saga/core/effects'

import authSaga from './authenticationSaga'
import userSaga from './users/userSaga'
import courseSaga from './course/courseSaga'
import commandSaga from './commandSaga'
import providerSaga from './users/providerSaga'
import activitylogSaga from './users/activitylogSaga'
import bannerSaga from './bannerSaga'
import categorySaga from './categorySaga'
import roleSaga from './users/roleSaga'
import menuSaga from './menuSaga'
import blacklistSaga from './users/blacklistSaga'
import editorSaga from './course/editorSaga'
import employeeSaga from './employeeSaga'

// * Coupon
import couponSaga from './coupon/couponSaga'
import couponSubmissionSaga from './coupon/couponSubmissionSaga'

// * Provider Course
import providerCourseSaga from './course/providerCourseSaga'

// * Excel
import importExcelSaga from './excel/importExcelSaga'
import exportExcelSaga from './excel/exportExcelSaga'

export default function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    courseSaga(),
    commandSaga(),
    providerSaga(),
    activitylogSaga(),
    bannerSaga(),
    categorySaga(),
    roleSaga(),
    menuSaga(),
    blacklistSaga(),
    editorSaga(),
    couponSaga(),
    couponSubmissionSaga(),
    providerCourseSaga(),
    importExcelSaga(),
    exportExcelSaga(),
    employeeSaga()
  ])
}
