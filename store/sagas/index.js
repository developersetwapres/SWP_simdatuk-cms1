/**
 *
 * Root Sagas
 *
 */
import { all } from '@redux-saga/core/effects'

import authSaga from './authenticationSaga'

// Master Data
import userSaga from './users/userSaga'
import roleSaga from './users/roleSaga'
import echelonSaga from './users/echelonSaga'

// Employee
import employeeSaga from './employeeSaga'

// History
import positionSaga from './histories/positionSaga'
import gradeSaga from './histories/gradeSaga'
import recognitionSaga from './histories/recognitionSaga'
import trainingSaga from './histories/trainingSaga'
import targetSaga from './histories/targetSaga'
import performanceSaga from './histories/performanceSaga'
import disciplinarySaga from './histories/disciplinarySaga'

// Master Data
import decreeSaga from './masterData/decreeSaga'

export default function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    roleSaga(),
    echelonSaga(),
    employeeSaga(),
    positionSaga(),
    gradeSaga(),
    recognitionSaga(),
    decreeSaga(),
    trainingSaga(),
    targetSaga(),
    performanceSaga(),
    disciplinarySaga()
  ])
}
