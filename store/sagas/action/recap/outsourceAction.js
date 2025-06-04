import { get } from '@/utils/interceptors'

/**
 *
 * GET OUTSOURCE RECAP
 *
 * @returns
 */
export const getOutsourceRecapAction = () => {
  return get(`/recapitulations-outsource`)
}

/**
 * GET OUTSOURCE CATEGORIES RECAP
 *
 * @param {*} id
 * @returns
 */
export const getOutsourceRecapByCategoryAction = (id) => {
  return get(`/recapitulations-outsource/${id}`)
}
