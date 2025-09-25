import React from 'react'
import { FaDatabase } from 'react-icons/fa'
import { Box } from '@mui/material'
import {
  Dashboard,
  GetApp,
  Groups,
  Logout,
  PieChart,
  ViewCarousel
} from '@mui/icons-material'
import { PermissionsIDs } from '@/utils/permissionManager'

const navigation = [
  {
    name: 'DASHBOARD',
    path: '/dashboard',
    icon: <PieChart sx={{ maxWidth: 20, fontSize: '20px', color: '#fff' }} />
  },
  {
    name: 'REKAPITULASI',
    icon: <Dashboard sx={{ maxWidth: 20, fontSize: '20px', color: '#fff' }} />,
    children: [
      {
        path: '/rekapitulasi/komposisi-pegawai',
        name: 'KOMPOSISI PEGAWAI',
        icon: null,
        permissionID: PermissionsIDs?.RECAP_COMPOSITION
      },
      {
        path: '/rekapitulasi/pegawai-asn',
        name: 'PEGAWAI ASN',
        icon: null,
        permissionID: PermissionsIDs?.RECAP_ASN
      },
      {
        path: '/rekapitulasi/pegawai-non-asn',
        name: 'PEGAWAI NON ASN + PERBANTUAN',
        icon: null,
        permissionID: PermissionsIDs?.RECAP_NON_ASN
      },
      {
        path: '/rekapitulasi/pegawai-outsourcing',
        name: 'PEGAWAI OUTSOURCING',
        icon: null,
        permissionID: PermissionsIDs?.RECAP_OUTSOURCING
      },
      {
        path: '/rekapitulasi/peta-jabatan',
        name: 'PETA JABATAN',
        permissionID: PermissionsIDs?.RECAP_POSITION_MAPPING
      },
      {
        path: '/rekapitulasi/bandingkan-pegawai',
        name: 'BANDINGKAN PEGAWAI',
        permissionID: PermissionsIDs?.RECAP_COMPARE
      },
      {
        path: '/rekapitulasi/promosi-pegawai',
        name: 'PROMOSI PEGAWAI',
        permissionID: PermissionsIDs?.RECAP_PROMOTION
      }
    ]
  },
  {
    name: 'DATA PEGAWAI',
    icon: <Groups sx={{ maxWidth: 20, fontSize: '20px', color: '#fff' }} />,
    children: [
      {
        path: '/data-pegawai/asn',
        name: 'ASN',
        icon: null,
        permissionID: PermissionsIDs?.EMPLOYEE_ASN
      },
      {
        path: '/data-pegawai/non-asn',
        name: 'NON ASN + PERBANTUAN',
        icon: null,
        permissionID: PermissionsIDs?.EMPLOYEE_NON_ASN
      },
      {
        path: '/data-pegawai/outsourcing',
        name: 'OUTSOURCING',
        icon: null,
        permissionID: PermissionsIDs?.EMPLOYEE_OUTSOURCING
      }
    ]
  },
  {
    name: 'DATA RIWAYAT',
    icon: (
      <ViewCarousel
        fontSize='meduilarge'
        sx={{
          maxWidth: 20,
          fontSize: '20px',
          color: '#fff'
        }}
      />
    ),
    children: [
      {
        path: '/data-riwayat/jabatan',
        name: 'JABATAN',
        icon: null,
        permissionID: PermissionsIDs?.HISTORY_POSITION
      },
      {
        path: '/data-riwayat/golongan',
        name: 'GOLONGAN',
        icon: null,
        permissionID: PermissionsIDs?.HISTORY_GRADE
      },
      {
        path: '/data-riwayat/pelatihan-struktural',
        name: 'PELATIHAN STRUKTURAL',
        icon: null,
        permissionID: PermissionsIDs?.HISTORY_STRUCTURAL
      },
      {
        path: '/data-riwayat/pelatihan-fungsional',
        name: 'PELATIHAN FUNGSIONAL',
        icon: null,
        permissionID: PermissionsIDs?.HISTORY_FUNCTIONAL
      },
      {
        path: '/data-riwayat/pelatihan-teknis',
        name: 'PELATIHAN TEKNIS',
        icon: null,
        permissionID: PermissionsIDs?.HISTORY_TECHNICAL
      },
      {
        path: '/data-riwayat/penghargaan',
        name: 'PENGHARGAAN',
        icon: null,
        permissionID: PermissionsIDs?.HISTORY_AWARD
      },
      {
        path: '/data-riwayat/skp',
        name: 'SKP',
        icon: null,
        permissionID: PermissionsIDs?.HISTORY_SKP
      },
      {
        path: '/data-riwayat/ppk',
        name: 'PENILAIAN PRESTASI KERJA',
        icon: null,
        permissionID: PermissionsIDs?.HISTORY_PERFORMANCE
      },
      {
        path: '/data-riwayat/hukuman-disiplin',
        name: 'HUKUMAN DISIPLIN',
        icon: null,
        permissionID: PermissionsIDs?.HISTORY_DISCIPLINARY
      }
    ]
  },
  {
    name: 'MASTER DATA',
    icon: (
      <Box
        maxWidth={20}
        width={20}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <FaDatabase size={15} color='#fff' />
      </Box>
    ),
    children: [
      {
        path: '/master-data/user',
        name: 'DATA PENGGUNA',
        icon: null,
        permissionID: PermissionsIDs?.MASTER_USER
      },
      {
        path: '/master-data/role',
        name: 'DATA ROLE PENGGUNA',
        icon: null,
        permissionID: PermissionsIDs?.MASTER_ROLE
      },
      {
        path: '/master-data/position',
        name: 'DATA JABATAN',
        icon: null,
        permissionID: PermissionsIDs?.MASTER_POSITION
      },
      {
        path: '/master-data/group',
        name: 'DATA GOLONGAN',
        icon: null,
        permissionID: PermissionsIDs?.MASTER_GRADE
      },
      {
        path: '/master-data/institution',
        name: 'DATA INSTANSI',
        icon: null,
        permissionID: PermissionsIDs?.MASTER_INSTITUTION
      },
      {
        path: '/master-data/employment-type',
        name: 'DATA JENIS PEGAWAI',
        icon: null,
        permissionID: PermissionsIDs?.MASTER_EMPLOYEE_TYPE
      }
    ]
  },
  {
    name: 'EXPORT',
    icon: <GetApp sx={{ maxWidth: 20, fontSize: '20px', color: '#fff' }} />,
    permissionID: PermissionsIDs?.EXPORT,
    children: [
      {
        path: '/export/employee',
        name: 'EXPORT PEGAWAI',
        icon: null,
        permissionID: PermissionsIDs?.EXPORT
      },
      {
        path: '/export/drh',
        name: 'EXPORT DRH',
        icon: null,
        permissionID: PermissionsIDs?.EXPORT
      }
    ]
  },
  {
    name: 'LOGOUT',
    path: '/logout',
    icon: <Logout sx={{ maxWidth: 20, fontSize: '20px', color: '#fff' }} />
  }
]

export default navigation
