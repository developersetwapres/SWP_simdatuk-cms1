import {
  GET_EDITOR_CHOICE_REQUESTED,
  POST_EDITOR_CHOICE_REQUESTED,
  GET_LIST_EDITOR_REQUESTED
} from '@/store/constants'

/**
 * GET EDITOR CHOCICE 
 * 
 * @returns
 */
export const getEditorChocie = (payload) => ({
  type: GET_EDITOR_CHOICE_REQUESTED,
  payload: payload
})

/**
 * Post Editor Choice
 * 
 * @param {*} payload
 * @returns
 */
export const postEditorChoice = (payload) => ({
  type: POST_EDITOR_CHOICE_REQUESTED,
  payload: payload
})


/**
 * Get Editor List 
 * 
 * @returns
 */
export const getListEditorChoice = () => ({
  type: GET_LIST_EDITOR_REQUESTED
})