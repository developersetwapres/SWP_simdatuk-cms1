import {
  GET_ASN_RECAP_REQUESTED,
  GET_ASN_RECAP_CATEGORY_REQUESTED
} from '../../constants'

/**
 * Get ASN Recap
 *
 * @returns
 */
export const getASNRecap = () => ({
  type: GET_ASN_RECAP_REQUESTED
})

/**
 * Get ASN Recap by Categories
 *
 * @param {*} payload
 * @returns
 */
export const getASNRecapByCategory = (payload) => ({
  type: GET_ASN_RECAP_CATEGORY_REQUESTED,
  payload: payload
})