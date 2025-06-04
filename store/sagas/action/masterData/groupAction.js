import { get } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

const basePath = '/groups'

/**
 * Get Groups Action
 *
 * @param {*} payload
 * @returns
 */
export const getGroupsAction = (payload) => {
  const { page, limit, search } = payload
  return get(`${basePath}${queryParams(page, limit, search)}`)
}
