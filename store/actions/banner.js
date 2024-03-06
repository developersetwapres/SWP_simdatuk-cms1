import {
  GET_BANNERS_REQUESTED,
  DELETE_BANNER_REQUESTED,
  POST_BANNER_REQUESTED,
  GET_BANNER_REQUESTED,
  UPDATE_BANNER_REQUESTED,
  DELETE_LIST_BANNER_REQUESTED,
  GET_SORT_BANNER_REQUESTED,
  PATCH_SORT_BANNER_REQUESTED
} from '../constants'

/**
 * Get Banners 
 * 
 * @param {*} payload 
 * @returns
 */
export const getBanners = (payload) => ({
  type: GET_BANNERS_REQUESTED,
  payload: payload
})


/**
 * Delete Banner
 * 
 * @param {*} id 
 * @returns
 */
export const deleteBanner = (id) => ({
  type: DELETE_BANNER_REQUESTED,
  payload: id
})

/**
 * Post Banner 
 * 
 * @param {*} payload 
 * @returns
 */
export const postBanner = (payload) => ({
  type: POST_BANNER_REQUESTED,
  payload: payload
})

/**
 * Get Banner 
 * 
 * @param {*} id 
 * @returns
 */
export const getBanner = (id) => ({
  type: GET_BANNER_REQUESTED,
  payload: id
})

/**
 * Update Banner 
 * 
 * @param {*} payload 
 * @returns
 */
export const updateBanner = (payload) => ({
  type: UPDATE_BANNER_REQUESTED,
  payload: payload
})

/**
 * Delete List Banner 
 * 
 * @param {*} id 
 * @returns
 */
export const deleteListBanner = (id) => ({
  type: DELETE_LIST_BANNER_REQUESTED,
  payload: id
})

/**
 * Get Sort Banner 
 * 
 * @returns
 */
export const getSortBanner = () => ({
  type: GET_SORT_BANNER_REQUESTED
})

/**
 * Patch Sort Banner 
 * 
 * @param {*} payload
 * @returns
 */
export const patchSortBanner = (payload) => ({
  type: PATCH_SORT_BANNER_REQUESTED,
  payload: payload
})