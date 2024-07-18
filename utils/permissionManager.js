import { decryptItem } from './crypt'

export const Access = {
  READ: 'read',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete'
}

export const PermissionsIDs = {
  RECAP_COMPOSITION: 1,
  RECAP_ASN: 2,
  RECAP_NON_ASN: 3,
  RECAP_OUTSOURCING: 4,
  RECAP_POSITION_MAPPING: 5,
  RECAP_COMPARE: 6,
  RECAP_PROMOTION: 7,
  EMPLOYEE_ASN: 8,
  EMPLOYEE_NON_ASN: 9,
  EMPLOYEE_OUTSOURCING: 10,
  HISTORY_POSITION: 11,
  HISTORY_GRADE: 12,
  HISTORY_STRUCTURAL: 14,
  HISTORY_FUNCTIONAL: 15,
  HISTORY_TECHNICAL: 16,
  HISTORY_AWARD: 17,
  HISTORY_SKP: 18,
  HISTORY_PERFORMANCE: 19,
  HISTORY_DISCIPLINARY: 20,
  MASTER_USER: 21,
  MASTER_ROLE: 22,
  MASTER_POSITION: 23,
  MASTER_GRADE: 24,
  MASTER_INSTITUTION: 25,
  MASTER_EMPLOYEE_TYPE: 26,
  // Parent Menu/Others
  EXPORT: 27,
  NOTES: 28,
  TALENT_POOL: 29
}

const userInfo = decryptItem(
  '__ui', process.env.NEXT_PUBLIC_USER_INFO_SERCRET_KEY
)

const permissions = userInfo?.permissions || []

const permissionsLookup = permissions?.reduce((acc, curr) => {
  acc[curr?.id] = curr
  return acc
}, {})

export const accessGranted = (id, access) => {
  const permission = permissionsLookup[id]
  return permission ? permission[access] === 1 : false
}