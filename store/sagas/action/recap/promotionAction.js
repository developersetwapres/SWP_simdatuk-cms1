import { get, post } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

/**
 *
 * GET UNOCCUPIED POSITIONS
 *
 * @returns
 */
export const getUnoccupiedPositionsAction = () => {
  return get(`/promotions`)
}

/**
 *
 * GET UNOCCUPIED POSITIONS DETAIL
 *
 * @returns
 */
export const getUnoccupiedPositionsDetailAction = (payload) => {
  return get(`/promotions/detail`, payload)
}

/**
 * GET USERS BRIEFLY
 *
 * @param {*} payload
 * @returns
 */
export const getBriefEmployeesAction = (payload) => {
  const { page, limit, search, data } = payload
  return get(`/comparisons${queryParams(page, limit, search)}`, data)
}

/**
 * GET COMPARE USERS DETAIL
 *
 * @param {*} payload
 * @returns
 */
export const getEmployeesCompareAction = (payload) => {
  return get(`/comparisons/detail`, payload)
}

/**
 * GET PROMOTION USERS DETAIL
 *
 * @param {*} payload
 * @returns
 */
export const getEmployeesPromotionAction = (payload) => {
  return get(`/comparisons/detail-promotions`, payload)
}
