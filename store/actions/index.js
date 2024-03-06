import * as dashboard from './dashboard'
import * as authenticationAction from './authentication'
import * as user from './users/user'
import * as course from './course/course'
import * as command from './command'
import * as provider from './users/provider'
import * as activitylog from './users/activitylog'
import * as banner from './banner'
import * as category from './category'
import * as role from './users/role'
import * as menu from './menu'
import * as blacklist from './users/blacklist'
import * as editor from './course/editor'

// * Coupon 
import * as coupon from './coupon/coupon'
import * as couponSubmission from './coupon/couponSubmission'

// * Provider 
import * as providerCourse from './course/providerCourse'

// * Excel 
import * as importExcel from './excel/importExcel'
import * as exportExcel from './excel/exportExcel'
import * as responser from './responser'

/**
 * 
 * Root Actions
 * 
 */
const actions = {
  ...dashboard,
  ...authenticationAction,
  ...user,
  ...course,
  ...command,
  ...provider,
  ...activitylog,
  ...banner,
  ...category,
  ...role,
  ...menu,
  ...blacklist,
  ...editor,
  ...coupon,
  ...couponSubmission,
  ...providerCourse,
  ...importExcel,
  ...exportExcel,
  ...responser
}

export default actions