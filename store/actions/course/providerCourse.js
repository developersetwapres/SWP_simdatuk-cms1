import {
  GET_UPDATE_PROVIDER_REQUESTED,
  UPDATE_PROVIDER_BULK_REQUESTED
} from '@/store/constants'

/**
 * GET UPDATE PROVIDER
 * 
 * @returns 
 */

export const getUpdateProvider = () => ({
  type: GET_UPDATE_PROVIDER_REQUESTED
})

/**
 * Update bulk provider 
 * 
 * @param {*} id
 * @returns
 */
export const updateBulkProvider = (id) => ({
  type: UPDATE_PROVIDER_BULK_REQUESTED,
  payload: id
})