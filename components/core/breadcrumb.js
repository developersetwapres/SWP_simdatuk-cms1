const breadcrumbs = [
  {
    path: '/komposisi-pegawai',
    name: '',
    children: [
      {
        pathChild: '/komposisi-pegawai/asn-aktif',
        name: 'Aparatur Sipil Negara (ASN) Aktif + Perbantuan TNI/POLRI Pelaksana'
      },
      {
        pathChild: '/komposisi-pegawai/asn-non-aktif',
        name: 'Aparatur Sipil Negara (ASN) Non Aktif'
      },
      {
        pathChild: '/komposisi-pegawai',
        name: 'Update Level Pengguna'
      },
      {
        pathChild: '/komposisi-pegawai',
        name: 'Detail Pengguna'
      }
    ]
  },
  {
    path: '/manajemen-pengguna/peran-pengguna',
    name: 'Daftar Peran Pengguna',
    children: [
      {
        pathChild: '/manajemen-pengguna/peran-pengguna/create',
        name: 'Tambah Peran Pengguna'
      },
      {
        pathChild: '/manajemen-pengguna/peran-pengguna/update/[id]',
        name: 'Edit Peran Pengguna'
      }
    ]
  },
  {
    path: '/manajemen-pengguna/blacklist',
    name: 'Daftar Blacklist',
    children: [
      {
        pathChild: '/manajemen-pengguna/blacklist/create',
        name: 'Tambah Blacklist'
      },
      {
        pathChild: '/manajemen-pengguna/blacklist/detail/[id]',
        name: 'Detail Blacklist'
      }
    ]
  },
  {
    path: '/manajemen-pengguna/penyelenggara',
    name: 'Daftar Penyelenggara',
    children: [
      {
        pathChild: '/manajemen-pengguna/penyelenggara/create',
        name: 'Tambah Penyelenggara'
      },
      {
        pathChild: '/manajemen-pengguna/penyelenggara/update/[id]',
        name: 'Edit Penyelenggara'
      }
    ]
  },
  {
    path: '/manajemen-pengguna/activity-log-user',
    name: 'Daftar Activity Log User'
  },
  {
    path: '/category',
    name: 'Daftar Kategori',
    children: [
      {
        pathChild: '/category/create',
        name: 'Tambah Kategori'
      },
      {
        pathChild: '/category/update/[id]',
        name: 'Edit Kategori'
      }
    ]
  },
  {
    path: '/manajemen-course/course',
    name: 'Daftar Course',
    children: [
      {
        pathChild: '/manajemen-course/course/create',
        name: 'Tambah Course'
      },
      {
        pathChild: '/manajemen-course/course/edit/[id]',
        name: 'Edit Course'
      },
      {
        pathChild: '/manajemen-course/course/detail/[id]',
        name: 'Detail Course'
      }
    ]
  },
  {
    path: '/manajemen-course/editor-choice',
    name: 'Pilihan Editor'
  },
  {
    path: '/manajemen-course/organizer',
    name: 'Update Data Penyelenggara'
  },
  {
    path: '/manajemen-kupon/kupon',
    name: 'Daftar Kupon',
    children: [
      {
        pathChild: '/manajemen-kupon/kupon/create',
        name: 'Tambah Kupon'
      },
      {
        pathChild: '/manajemen-kupon/kupon/create/spreadsheet',
        name: 'Tambah Kupon by Spreadsheet'
      },
      {
        pathChild: '/manajemen-kupon/kupon/update/[id]',
        name: 'Edit Kupon'
      },
      {
        pathChild: '/manajemen-kupon/kupon/detail/[id]',
        name: 'Detail Kupon'
      }
    ]
  },
  {
    path: '/manajemen-kupon/pengajuan-kupon',
    name: 'Daftar Pengajuan Kupon',
    children: [
      {
        pathChild: '/manajemen-kupon/pengajuan-kupon/detail/[id]',
        name: 'Detail Pengajuan Kupon'
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    children: [
      {
        pathChild: '/banner/create',
        name: 'Tambah Banner'
      },
      {
        pathChild: '/banner/sort-banner',
        name: 'Sort Banner'
      },
      {
        pathChild: '/banner/update/[id]',
        name: 'Edit Banner'
      }
    ]
  },
  {
    path: '/profile',
    name: 'Profile'
  }
]

export default breadcrumbs
