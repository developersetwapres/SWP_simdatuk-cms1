import { get } from '@/utils/interceptors'

const basePath = '/diagrams'

/**
 * Get Diagram Action
 *
 * @param {*} payload
 * @returns
 */
export const getDiagramsAction = (id) => {
  return get(`${basePath}?id=${id}`)
}
