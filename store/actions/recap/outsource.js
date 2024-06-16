import {
  GET_OUTSOURCE_RECAP_REQUESTED,
  GET_OUTSOURCE_RECAP_CATEGORY_REQUESTED
} from '../../constants'

/**
 * Get Outsource Recap
 *
 * @returns
 */
export const getOutsourceRecap = () => ({
  type: GET_OUTSOURCE_RECAP_REQUESTED
})

/**
 * Get Outsource Recap by Categories
 *
 * @param {*} payload
 * @returns
 */
export const getOutsourceRecapByCategory = (payload) => ({
  type: GET_OUTSOURCE_RECAP_CATEGORY_REQUESTED,
  payload: payload
})