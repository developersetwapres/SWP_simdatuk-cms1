import {
  GET_NON_ASN_RECAP_REQUESTED,
  GET_NON_ASN_RECAP_CATEGORY_REQUESTED
} from '../../constants'

/**
 * Get Non-ASN Recap
 *
 * @returns
 */
export const getNonASNRecap = () => ({
  type: GET_NON_ASN_RECAP_REQUESTED
})

/**
 * Get Non-ASN Recap by Categories
 *
 * @param {*} payload
 * @returns
 */
export const getNonASNRecapByCategory = (payload) => ({
  type: GET_NON_ASN_RECAP_CATEGORY_REQUESTED,
  payload: payload
})