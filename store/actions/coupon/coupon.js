import {
  GET_COUPON_REQUESTED,
  GET_DETAIL_COUPON_REQUESTED,
  POST_COUPON_REQUESTED,
  DELETE_COUPON_REQUESTED,
  UPDATE_COUPON_REQUESTED,
  DELETE_COUPON_LIST_REQUESTED
} from '@/store/constants'

/**
 * Get coupon 
 * 
 * @param {*} payload 
 * @returns
 */
export const getCoupon = (payload) => ({
  type: GET_COUPON_REQUESTED,
  payload: payload
})

/**
 * Get detail
 * 
 * @param {*} id 
 * @returns
 */
export const getDetailCoupon = (id) => ({
  type: GET_DETAIL_COUPON_REQUESTED,
  payload: id
})

/**
 * Post Coupon 
 * 
 * @param {*} payload 
 * @returns
 */
export const postCoupon = (payload) => ({
  type: POST_COUPON_REQUESTED,
  payload: payload
})

/**
 * Delete Coupon
 * 
 * @param {*} id
 * @returns
 */
export const deleteCoupon = (id) => ({
  type: DELETE_COUPON_REQUESTED,
  payload: id
})

/**
 * Update COupon 
 * 
 * @param {*} payload 
 * @returns
 */
export const updateCoupon = (payload) => ({
  type: UPDATE_COUPON_REQUESTED,
  payload: payload
})

/**
 * Delete Coupon List 
 * 
 * @param {*} id 
 * @returns
 */
export const deleteCouponList = (id) => ({
  type: DELETE_COUPON_LIST_REQUESTED,
  payload: id
})