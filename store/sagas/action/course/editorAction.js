import { get, post } from '@/utils/interceptors'
import { queryParams } from '@/utils/'

/**
 * Get Editor CHocie 
 * 
 * @returns
 */
export const getEditorChoiceAction = (payload) => {
  return post(`/admin/course/list`, payload)
}

/**
 * Post editor Choice
 * 
 * @param {*} payload
 * @returns
 */
export const postEditorChoiceAction = (payload) => {
  return post(`/editor-choice-course`, payload)
}

/**
 * Get List Editor Choice 
 * 
 * @returns
 */
export const getListEditorChoiceAction = () => {
  return get(`/editor-choice-course${queryParams(1, 1000, '', '', '')}`)
}