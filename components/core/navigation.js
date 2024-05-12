import React from 'react'
import PieChartIcon from '@mui/icons-material/PieChart'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupsIcon from '@mui/icons-material/Groups'
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'
import GetAppIcon from '@mui/icons-material/GetApp'
import LogoutIcon from '@mui/icons-material/Logout'
import { FaDatabase } from 'react-icons/fa'
import { Box } from '@mui/material'

const navigation = [
  {
    name: 'DASHBOARD',
    path: '/dashboard',
    icon: (
      <PieChartIcon
        hartIcon
        maxWidth={20}
        sx={{ fontSize: '20px', color: '#fff' }}
      />
    ),
    permission: [{ name: 'Pengguna' }]
  },
  {
    name: 'REKAPITULASI',
    icon: (
      <DashboardIcon
        boardIcon
        maxWidth={20}
        sx={{ fontSize: '20px', color: '#fff' }}
      />
    ),
    permission: [{ name: 'Kategori' }],
    children: [
      {
        path: '/rekapitulasi/komposisi-pegawai',
        name: 'KOMPOSISI PEGAWAI',
        icon: null,
        permission: [{ name: 'Pengguna' }]
      },
      {
        path: '/rekapitulasi/pegawai-asn',
        name: 'PEGAWAI ASN',
        icon: null,
        permission: [{ name: 'Peran Pengguna' }]
      },
      {
        path: '/rekapitulasi/pegawai-non-asn',
        name: 'PEGAWAWAI NON ASN',
        icon: null,
        permission: [{ name: 'Blacklist' }]
      },
      {
        path: '/rekapitulasi/pegawai-outsourcing',
        name: 'PEGAWAI OUTSOURCING',
        icon: null,
        permission: [{ name: 'Penyelenggara' }]
      },
      {
        path: '/rekapitulasi/peta-jabatan',
        name: 'PETA JABATAN',
        permission: [{ name: 'Activity Log' }]
      },
      {
        path: '/rekapitulasi/bandingkan-pegawai',
        name: 'BANDINGKAN PEGAWAI',
        permission: [{ name: 'Bandingkan Pegawai' }]
      },
      {
        path: '/manajemen-pengguna/activity-log-user',
        name: 'PROMOSI PEGAWAI',
        permission: [{ name: 'Activity Log' }]
      }
    ]
  },
  {
    name: 'DATA PEGAWAI',
    icon: <GroupsIcon maxWidth={20} sx={{ fontSize: '20px', color: '#fff' }} />,
    permission: [{ name: 'empolyee' }],
    children: [
      {
        path: '/data-pegawai/asn',
        name: 'ASN',
        icon: null,
        permission: [{ name: 'employee-asn' }]
      },
      {
        path: '/data-pegawai/non-asn',
        name: 'NON ASN',
        icon: null,
        permission: [{ name: 'employee-non-asn' }]
      },
      {
        path: '/data-pegawai/outsourcing',
        name: 'OUTSOURCING',
        icon: null,
        permission: [{ name: 'employee-outsourcing' }]
      }
    ]
  },
  {
    name: 'DATA RIWAYAT',
    icon: (
      <ViewCarouselIcon
        maxWidth={20}
        fontSize='meduilarge'
        sx={{
          fontSize: '20px',
          color: '#fff'
        }}
      />
    ),
    permission: [{ name: 'History' }],
    children: [
      {
        path: '/data-riwayat/jabatan',
        name: 'JABATAN',
        icon: null,
        permission: [{ name: 'history-position' }]
      },
      {
        path: '/data-riwayat/golongan',
        name: 'GOLONGAN',
        icon: null,
        permission: [{ name: 'history-group' }]
      },
      {
        path: '/data-riwayat/pelatihan-struktural',
        name: 'PELATIHAN STRUKTURAL',
        icon: null,
        permission: [{ name: 'history-structural-training' }]
      },
      {
        path: '/data-riwayat/pelatihan-fungsional',
        name: 'PELATIHAN FUNGSIONAL',
        icon: null,
        permission: [{ name: 'history-fungsional-training' }]
      },
      {
        path: '/data-riwayat/pelatihan-teknis',
        name: 'PELATIHAN TEKNIS',
        icon: null,
        permission: [{ name: 'history-techinical-training' }]
      },
      {
        path: '/data-riwayat/penghargaan',
        name: 'PENGHARGAAN',
        icon: null,
        permission: [{ name: 'history-honor' }]
      },
      {
        path: '/data-riwayat/skp',
        name: 'SKP',
        icon: null,
        permission: [{ name: 'history-skp' }]
      },
      {
        path: '/data-riwayat/ppk',
        name: 'PENILAIAN PRESTASI KERJA',
        icon: null,
        permission: [{ name: 'history-ppk' }]
      },
      {
        path: '/data-riwayat/hukuman-disiplin',
        name: 'HUKUMAN DISIPLIN',
        icon: null,
        permission: [{ name: 'history-punishment' }]
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
    permission: [{ name: 'data-master' }],
    children: [
      {
        path: '/master-data/user',
        name: 'DATA PENGGUNA',
        icon: null,
        permission: [{ name: 'data-user' }]
      },
      {
        path: '/master-data/role-user',
        name: 'DATA ROLE PENGGUNA',
        icon: null,
        permission: [{ name: 'data-role' }]
      },
      {
        path: '/master-data/position',
        name: 'ROLE JABATAN',
        icon: null,
        permission: [{ name: 'data-position' }]
      },
      {
        path: '/master-data/golongan',
        name: 'ROLE GOLONGAN',
        icon: null,
        permission: [{ name: 'data-class' }]
      },
      {
        path: '/master-data/instansi',
        name: 'ROLE INSTANSI',
        icon: null,
        permission: [{ name: 'data-agency' }]
      },
      {
        path: '/master-data/college',
        name: 'ROLE PERGURUAN TINGGI',
        icon: null,
        permission: [{ name: 'data-college' }]
      },
      {
        path: '/master-data/type',
        name: 'ROLE JENIS PEGAWAI',
        icon: null,
        permission: [{ name: 'data-type' }]
      }
    ]
  },
  {
    name: 'EXPORT',
    icon: <GetAppIcon maxWidth={20} sx={{ fontSize: '20px', color: '#fff' }} />,
    permission: [{ name: 'export' }],
    children: [
      {
        path: '/export/employee',
        name: 'EXPORT PEGAWAI',
        icon: null,
        permission: [{ name: 'export-employee' }]
      },
      {
        path: '/export/drh',
        name: 'EXPORT DRH',
        icon: null,
        permission: [{ name: 'export-drh' }]
      }
    ]
  },
  {
    name: 'LOGOUT',
    icon: <LogoutIcon maxWidth={20} sx={{ fontSize: '20px', color: '#fff' }} />,
    permission: [{ name: 'logout' }]
  }
]

export default navigation
