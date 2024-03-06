import {
  GET_PROVIDER_REQUESTED,
  POST_PROVIDER_REQUESTED,
  UPDATE_PROVIDER_REQUESTED,
  GET_DETAIL_PROVIDER_REQUESTED,
  DELETE_PROVIDER_REQUESTED,
  DELETE_LIST_PROVIDER_REQUESTED
} from '@/store/constants'

/**
 * GET PROVIDER 
 * 
 * @param {*} payload 
 * @returns
 */
export const getProvider = (payload) => ({
  type: GET_PROVIDER_REQUESTED,
  payload: payload
})

/**
 * POST PROVIDER 
 * 
 * @param {*} payload 
 * @returns
 */
export const postProvider = (payload) => ({
  type: POST_PROVIDER_REQUESTED,
  payload: payload
})

/**
 * Update Provider 
 * 
 * @param {*} payload 
 * @returns
 */
export const updateProvider = (payload) => ({
  type: UPDATE_PROVIDER_REQUESTED,
  payload: payload
})

/**
 * GET DETAIL PROVIDER 
 * 
 * @param {*} id 
 * @returns
 */
export const getDetailProvider = (id) => ({
  type: GET_DETAIL_PROVIDER_REQUESTED,
  payload: id
})

/**
  * Detele Provider 
  * 
  * @param {*} id 
  * @returns
  */
export const deleteProvider = (id) => ({
  type: DELETE_PROVIDER_REQUESTED,
  payload: id
})

/**
 * Delete List Provider 
 * 
 * @param {*} id 
 * @returns
 */
export const deleteListProvider = (id) => ({
  type: DELETE_LIST_PROVIDER_REQUESTED,
  payload: id
})