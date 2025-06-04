import { get } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

const basePath = '/residences'

/**
 * Get Residences Action
 *
 * @param {*} payload
 * @returns
 */
export const getResidencesAction = (payload) => {
  const { page, limit, search } = payload
  return get(`${basePath}${queryParams(page, limit, search)}`)
}
