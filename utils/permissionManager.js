import { decryptItem } from './crypt'

export const getPermissions = (navigation) => {
  const permissions = []

  for (const item of navigation) {
    if (item?.permissionID === PermissionsIDs.EXPORT) {
      permissions.push({ path: item?.path, permissionID: item?.permissionID })
    }
    if (item?.children?.length > 0) {
      for (const child of item.children) {
        permissions.push({ path: child?.path, permissionID: child?.permissionID })
      }
    }
  }

  return permissions
}

export const getFirstNPath = (realPath, pathSegmentsCount = 3) => {
  return realPath?.split('/')?.splice(0, pathSegmentsCount)?.join('/')
}

export const getUserPermissionIDByPath = (path, navigation) => {
  const permissions = getPermissions(navigation)
  const permissionsLookup = new Map(permissions.map(i => [i?.path, i?.permissionID]))
  return permissionsLookup.get(getFirstNPath(path, 3))
}

export const accessGranted = (nameAsID, access) => {
  const permission = decryptItem(
    '__ui',
    process.env.NEXT_PUBLIC_USER_INFO_SERCRET_KEY
  )
    ?.permissions
    ?.find(item => item?.name === nameAsID)

  return permission ? permission[access] === 1 : false
}

export const Access = {
  READ: 'read',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete'
}

export const PermissionsIDs = {
  RECAP_COMPOSITION: 'Rekapitulasi - Komposisi Pegawai',
  RECAP_ASN: 'Rekapitulasi - Pegawai ASN',
  RECAP_NON_ASN: 'Rekapitulasi - Pegawai Non ASN',
  RECAP_OUTSOURCING: 'Rekapitulasi - Pegawai Outsourcing',
  RECAP_POSITION_MAPPING: 'Rekapitulasi - Peta Jabatan',
  RECAP_COMPARE: 'Rekapitulasi - Bandingkan Pegawai',
  RECAP_PROMOTION: 'Rekapitulasi - Promosi Pegawai',
  EMPLOYEE_ASN: 'Data Pegawai - ASN',
  EMPLOYEE_NON_ASN: 'Data Pegawai - Non ASN',
  EMPLOYEE_OUTSOURCING: 'Data Pegawai - Outsourcing',
  HISTORY_POSITION: 'Data Riwayat - Jabatan',
  HISTORY_GRADE: 'Data Riwayat - Golongan',
  HISTORY_STRUCTURAL: 'Data Riwayat - Pelatihan Struktural',
  HISTORY_FUNCTIONAL: 'Data Riwayat - Pelatihan Fungsional',
  HISTORY_TECHNICAL: 'Data Riwayat - Pelatihan Teknis',
  HISTORY_AWARD: 'Data Riwayat - Penghargaan',
  HISTORY_SKP: 'Data Riwayat - SKP',
  HISTORY_PERFORMANCE: 'Data Riwayat - Penilaian Prestasi Kerja',
  HISTORY_DISCIPLINARY: 'Data Riwayat - Hukuman Disiplin',
  MASTER_USER: 'Master Data - Data Pengguna',
  MASTER_ROLE: 'Master Data - Data Role Pengguna',
  MASTER_POSITION: 'Master Data - Data Jabatan',
  MASTER_GRADE: 'Master Data - Data Golongan',
  MASTER_INSTITUTION: 'Master Data - Data Instansi',
  MASTER_EMPLOYEE_TYPE: 'Master Data - Jenis Pegawai',
  // Parent Menu/Features
  EXPORT: 'Export',
  NOTES: 'Catatan',
  TALENT_POOL: 'Hasil Talent Pool'
}