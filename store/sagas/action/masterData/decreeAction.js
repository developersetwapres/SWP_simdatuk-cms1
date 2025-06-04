import { get } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

const basePath = '/decrees'

/**
 * Get Decrees Action
 *
 * @param {*} payload
 * @returns
 */
export const getDecreesAction = (payload) => {
  const { page, limit, search } = payload
  return get(`${basePath}${queryParams(page, limit, search)}`)
}
