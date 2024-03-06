import { get, del, post, patch } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

/**
 * 
 * Get Course Category 
 * 
 * @param {*} payload 
 * @returns
 */
export const getCategoryCourseAction = (payload) => {
  const { page, limit, sortBy, sortDesc, search } = payload
  const moreParams = '&with_topics=true'
  return get(`/course/categories${queryParams(page, limit, sortBy, sortDesc, search)}${moreParams}`)
}

/**
 * Delete Course Category 
 * 
 * @param {*} id 
 * @returns
 */
export const deleteCourseCategoryAction = (id) => {
  return del(`/course/categories/${id}`)
}

/**
 * Get Category by id 
 * 
 * @param {*} id 
 * @returns
 */
export const getCategoryCourseByIdAction = (id) => {
  return get(`/course/categories/${id}?with_topics=true`)
}

/**
 * Post Category 
 * 
 * @param {*} payload
 * @returns
 */
export const postCategoryAction = (payload) => {
  return post(`/course/categories`, payload)
}

/**
 * Delete List Course Category 
 * 
 * @param {*} id 
 * @returns
 */
export const deleteCourseCategoryListAction = (id) => {
  return del(`/course/categories/${id}`)
}

/**
 * Update Course Category 
 * 
 * @param {*} payload
 * @returns
 */
export const updateCourseCategoryAction = (payload) => {
  return patch(`/course/categories`, payload)
}

/**
 * Get Program PKASN 
 * 
 * @returns
 */
export const getProgramPKASNAction = () => {
  return get(`pkasn-program`)
}