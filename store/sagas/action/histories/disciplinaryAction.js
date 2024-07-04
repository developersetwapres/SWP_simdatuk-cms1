import { get, del, post } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

const basePath = '/disciplinary-histories'

/**
 * Get Disciplinaries Options Action
 *
 * @param {*} payload
 * @returns
 */
export const getDisciplinariesOptionsAction = (payload) => {
  const { page, limit, search } = payload
  return get(`/disciplinaries${queryParams(page, limit, search)}`)
}

/**
 * Get Disciplinaries Action
 *
 * @param {*} payload
 * @returns
 */
export const getDisciplinariesAction = (payload) => {
  const { page, limit, search, type } = payload
  const moreParams = type ? `&type=${type}` : ''
  return get(`${basePath}${queryParams(page, limit, search)}${moreParams}`)
}

/**
 * Get Disciplinary detail
 *
 * @param {*} id
 * @returns
 */
export const getDisciplinaryAction = (id) => {
  return get(`${basePath}/${id}`)
}

/**
 * Delete Disciplinary action
 *
 * @param {*} id
 * @returns
 */
export const deleteDisciplinaryAction = (id) => {
  return del(`${basePath}/${id}`)
}

/**
 * Post Disciplinary action
 *
 * @param {*} payload
 * @returns
 */
export const postDisciplinaryAction = (payload) => {
  return post(`${basePath}`, payload)
}

/**
 * Update Disciplinary
 *
 * @param {*} payload
 * @returns
 */
export const updateDisciplinaryAction = (payload) => {
  return post(`${basePath}/${payload?.id}`, payload?.data)
}
