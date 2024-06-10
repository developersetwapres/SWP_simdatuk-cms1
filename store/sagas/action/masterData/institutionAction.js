import { get, del, post } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

const basePath = '/institutions'

/**
 * GET Institutions ACTION
 *
 * @param {*} payload
 * @returns
 */
export const getInstitutionsAction = (payload) => {
  const { page, limit, search } = payload
  return get(`${basePath}${queryParams(page, limit, search)}`)
}

/**
 * Get Institution detail
 *
 * @param {*} id
 * @returns
 */
export const getInstitutionAction = (id) => {
  return get(`${basePath}/${id}`)
}

/**
 * Delete Institution action
 *
 * @param {*} id
 * @returns
 */
export const deleteInstitutionAction = (payload) => {
  return del(`${basePath}/${payload?.id}`, payload?.data)
}

/**
 * Post Institution action
 *
 * @param {*} payload
 * @returns
 */
export const postInstitutionAction = (payload) => {
  return post(`${basePath}`, payload)
}

/**
 * Update Institution
 *
 * @param {*} payload
 * @returns
 */
export const updateInstitutionAction = (payload) => {
  return post(`${basePath}/${payload?.id}`, payload?.data)
}
