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
  return post(`/promotions/users${queryParams(page, limit, search)}`, data)
}
