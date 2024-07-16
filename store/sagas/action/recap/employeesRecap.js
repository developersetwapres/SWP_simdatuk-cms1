import { get } from '@/utils/interceptors'

const basePath = '/recapitulations-employee'

/**
 * Get Employees Recapitulations Action
 *
 * @param {*} payload
 * @returns
 */
export const getEmployeesRecapAction = (payload) => {
  const { page, sectionId, categoryId, cardId } = payload
  const moreParams = `?page=${page}&section_id=${sectionId}&card_id=${cardId}&category_id=${categoryId}`
  return get(`${basePath}${moreParams}`)
}
