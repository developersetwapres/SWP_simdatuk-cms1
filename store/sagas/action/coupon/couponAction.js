import { get, post, del, patch } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

/**
 * Get coupon
 * 
 * @param {*} payload 
 * @returns
 */
export const getCouponAction = (payload) => {
  const { page, limit, sortBy, sortDesc, search } = payload
  const moreParams = `&with_topics=false&provider_id=${payload.providerId}&start_date=${payload.startDate}&end_date=${payload.endDate}&status=${payload.status}`
  return get(`/coupon${queryParams(page, limit, sortBy, sortDesc, search)}${moreParams}`)
}

/**
 * Get detail 
 * 
 * @param {*} id 
 * @returns
 */
export const getDetailCouponAction = (id) => {
  return get(`/coupon/${id}`)
}

/**
 * Post Coupon 
 * 
 * @param {*} payload 
 * @returns
 */
export const postCouponAction = (payload) => {
  return post(`/coupon`, payload)
}

/**
 * Delete Coupon 
 * 
 * @param {*} id
 * @returns
 */
export const deleteCouponAction = (id) => {
  return del(`/coupon/${id}`)
}


/**
 * Update Coupon 
 * 
 * @param {*} payload 
 * @returns
 */
export const updateCouponAction = (payload) => {
  return patch(`/coupon`, payload)
}

/**
 * Delete Coupon List 
 * 
 * @param {*} id 
 * @returns
 */
export const deleteCouponListAction = (id) => {
  return del(`/coupon/${id}`)
}