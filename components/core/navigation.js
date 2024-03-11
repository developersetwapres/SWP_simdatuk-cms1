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
    name: 'REAKAPITULASI',
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
        path: '/komposisi-pegawai',
        name: 'KOMPOSISI PEGAWAI',
        icon: null,
        permission: [{ name: 'Pengguna' }]
      },
      {
        path: '/manajemen-pengguna/peran-pengguna',
        name: 'PEGAWAI ASN',
        icon: null,
        permission: [{ name: 'Peran Pengguna' }]
      },
      {
        path: '/manajemen-pengguna/blacklist',
        name: 'PEGAWAWAI NON ASN',
        icon: null,
        permission: [{ name: 'Blacklist' }]
      },
      {
        path: '/manajemen-pengguna/penyelenggara',
        name: 'PEGAWAI OUTSOURCING',
        icon: null,
        permission: [{ name: 'Penyelenggara' }]
      },
      {
        path: '/manajemen-pengguna/activity-log-user',
        name: 'PETA JABATAN',
        permission: [{ name: 'Activity Log' }]
      },
      {
        path: '/manajemen-pengguna/activity-log-user',
        name: 'BANDINGKAN PEGAWAI',
        permission: [{ name: 'Activity Log' }]
      },
      {
        path: '/manajemen-pengguna/activity-log-user',
        name: 'PROMISO PEGAWAI',
        permission: [{ name: 'Activity Log' }]
      }
    ]
  },
  {
    name: 'DATA PEGAWAI',
    icon: <GroupsIcon maxWidth={20} sx={{ fontSize: '20px', color: '#fff' }} />,
    permission: [{ name: 'Course' }],
    children: [
      {
        path: '/manajemen-course/course',
        name: 'Course',
        icon: null,
        permission: [{ name: 'Course' }]
      },
      {
        path: '/manajemen-course/editor-choice',
        name: 'Pilihan Editor',
        icon: null,
        permission: [{ name: 'Pilihan Editor' }]
      },
      {
        path: '/manajemen-course/organizer',
        name: 'Update Data Penyelenggara',
        icon: null,
        permission: [{ name: 'Update Data Penyelenggara' }]
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
    permission: [{ name: 'Kupon' }],
    children: [
      {
        path: '/manajemen-kupon/kupon',
        name: 'Kupon',
        icon: null,
        permission: [{ name: 'Kupon' }]
      },
      {
        path: '/manajemen-kupon/pengajuan-kupon',
        name: 'Pengajuan Kupon',
        icon: null,
        permission: [{ name: 'Pengajuan Kupon' }]
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
    permission: [{ name: 'Banner' }],
    children: [
      {
        path: '/manajemen-kupon/kupon',
        name: 'Kupon',
        icon: null,
        permission: [{ name: 'Kupon' }]
      },
      {
        path: '/manajemen-kupon/pengajuan-kupon',
        name: 'Pengajuan Kupon',
        icon: null,
        permission: [{ name: 'Pengajuan Kupon' }]
      }
    ]
  },
  {
    name: 'EXPORT',
    icon: <GetAppIcon maxWidth={20} sx={{ fontSize: '20px', color: '#fff' }} />,
    permission: [{ name: 'Kupon' }],
    children: [
      {
        path: '/manajemen-kupon/kupon',
        name: 'Kupon',
        icon: null,
        permission: [{ name: 'Kupon' }]
      },
      {
        path: '/manajemen-kupon/pengajuan-kupon',
        name: 'Pengajuan Kupon',
        icon: null,
        permission: [{ name: 'Pengajuan Kupon' }]
      }
    ]
  },
  {
    name: 'LOGOUT',
    icon: <LogoutIcon maxWidth={20} sx={{ fontSize: '20px', color: '#fff' }} />,
    permission: [{ name: 'Kupon' }],
    children: [
      {
        path: '/manajemen-kupon/kupon',
        name: 'Kupon',
        icon: null,
        permission: [{ name: 'Kupon' }]
      },
      {
        path: '/manajemen-kupon/pengajuan-kupon',
        name: 'Pengajuan Kupon',
        icon: null,
        permission: [{ name: 'Pengajuan Kupon' }]
      }
    ]
  }
]

export default navigation
