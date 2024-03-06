import { get, patch } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

/**
 * Fetch Coupon Submission 
 * 
 * @param {*} payload
 * @returns
 */
export const getCouponSubmissionAction = (payload) => {
  const { page, limit, sortBy, sortDesc, search } = payload
  // const moreParams = `&blacklist=${payload.blacklist}&level_id=${payload.level}&position_id=${payload.position}&status=${payload.status}&start_date=${payload.startDate}`
  const moreParams = `&start_date=${payload.startDate}&end_date=${payload.endDate}&position_id=${payload.position}&level_id=${payload.level}&blacklist=${payload.blacklist}&status=${payload.status}`
  return get(`/coupon-submission${queryParams(page, limit, sortBy, sortDesc, search)}${moreParams}`)
}


/**
 * Fetch Detail coupon submission
 * 
 * @param {*} id 
 * @returns
 */
export const getDetailCouponSubmissionAction = (id) => {
  return get(`/coupon-submission/${id}`)
}

/**
 * Reject Coupon Submission
 * 
 * @param {*} payload 
 * @returns
 */
export const rejectCouponSubmissionAction = (payload) => {
  return patch(`/coupon-submission/${payload.id}?&status=${payload.status}&reason=${payload.reason}`)
}

/**
 * Approve Coupon Submission 
 * 
 * @param {*} payload 
 * @returns
 */
export const approveCouponSubmissionAction = (payload) => {
  return patch(`/coupon-submission/${payload.id}?&status=${payload.status}&coupon_id=${payload.coupon_id}`)
}

/**
 * Approve Coupon Submission 
 * 
 * @param {*} payload 
 * @returns
 */
export const approveCouponSubmissionListAction = (payload) => {
  return patch(`/coupon-submission/${payload.id}?&status=${payload.status}&coupon_id=${payload.coupon_id}`)
}

/**
 * Reject Coupon Submission
 * 
 * @param {*} payload 
 * @returns
 */
export const rejectCouponSubmissionListAction = (payload) => {
  return patch(`/coupon-submission/${payload.id}?&status=${payload.status}&reason=${payload.reason}`)
}