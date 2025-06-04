import { get } from '@/utils/interceptors'

/**
 *
 * GET COMPOSITIONS
 *
 * @returns
 */
export const getCompositionsAction = () => {
  return get(`/recapitulations`)
}

/**
 * GET COMPOSITIONS CATEGORIES
 *
 * @param {*} id
 * @returns
 */
export const getCompositionsCategoriesAction = (id) => {
  return get(`/recapitulations/${id}`)
}
