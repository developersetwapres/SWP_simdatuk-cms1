import { getBlob } from '@/utils/interceptors'

/**
 *
 * EXPORT DATA RECAP
 *
 * @returns
 */
export const getRecapExport = (payload) => {
  const type = payload
  return getBlob(`/export/recapitulations/${type}`)
}