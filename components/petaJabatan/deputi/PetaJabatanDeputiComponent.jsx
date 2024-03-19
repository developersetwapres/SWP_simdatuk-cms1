import EmployeeLayout from '@/components/employee/EmployeeLayout'
import React from 'react'
import PetaJabatanLayout from '../PetaJabatanLayout'


const PetaJabatanDeputiComponent = () => {


  const listPegawai = [
    {
      id: 1,
      position: 'Kepala Sekretariat Wakil Presiden',
      name: 'Jabatan Fungsional',
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
    }
  ]


  return (
    <EmployeeLayout
      summary='Peta Jabatan'
      showExpButton={true}
    >
      <PetaJabatanLayout
        data={listPegawai}
        jabatan='Deputi Bidang Dukungan Kebijakan Pembangunan Ekonomi dan Peningkatan Daya Saing'
        lihatProfile='Lihat Profile'
      />
    </EmployeeLayout >
  )
}

export default PetaJabatanDeputiComponent
