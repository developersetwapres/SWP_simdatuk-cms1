import { get, del, post } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

const basePath = '/grade-histories'

/**
 * GET GRADES OPTIONS ACTION
 *
 * @param {*} payload
 * @returns
 */
export const getGradesOptionsAction = (payload) => {
  const { page, limit, search } = payload
  return get(`/grades${queryParams(page, limit, search)}`)
}

/**
 * GET GRADES ACTION
 *
 * @param {*} payload
 * @returns
 */
export const getGradesAction = (payload) => {
  const { page, limit, search, type } = payload
  const moreParams = type ? `&type=${type}` : ''
  return get(`${basePath}${queryParams(page, limit, search)}${moreParams}`)
}

/**
 * Get Grade detail
 *
 * @param {*} id
 * @returns
 */
export const getGradeAction = (id) => {
  return get(`${basePath}/${id}`)
}

/**
 * Delete Grade action
 *
 * @param {*} id
 * @returns
 */
export const deleteGradeAction = (id) => {
  return del(`${basePath}/${id}`)
}

/**
 * Post Grade action
 *
 * @param {*} payload
 * @returns
 */
export const postGradeAction = (payload) => {
  return post(`${basePath}`, payload)
}

/**
 * Update Grade
 *
 * @param {*} payload
 * @returns
 */
export const updateGradeAction = (payload) => {
  return post(`${basePath}/${payload?.id}`, payload?.data)
}
