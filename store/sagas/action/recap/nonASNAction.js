import { get } from '@/utils/interceptors'

/**
 *
 * GET NON-ASN RECAP
 *
 * @returns
 */
export const getNonASNRecapAction = () => {
  return get(`/recapitulations-nonasn`)
}

/**
 * GET NON-ASN CATEGORIES RECAP
 *
 * @param {*} id
 * @returns
 */
export const getNonASNRecapByCategoryAction = (id) => {
  return get(`/recapitulations-nonasn/${id}`)
}
