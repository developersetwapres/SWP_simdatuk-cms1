import { CLEAR_EXPORT_PROMOTION_STATE, EXPORT_PROMOTION_REQUESTED } from '@/store/constants'

/**
 * Export Users Promotion
 *
 * @param {*} payload
 * @returns
 */
export const exportPromotionUsers = (payload) => ({
  type: EXPORT_PROMOTION_REQUESTED,
  payload
})

/**
 * Clear Export Promotion State
 *
 * @returns
 */
export const clearExportPromotionState = () => ({
  type: CLEAR_EXPORT_PROMOTION_STATE
})
