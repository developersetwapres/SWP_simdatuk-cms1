import { get, del, post } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

const basePath = '/training-histories'

/**
 * GET Trainings ACTION
 *
 * @param {*} payload
 * @returns
 */
export const getTrainingsAction = (payload) => {
  const { page, limit, search, type } = payload
  const moreParams = type ? `&type=${type}` : ''
  return get(`${basePath}${queryParams(page, limit, search)}${moreParams}`)
}

/**
 * GET Levels
 *
 * @param {*} payload
 * @returns
 */
export const getLevelsAction = (payload) => {
  const { page, limit, search, type } = payload
  const typeParam = type === 1 ? 'structural' : 'functional'
  return get(`${basePath}/levels/${typeParam}${queryParams(page, limit, search)}`)
}

/**
 * GET Clusters
 *
 * @param {*} payload
 * @returns
 */
export const getClustersAction = (payload) => {
  const { page, limit, search } = payload
  return get(`${basePath}/groups${queryParams(page, limit, search)}`)
}

/**
 * Get Training detail
 *
 * @param {*} id
 * @returns
 */
export const getTrainingAction = (id) => {
  return get(`${basePath}/${id}`)
}

/**
 * Delete Training action
 *
 * @param {*} id
 * @returns
 */
export const deleteTrainingAction = (id) => {
  return del(`${basePath}/${id}`)
}

/**
 * Post Training action
 *
 * @param {*} payload
 * @returns
 */
export const postTrainingAction = (payload) => {
  return post(`${basePath}`, payload)
}

/**
 * Update Training
 *
 * @param {*} payload
 * @returns
 */
export const updateTrainingAction = (payload) => {
  return post(`${basePath}/${payload?.id}`, payload?.data)
}
