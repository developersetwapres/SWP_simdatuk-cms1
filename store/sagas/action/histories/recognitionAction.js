import { get, del, post } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

const basePath = '/recognition-histories'

/**
 * GET Recognitions ACTION
 *
 * @param {*} payload
 * @returns
 */
export const getRecognitionsAction = (payload) => {
  const { page, limit, search, type } = payload
  const moreParams = type ? `&type=${type}` : ''
  return get(`${basePath}${queryParams(page, limit, search)}${moreParams}`)
}

/**
 * Get Recognition detail
 *
 * @param {*} id
 * @returns
 */
export const getRecognitionAction = (id) => {
  return get(`${basePath}/${id}`)
}

/**
 * Delete Recognition action
 *
 * @param {*} id
 * @returns
 */
export const deleteRecognitionAction = (id) => {
  return del(`${basePath}/${id}`)
}

/**
 * Post Recognition action
 *
 * @param {*} payload
 * @returns
 */
export const postRecognitionAction = (payload) => {
  return post(`${basePath}`, payload)
}

/**
 * Update Recognition
 *
 * @param {*} payload
 * @returns
 */
export const updateRecognitionAction = (payload) => {
  return post(`${basePath}/${payload?.id}`, payload?.data)
}
