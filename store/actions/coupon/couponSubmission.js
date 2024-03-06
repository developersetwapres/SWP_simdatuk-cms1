import {
  GET_COUPON_SUBMISSION_REQUESTED,
  GET_DETAIL_COUPON_SUBMISSION_REQUESTED,
  REJECT_COUPON_SUBMISSION_REQUESTED,
  APPROVE_COUPON_SUBMISSION_REQUESTED,
  REJECT_COUPON_SUBMISSION_LIST_REQUESTED,
  APPROVE_COUPON_SUBMISSION_LIST_REQUSTED
} from '@/store/constants'

/**
 * Fetch Get Coupon
 * 
 * @param {*} payload
 * @returns
 */
export const getCouponSubmission = (payload) => ({
  type: GET_COUPON_SUBMISSION_REQUESTED,
  payload: payload
})

/**
 * Fetch detail coupon 
 * 
 * @param {*} id 
 * @returns
 */
export const getDetailCouponSubmission = (id) => ({
  type: GET_DETAIL_COUPON_SUBMISSION_REQUESTED,
  payload: id
})


/**
 * Reject Coupon
 * 
 * @param {*} payload
 * @returns
 */
export const rejectCouponSubmission = (payload) => ({
  type: REJECT_COUPON_SUBMISSION_REQUESTED,
  payload: payload
})

/**
 *  Approve Coupon 
 * 
 * @param {*} payload
 * @returns
 */
export const approveCouponSubmission = (payload) => ({
  type: APPROVE_COUPON_SUBMISSION_REQUESTED,
  payload: payload
})

/**
 * Approve COupon list 
 * 
 * @param {*} payload 
 * @returns
 */
export const approveCouponSubmissionList = (payload) => ({
  type: APPROVE_COUPON_SUBMISSION_LIST_REQUSTED,
  payload: payload
})

/**
 * Coupon List Reject 
 * 
 * @param {*} payload
 * @returns
 */
export const rejectCouponSubmissionList = (payload) => ({
  type: REJECT_COUPON_SUBMISSION_LIST_REQUESTED,
  payload: payload
})