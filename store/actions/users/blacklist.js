import {
  GET_BLACKLIST_REQUESTED,
  GET_DETAIL_BLACKLIST_REQUESTED,
  OPEN_BLACKLIST_REQUESTED
} from '@/store/constants'

/**
 * Get blacklist 
 * 
 * @params {*} payload 
 * @returns
 */
export const getBlacklist = (payload) => ({
  type: GET_BLACKLIST_REQUESTED,
  payload: payload
})

/**
 * Get Detail 
 * 
 * @param {*} id 
 * @returns
 */
export const getDetailBlacklist = (id) => ({
  type: GET_DETAIL_BLACKLIST_REQUESTED,
  payload: id
})

/**
 * Open blacklist 
 * 
 * @param {*} payload
 * @returns
 */
export const openBlacklist = (id, payload) => ({
  type: OPEN_BLACKLIST_REQUESTED,
  payload: {
    id: id,
    payload: payload
  }
})