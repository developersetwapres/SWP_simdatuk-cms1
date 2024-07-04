import { get, post } from '@/utils/interceptors'

/**
 *
 * GET NOTES BY USER ID
 *
 * @param {*} id
 * @returns
 */
export const getNotesByUserIDAction = (id) => {
  return get(`/notes/${id}`)
}

/**
 * UPDATE NOTES BY USER ID
 *
 * @param {*} payload
 * @returns
 */
export const updateNotesByUserIDAction = (payload) => {
  const { id, data } = payload
  return post(`/notes/${id}`, data)
}
