const breadcrumbs = [
  {
    path: '/rekapitulasi/komposisi-pegawai',
    name: '',
    children: [
      {
        pathChild: '/rekapitulasi/komposisi-pegawai/asn-aktif',
        name: 'Aparatur Sipil Negara (ASN) Aktif + Perbantuan TNI/POLRI Pelaksana'
      },
      {
        pathChild: '/rekapitulasi/komposisi-pegawai/asn-non-aktif',
        name: 'Aparatur Sipil Negara (ASN) Non Aktif'
      },
      {
        pathChild: '/rekapitulasi/komposisi-pegawai/non-asn',
        name: 'Non Aparatur Sipil Negara (Non ASN + Perbantuan) + Tim)'
      },
      {
        pathChild: '/rekapitulasi/komposisi-pegawai/outsourcing',
        name: 'Tenaga Outsourcing dan Non Outsourcing'
      },
      {
        pathChild: '/rekapitulasi/komposisi-pegawai/lihat-profile',
        name: 'Pejabat Pimpinan Tinggi Madya (Eselon I)'
      },
      {
        pathChild: '/rekapitulasi/komposisi-pegawai/detail-profile',
        name: 'Detail Profile'
      }
    ]
  },
  {
    path: '/rekapitulasi/komposisi-pegawai',
    name: 'Komposisi Pegawai',
    children: [
      {
        pathChild: '/rekapitulasi/pegawai-asn/lihat-profile',
        name: 'Lihat Profile'
      },
      {
        pathChild: '/rekapitulasi/pegawai-non-asn/list-pegawai',
        name: 'List Pegawai'
      },
      {
        pathChild: '/rekapitulasi/pegawai-outsourcing/lihat-profile',
        name: 'List Pegawai'
      }
    ]
  },
  {
    path: '/rekapitulasi/peta-jabatan',
    name: 'Peta Jabatan',
    children: [
      {
        pathChild: '/rekapitulasi/peta-jabatan/deputi',
        name: 'Peta Jabatan'
      },
      {
        pathChild: '/rekapitulasi/peta-jabatan/asisten-deputi',
        name: 'Peta Jabatan'
      },
      {
        pathChild: '/rekapitulasi/peta-jabatan/analis-kebijakan',
        name: 'Peta Jabatan'
      },
      {
        pathChild: '/rekapitulasi/peta-jabatan/wakil-presiden',
        name: 'Peta Jabatan'
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
