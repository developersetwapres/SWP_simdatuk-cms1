import { get, del, post, patch } from '@/utils/interceptors'

/**
 * 
 * GET Course 
 * 
 * @param {*} payload 
 * @returns
 */
export const getCourseAction = (payload) => {
  return post(`/admin/course/list`, payload)
}

/**
 * 
 * Delete Course 
 * 
 * @param {*} id
 * @returns
 */
export const deleteCourseAction = (id) => {
  return del(`/courses/${id}`)
}

/**
 * 
 * Post Course 
 * 
 * @param {*} payload 
 * @returns 
 */
export const postCourseAction = (payload) => {
  return post(`/courses`, payload)
}

/**
 * Delete course list 
 * 
 * @param {*} id 
 * @returns
 */
export const deleteListCourseAction = (id) => {
  return del(`/courses/${id}`)
}


/**
 * Get Course detail 
 * 
 * @param {*} id 
 * @returns
 */
export const getDetailCourseAction = (id) => {
  return get(`/admin/courses/${id}`)
}

/**
 * Update Course 
 * 
 * @param {*} payload 
 * @returns
 */
export const updateCourseAction = (payload) => {
  return patch(`/courses`, payload)
}

/**
 * Post bulk course 
 * 
 * @param {*} payload 
 * @returns
 */
export const bulkCourseAction = (payload) => {
  Object.keys(payload).forEach(key => {
    if (payload[key] === null || payload[key] === undefined || payload[key] === '' || payload[key].length === 0) {
      delete payload[key]
    }
  })
  return patch(`/courses-bulk`, payload)
}

/**
 * Filter COurse
 * 
 * @param {*} id 
 * @returns
 */
export const filterCourseAction = (id) => {
  return get(`/course/categories/${id}?with_topics=true`)
}