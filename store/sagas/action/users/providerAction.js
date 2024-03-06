import { get, post, del, patch } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

/**
 * Get Provider 
 * 
 * @param {*} payload 
 * @returns
 */
export const getProviderAction = (payload) => {
  const { page, limit, sortBy, sortDesc, search } = payload
  return get(`/providers${queryParams(page, limit, sortBy, sortDesc, search)}`)
}

/**
 * Post Provider 
 * 
 * @param {*} payload 
 * @returns
 */
export const postProviderAction = (payload) => {
  return post(`/providers`, payload)
}

/**
 * Get Detail Provider 
 * 
 * @param {*} id 
 * @returns
 */
export const getDetailProviderAction = (id) => {
  return get(`/providers/${id}`)
}

/**
 * Update Provider 
 * 
 * @param {*} payload 
 * @returns
 */
export const updateProviderAction = (payload) => {
  return patch(`/providers`, payload)
}

/**
 * Delete Provider 
 * 
 * @param {*} id 
 * @returns
 */
export const deleteProviderAction = (id) => {
  return del(`/providers/${id}`)
}

/**
 * Delete List Provider 
 * 
 * @param {*} id 
 * @returns
 */
export const deleteListProviderAction = (id) => {
  return del(`/providers/${id}`)
}