import {
  EXPORT_EXCEL_USER_BLACKLIST_REQUESTED,
  EXPORT_EXCEL_USER_REQUESTED,
  EXPORT_EXCEL_USER_LEVEL_REQUESTED,
  EXPORT_EXCEL_COUPON_REQUESTED,
  EXPORT_EXCEL_USER_LIST_REQUESTED,
  EXPORT_REPORT_COUPON_REQUESTED
} from '@/store/constants'

/**
 * Export File Excel Blacklist 
 * 
 * @returns
 */
export const exportExcelUserBlacklist = () => ({
  type: EXPORT_EXCEL_USER_BLACKLIST_REQUESTED
})

/**
 * Export File excel User 
 * 
 * @returns
 */
export const exportExcelUser = () => ({
  type: EXPORT_EXCEL_USER_REQUESTED
})

/**
 * Export File Excel User Level 
 * 
 * @returns
 */
export const exportExcelUserLevel = () => ({
  type: EXPORT_EXCEL_USER_LEVEL_REQUESTED
})

/**
 * Export File Excel Coupon 
 * 
 * @returns
 */
export const exportExcelCoupon = () => ({
  type: EXPORT_EXCEL_COUPON_REQUESTED
})

/**
 * Export File Excel User List 
 * 
 * @returns
 */
export const exportFileExcelUserList = () => ({
  type: EXPORT_EXCEL_USER_LIST_REQUESTED
})

/**
 * Export Report Coupon
 * 
 * @returns
 */
export const exportReportCoupon = (payload) => ({
  type: EXPORT_REPORT_COUPON_REQUESTED,
  payload: payload
})