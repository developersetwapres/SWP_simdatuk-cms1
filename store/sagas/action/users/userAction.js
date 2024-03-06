import { get, post, del, patch } from '@/utils/interceptors'
import { queryParams } from '@/utils/'



/**
 * 
 * GET USERS 
 * 
 * @param {*} payload 
 * @returns 
 */
export const getUserAction = (payload) => {
  const { page, limit, sortBy, sortDesc, search } = payload
  const moreParams = `&unit_id=${payload.unitId}&position_id=${payload.positionId}&level_id=${payload.levelId}&role_id=${payload.roleId}`
  return get(`/users${queryParams(page, limit, sortBy, sortDesc, search)}${moreParams}`)
}

/**
 * 
 * POST User
 * 
 * @param {*} payload 
 * @returns
 */
export const postUserAction = (payload) => {
  return post(`/users`, payload)
}

/**
 * Delete User 
 * 
 * @param {*} id 
 * @returns
 */
export const deleteUserAction = (id) => {
  return del(`/users/${id}`)
}

/**
 * GET DETAIL USER 
 * 
 * @param {*} id 
 * @returns 
 */
export const getDetailUserAction = (id) => {
  return get(`/users/${id}`)
}

/**
 * Update User
 * 
 * @param {*} id 
 * @param {*} body 
 * @returns
 */
export const updateUserAction = (payload) => {
  return patch(`/users/${payload.id}`, payload.body)
}

export const getUserInformationAction = () => {
  return get('/auth/me')
}

/**
 * Get Course User 
 * 
 * @param {*} id 
 * @returns
 */
export const getUserCourseAction = (id) => {
  const moreParams = `&user_id=${id}`
  return post(`/admin/course/list${queryParams(1, 1000, '', '', '')}${moreParams}`)
}