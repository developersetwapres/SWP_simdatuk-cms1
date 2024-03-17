export const unitKerja = [
  {
    id: 1,
    path: '/rekapitulasi/pegawai-asn/lihat-profile',
    name: 'Kepala Sekretariat Wakil Presiden',
    amount: 1
  },
  {
    id: 2,
    path: '/rekapitulasi/pegawai-asn/lihat-profile',
    name: 'Deputi Bidang Dukungan Kebijakan Pembangunan Ekonomi dan Peningkatan Daya Saing',
    amount: 24
  },
  {
    id: 3,
    path: '/rekapitulasi/pegawai-asn/lihat-profile',
    name: 'Deputi Bidang Dukungan Kebijakan Pembangunan Manusia dan Pemerataan Pembangunan',
    amount: 26
  },
  {
    id: 4,
    path: '/rekapitulasi/pegawai-asn/lihat-profile',
    name: 'Deputi Bidang Dukungan Kebijakan Pemerintahan dan Wawasan Kebangsaan',
    amount: 31
  },
  {
    id: 5,
    path: '/rekapitulasi/pegawai-asn/lihat-profile',
    name: 'Deputi Bidang Administrasi',
    amount: 186
  },
  {
    id: 6,
    path: '/rekapitulasi/pegawai-asn/lihat-profile',
    name: 'Kementerian Sekretariat Negara',
    amount: 15
  }
]

export const keteranganJabatan = [
  {
    id: 1,
    path: '/rekapitulasi/jabatan/pimpinan-tinggi',
    name: 'Jabatan Pimpinan Tinggi',
    amount: 19,
    child: [
      { name: 'Pimpinan Tinggi Madya', amount: 5 },
      { name: 'Pimpinan Tinggi Pertama', amount: 15 }
    ]
  },
  {
    id: 2,
    path: '/rekapitulasi/jabatan/jabatan-administrasi',
    name: 'Jabatan Administrasi',
    amount: 128,
    child: [
      {
        name: 'Administrator',
        amount: 10
      },
      {
        name: 'Pengawas',
        amount: 23
      },
      {
        name: 'Pelaksana',
        amount: 95
      }
    ]
  },
  {
    id: 3,
    path: '/rekapitulasi/jabatan/jabatan-administrasi',
    name: 'Jabatan Fungsional',
    amount: 121,
    child: [
      {
        name: 'Ahli Utama',
        amount: 0
      },
      {
        name: 'Ahli Madya',
        amount: 33
      },
      {
        name: 'Ahli Muda',
        amount: 68
      },
      {
        name: 'Ahli Pertama',
        amount: 12
      },
      {
        name: 'Penyelia',
        amount: 4
      },
      {
        name: 'Mahir',
        amount: 0
      },
      {
        name: 'Terampil',
        amount: 4
      },
      {
        name: 'Pemula',
        amount: 0
      }
    ]
  }
]

export const golongan = [
  {
    id: 1,
    path: '/komposisi-pegawai/',
    name: 'Pembina Utama (IV/e)',
    amount: 3
  },
  {
    id: 2,
    path: '/komposisi-pegawai/',
    name: 'Pembina Utama Madya (IV/d)',
    amount: 7
  },
  {
    id: 3,
    path: '/komposisi-pegawai/',
    name: 'Pembina Utama Muda (IV/c)',
    amount: 8
  },
  {
    id: 4,
    path: '/komposisi-pegawai/',
    name: 'Pembina Tingkat I (IV/b)',
    amount: 41
  },
  {
    id: 5,
    path: '/komposisi-pegawai/',
    name: 'Pembina (IV/a)',
    amount: 34
  },
  {
    id: 6,
    path: '/komposisi-pegawai/',
    name: 'Penata Tingkat I (III/d)',
    amount: 59
  },
  {
    id: 7,
    path: '/komposisi-pegawai/',
    name: 'Penata (III/c)',
    amount: 24
  },
  {
    id: 8,
    path: '/komposisi-pegawai/',
    name: 'Penata Muda Tingkat I (III/b)',
    amount: 24
  },
  {
    id: 9,
    path: '/komposisi-pegawai/',
    name: 'Penata Muda (III/a)',
    amount: 30
  },
  {
    id: 10,
    path: '/komposisi-pegawai/',
    name: 'Pengatur Tingkat I (II/d)',
    amount: 27
  },
  {
    id: 11,
    path: '/komposisi-pegawai/',
    name: 'Pengatur (II/c)',
    amount: 15
  },
  {
    id: 12,
    path: '/komposisi-pegawai/',
    name: 'Pengatur Muda Tingkat I (II/b)',
    amount: 9
  },
  {
    id: 13,
    path: '/komposisi-pegawai/',
    name: 'Pengatur Muda (II/a)',
    amount: 2
  }
]

export const pegawaiNonAktif = [
  {
    id: 1,
    path: '/komposisi-pegawai/',
    name: 'Tugas Belajar Luar Negeri (TBL)',
    amount: 3
  },
  {
    id: 2,
    path: '/komposisi-pegawai/',
    name: 'Cuti Diluar Tanggungan Negara (CLTN)',
    amount: 3
  }
]

export const pendidikan = [
  {
    id: 1,
    path: '/komposisi-pegawai/',
    name: 'Strata III',
    amount: 8
  },
  {
    id: 2,
    path: '/komposisi-pegawai/',
    name: 'Strata II',
    amount: 96
  },
  {
    id: 3,
    path: '/komposisi-pegawai/',
    name: 'Diploma IV/Strata I',
    amount: 96
  },
  {
    id: 4,
    path: '/komposisi-pegawai/',
    name: 'Akademi/Diploma III/Sarjana Muda',
    amount: 18
  },
  {
    id: 5,
    path: '/komposisi-pegawai/',
    name: 'Diploma I/II',
    amount: 1
  },
  {
    id: 6,
    path: '/komposisi-pegawai/',
    name: 'SLTA/Sederajat',
    amount: 67
  },
  {
    id: 7,
    path: '/komposisi-pegawai/',
    name: 'SLTP/Sederajat',
    amount: 92
  }
]

export const jenisKelamin = [
  {
    id: 1,
    path: '/komposisi-pegawai/',
    name: 'Laki-laki',
    amount: 151
  },
  {
    id: 2,
    path: '/komposisi-pegawai/',
    name: 'Perempuan',
    amount: 132
  }
]

export const listPegawai = [
  {
    id: 1,
    position: 'Kepala Sekretariat Wakil Presiden',
    name: 'Ahmad Erani Yustika, S.E., M.Sc., Ph.Dr',
    image: '/simdatuk/imagePegawai.png',
    eselon: 'Es. I.a., 25-01-2021',
    golongan: 'Pembina Utama Madya (IV/d), 01-04-2017',
    NIP: '197303221997021001'
  },
  {
    id: 2,
    position: 'Asisten Deputi Ekonomi dan Keuangan',
    name: 'Dr. Ir. Suprayoga Hadi, M.S.P.',
    image: '/simdatuk/imagePegawai.png',
    eselon: 'Es. I.a., 25-01-2021',
    golongan: 'Pembina Utama (IV/e), 01-04-2017',
    NIP: '1965053019991031002'
  },
  {
    id: 3,
    position:
      'Asisten Deputi Industri, Perdagangan, Pariwisata, dan Ekonomi Kreatif ',
    name: 'Dr. Velix Vernando Wanggai S.IP., MPA',
    image: '/simdatuk/imagePegawai.png',
    eselon: 'Es. I.a, 23-08-2022',
    golongan: 'Pembina Utama Muda (IV/c), 01-10-2019',
    NIP: '197202161998031005'
  },
  {
    id: 4,
    position: 'Kepala Subbagian Dukungan Administrasi',
    name: 'Sapto Harjono Wahjoe Sedjati, S.Sos., M.A.',
    image: '/simdatuk/imagePegawai.png',
    eselon: 'Es. I.a, 01-03-2023',
    golongan: 'Pembina Utama (IV/e), 01-03-2023',
    NIP: '180004061 / 197010271995031001'
  },
  {
    id: 5,
    position: 'Ahli Madya',
    name: 'Sapto Harjono Wahjoe Sedjati, S.Sos., M.A.',
    image: '/simdatuk/imagePegawai.png',
    eselon: 'Es. I.a, 01-03-2023',
    golongan: 'Pembina Utama (IV/e), 01-03-2023',
    NIP: '180004061 / 197010271995031001'
  },
  {
    id: 6,
    position: 'Ahli Madya',
    name: 'Sapto Harjono Wahjoe Sedjati, S.Sos., M.A.',
    image: '/simdatuk/imagePegawai.png',
    eselon: 'Es. I.a, 01-03-2023',
    golongan: 'Pembina Utama (IV/e), 01-03-2023',
    NIP: '180004061 / 197010271995031001'
  },
  {
    id: 7,
    position: 'Ahli Muda',
    name: 'Sapto Harjono Wahjoe Sedjati, S.Sos., M.A.',
    image: '/simdatuk/imagePegawai.png',
    eselon: 'Es. I.a, 01-03-2023',
    golongan: 'Pembina Utama (IV/e), 01-03-2023',
    NIP: '180004061 / 197010271995031001'
  },
  {
    id: 8,
    position: 'Ahli Muda',
    name: 'Sapto Harjono Wahjoe Sedjati, S.Sos., M.A.',
    image: '/simdatuk/imagePegawai.png',
    eselon: 'Es. I.a, 01-03-2023',
    golongan: 'Pembina Utama (IV/e), 01-03-2023',
    NIP: '180004061 / 197010271995031001'
  }
]

export const pegawaiOutsourcing = [
  {
    id: 1,
    path: '/rekapitulasi/pegawai-outsourcing/lihat-profile',
    name: 'Pengemudi',
    amount: 38
  },
  {
    id: 1,
    path: '/rekapitulasi/pegawai-outsourcing/lihat-profile',
    name: 'Petugas Kebersihan Gedung',
    amount: 51
  },
  {
    id: 1,
    path: '/rekapitulasi/pegawai-outsourcing/lihat-profile',
    name: 'Petugas Perawatan Kolam',
    amount: 2
  },
  {
    id: 1,
    path: '/rekapitulasi/pegawai-outsourcing/lihat-profile',
    name: 'Petugas Taman',
    amount: 24
  },
  {
    id: 1,
    path: '/rekapitulasi/pegawai-outsourcing/lihat-profile',
    name: 'Pramusaji/Pramubakti',
    amount: 39
  },
  {
    id: 1,
    path: '/rekapitulasi/pegawai-outsourcing/lihat-profile',
    name: 'Teknisi Jaringan',
    amount: 2
  },
  {
    id: 1,
    path: '/rekapitulasi/pegawai-outsourcing/lihat-profile',
    name: 'Teknisi Komputer',
    amount: 11
  },
  {
    id: 1,
    path: '/rekapitulasi/pegawai-outsourcing/lihat-profile',
    name: 'Teknisi Mekanikal dan Elektrikal',
    amount: 24
  }
]

export const nonOutsourcing = [
  {
    id: 1,
    path: '/rekapitulasi/pegawai-outsourcing/lihat-profile',
    name: 'Teknisi Fotocopy',
    amount: 3
  },
  {
    id: 2,
    path: '/rekapitulasi/pegawai-outsourcing/lihat-profile',
    name: 'Teknisi Road Blocker',
    amount: 2
  },
  {
    id: 3,
    path: '/rekapitulasi/pegawai-outsourcing/lihat-profile',
    name: 'Teknisi Lift',
    amount: 2
  }
]

export const jabatan = [
  {
    id: 1,
    path: '/rekapitulasi/pegawai-non-asn/list-pegawai',
    name: 'Staf Khusus Wakil Presiden',
    amount: 10
  },
  {
    id: 2,
    path: '/rekapitulasi/pegawai-non-asn/list-pegawai',
    name: 'Asisten Staf Khusus Wakil Presiden',
    amount: 20
  },
  {
    id: 1,
    path: '/rekapitulasi/pegawai-non-asn/list-pegawai',
    name: 'Pembantu Asisten Staf Khusus Wakil Presiden',
    amount: 5
  },
  {
    id: 1,
    path: '/rekapitulasi/pegawai-non-asn/list-pegawai',
    name: 'Anggota Tim Ahli Wakil Presiden',
    amount: 12
  },
  {
    id: 1,
    path: '/rekapitulasi/pegawai-non-asn/list-pegawai',
    name: 'Staf Pada Sekretaris Pribadi Istri Wakil Presiden',
    amount: 1
  },
  {
    id: 1,
    path: '/rekapitulasi/pegawai-non-asn/list-pegawai',
    name: 'Staf Kerumahtanggaan Pada Kediaman Wakil Presiden',
    amount: 1
  },
  {
    id: 1,
    path: '/rekapitulasi/pegawai-non-asn/list-pegawai',
    name: 'Sekretariat Pada Staf Khusus Wakil Presiden (PTT dari SETKAB)',
    amount: 3
  },
  {
    id: 1,
    path: '/rekapitulasi/pegawai-non-asn/list-pegawai',
    name: 'Ajudan Wakil Presiden dan Istri Wakil Presiden (Perbantuan TNI dan POLRI)',
    amount: 8
  },
  {
    id: 1,
    path: '/rekapitulasi/pegawai-non-asn/list-pegawai',
    name: 'Dokter Pribadi Wakil Presiden',
    amount: 4
  },
  {
    id: 1,
    path: '/rekapitulasi/pegawai-non-asn/list-pegawai',
    name: 'Pengemudi VVIP (Perbantuan TNI dan POLRI)',
    amount: 10
  }
]

export const tim = [
  {
    id: 1,
    path: '/rekapitulasi/pegawai-non-asn/list-pegawai',
    name: 'Tim Nasional Percepatan Penanggulangan Kemiskinan (TNP2K)',
    amount: 64
  },
  {
    id: 1,
    path: '/rekapitulasi/pegawai-non-asn/list-pegawai',
    name: 'Tim Nasional Percepatan Penurunan Stunting (TPPS)',
    amount: 24
  }
]
