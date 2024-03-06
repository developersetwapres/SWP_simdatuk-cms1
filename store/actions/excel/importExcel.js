import {
  IMPORT_EXCEL_USER_BLACKLIST_REQUESTED,
  IMPORT_EXCEL_USER_REQUESTED,
  IMPORT_EXCEL_USER_LEVEL_REQUESTED,
  IMPORT_EXCEL_COUPON_REQUESTED
} from '@/store/constants'

/**
 * Import Excel User Blacklist 
 * 
 * @param {*} payload 
 * @returns
 */
export const importExcelUserBlacklist = (payload) => ({
  type: IMPORT_EXCEL_USER_BLACKLIST_REQUESTED,
  payload: payload
})

/**
 * Import Excel User 
 * 
 * @param {*} payload 
 * @returns
 */
export const importExcelUser = (payload) => ({
  type: IMPORT_EXCEL_USER_REQUESTED,
  payload: payload
})

/**
 * Import Excel User Level 
 * 
 * @param {*} payload 
 * @returns
 */
export const importExcelUserLevel = (payload) => ({
  type: IMPORT_EXCEL_USER_LEVEL_REQUESTED,
  payload: payload
})

/**
 * Import Excel Coupon 
 * 
 * @param {*} payload 
 * @returns
 */
export const importExcelCoupon = (payload) => ({
  type: IMPORT_EXCEL_COUPON_REQUESTED,
  payload: payload
})