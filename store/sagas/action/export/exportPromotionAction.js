import { post } from '@/utils/interceptors'

const basePath = '/export/comparison-promotions'

/**
 * Export Promotion Users
 *
 * @param {*} payload
 * @returns
 */
export const exportPromotionUsersAction = (payload) => {
  return post(`${basePath}`, payload, {
    responseType: 'blob'
  })
}
