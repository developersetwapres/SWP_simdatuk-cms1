import { get, post } from '@/utils/interceptors'

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

/**
 * Export Diagram Action
 *
 * @param {*} payload
 * @returns
 */
export const exportDiagramsAction = () => {
  return get(`${basePath}/export`)
}
