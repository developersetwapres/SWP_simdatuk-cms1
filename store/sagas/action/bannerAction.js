import { get, del, post, patch } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

const basePath = '/banners'

/**
 * GET BANNERS ACTION 
 * 
 * @param {*} payload 
 * @returns
 */
export const getBannersAction = (payload) => {
  const { page, limit, sortBy, sortDesc, search } = payload
  const moreParams = `&status=${payload.status}&type=${payload.type}`
  return get(`/admin${basePath}${queryParams(page, limit, sortBy, sortDesc, search)}${moreParams}`)
}

/**
 * Delete banner action 
 * 
 * @param {*} id 
 * @returns
 */
export const deleteBannerAction = (id) => {
  return del(`${basePath}/${id}`)
}

/**
 * Post Banner action 
 * 
 * @param {*} payload 
 * @returns
 */
export const postBannerAction = (payload) => {
  return post(`${basePath}`, payload)
}

/**
 * Get banner detail
 * 
 * @param {*} id 
 * @returns
 */
export const getBannerAction = (id) => {
  return get(`${basePath}/${id}`)
}

/**
 * Update Banner 
 * 
 * @param {*} payload 
 * @returns
 */
export const updateBannerAction = (payload) => {
  return patch(`${basePath}`, payload)
}

/**
 * Delete Banner List 
 * 
 * @param {*} id 
 * @returns
 */
export const deleteBannerListAction = (id) => {
  return del(`${basePath}/${id}`)
}

/**
 * Get Sort Banner 
 * 
 * @returns
 */
export const getSortBannerAction = () => {
  return get(`${basePath}?&status=true`)
}

/**
 * Patch Sort Banner 
 * 
 * @param {*} payload 
 * @returns
 */
export const patchSortBannerAction = (payload) => {
  return patch(`/banner-position`, payload)
}