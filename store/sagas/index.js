/**
 *
 * Root Sagas
 *
 */
import { all } from '@redux-saga/core/effects'

import authSaga from './authenticationSaga'
import userSaga from './users/userSaga'
import roleSaga from './users/roleSaga'
import employeeSaga from './employeeSaga'

export default function* rootSaga() {
  yield all([authSaga(), userSaga(), roleSaga(), employeeSaga()])
}
