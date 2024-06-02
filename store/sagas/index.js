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

export default function* rootSaga() {
  yield all([authSaga(), userSaga(), roleSaga(), echelonSaga(), employeeSaga()])
}
