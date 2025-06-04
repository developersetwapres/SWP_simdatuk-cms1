import { getBlob } from '@/utils/interceptors'

const basePath = '/diagrams/export'

/**
 * Export Diagram Action
 *
 * @param {*} payload
 * @returns
 */
export const exportDiagramsAction = () => {
  return getBlob(basePath)
}
