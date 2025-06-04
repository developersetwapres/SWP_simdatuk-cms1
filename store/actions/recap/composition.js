import {
  GET_COMPOSITION_REQUESTED,
  GET_COMPOSITION_CATEGORY_REQUESTED
} from '../../constants'

/**
 * Get Composition
 *
 * @returns
 */
export const getCompositions = () => ({
  type: GET_COMPOSITION_REQUESTED
})

/**
 * Get Composition Categories
 *
 * @param {*} payload
 * @returns
 */
export const getCompositionsCategories = (payload) => ({
  type: GET_COMPOSITION_CATEGORY_REQUESTED,
  payload: payload
})