import React from 'react'
import { BANNER_MANAGEMENT, CATEGORY_MANAGEMENT, COUPUN_MANAGEMENT, USER_MANAGEMENT, COURSE_MANAGEMENT } from '@/utils/iconConstant'
import { Icon } from '@/components/shared/index'

const navigation = [
  {
    name: 'Manajemen Pengguna',
    icon: <Icon path={USER_MANAGEMENT} maxWidth={24} />,
    permission: [
      { name: 'Pengguna' }
    ],
    children: [
      {
        path: '/manajemen-pengguna/pengguna',
        name: 'Pengguna',
        icon: null,
        permission: [
          { name: 'Pengguna' }
        ]
      },
      {
        path: '/manajemen-pengguna/peran-pengguna',
        name: 'Peran Pengguna',
        icon: null,
        permission: [
          { name: 'Peran Pengguna' }
        ]
      },
      {
        path: '/manajemen-pengguna/blacklist',
        name: 'Blacklist',
        icon: null,
        permission: [
          { name: 'Blacklist' }
        ]
      },
      {
        path: '/manajemen-pengguna/penyelenggara',
        name: 'Penyelenggara',
        icon: null,
        permission: [
          { name: 'Penyelenggara' }
        ]
      },
      {
        path: '/manajemen-pengguna/activity-log-user',
        name: 'Activity Log User',
        permission: [
          { name: 'Activity Log' }
        ]
      }
    ]
  },
  {
    path: '/category',
    name: 'Manajemen Kategori',
    icon: <Icon path={CATEGORY_MANAGEMENT} maxWidth={24} />,
    permission: [
      { name: 'Kategori' }
    ]
  },
  {
    name: 'Manajemen Course',
    icon: <Icon path={COURSE_MANAGEMENT} maxWidth={24} />,
    permission: [
      { name: 'Course' }
    ],
    children: [
      {
        path: '/manajemen-course/course',
        name: 'Course',
        icon: null,
        permission: [
          { name: 'Course' }
        ]
      },
      {
        path: '/manajemen-course/editor-choice',
        name: 'Pilihan Editor',
        icon: null,
        permission: [
          { name: 'Pilihan Editor' }
        ]
      },
      {
        path: '/manajemen-course/organizer',
        name: 'Update Data Penyelenggara',
        icon: null,
        permission: [
          { name: 'Update Data Penyelenggara' }
        ]
      }
    ]
  },
  {
    name: 'Manajemen Kupon',
    icon: <Icon path={COUPUN_MANAGEMENT} maxWidth={24} />,
    permission: [
      { name: 'Kupon' }
    ],
    children: [
      {
        path: '/manajemen-kupon/kupon',
        name: 'Kupon',
        icon: null,
        permission: [
          { name: 'Kupon' }
        ]
      },
      {
        path: '/manajemen-kupon/pengajuan-kupon',
        name: 'Pengajuan Kupon',
        icon: null,
        permission: [
          { name: 'Pengajuan Kupon' }
        ]
      }
    ]
  },
  {
    path: '/banner',
    name: 'Manajemen Banner',
    icon: <Icon path={BANNER_MANAGEMENT} maxWidth={24} />,
    permission: [
      { name: 'Banner' }
    ]
  }
]

export default navigation