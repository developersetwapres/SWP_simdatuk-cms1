import {
  GET_NOTES_REQUESTED,
  UPDATE_NOTES_REQUESTED
} from '../../constants'

/**
 * Get Notes by User ID
 *
 * @param {*} payload
 * @returns
 */
export const getNotesByUserID = (payload) => ({
  type: GET_NOTES_REQUESTED,
  payload
})

/**
 * Update Notes by User ID
 *
 * @param {*} payload
 * @returns
 */
export const updateNotesByUserID = (payload) => ({
  type: UPDATE_NOTES_REQUESTED,
  payload
})