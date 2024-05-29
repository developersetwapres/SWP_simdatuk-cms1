import * as bannerReducer from './bannerReducer'
import * as courseReducer from './course/courseReducer'
import * as categoryReducer from './categoryReducer'
import * as roleReducer from './users/roleReducer'
import * as userReducer from './users/userReducer'
import * as blacklistReducer from './users/blacklistReducer'
import * as couponReducer from './coupon/couponReducer'
import * as couponSubmissionReducer from './coupon/couponSubmissionReducer'
import * as providerCourse from './course/providerCourseReducer'
import * as authenticationReducer from './authenticationReducer'
import * as modalReducer from './modalReducer'
import * as commandReducer from './commandReducer'
import * as providerReducer from './users/providerReducer'
import * as activitylogReducer from './users/activitylogReducer'
import * as menuReducer from './menuReducer'
import * as editorReducer from './course/editorReducer'
import * as employeeReducer from './employeeReducer'

// * Excel
import * as importExcelReducer from './excel/importExcelReducer'
import * as exportExcelReducer from './excel/exportExcelReducer'

// * Reducer
import * as responserReducer from './responserReducer'

// * Notification
import * as notificationReducer from './notificationReducer'
/**
 *
 * Root Reducers
 *
 */
const reducers = {
  ...bannerReducer,
  ...courseReducer,
  ...categoryReducer,
  ...roleReducer,
  ...userReducer,
  ...blacklistReducer,
  ...couponReducer,
  ...couponSubmissionReducer,
  ...providerCourse,
  ...authenticationReducer,
  ...modalReducer,
  ...commandReducer,
  ...providerReducer,
  ...activitylogReducer,
  ...menuReducer,
  ...editorReducer,
  ...importExcelReducer,
  ...exportExcelReducer,
  ...responserReducer,
  ...notificationReducer,
  ...employeeReducer
}

export default reducers
