import { get } from '@/utils/interceptors'

/**
 *
 * GET ASN RECAP
 *
 * @returns
 */
export const getASNRecapAction = () => {
  return get(`/recapitulations-asn`)
}

/**
 * GET ASN CATEGORIES RECAP
 *
 * @param {*} id
 * @returns
 */
export const getASNRecapByCategoryAction = (id) => {
  return get(`/recapitulations-asn/${id}`)
}
