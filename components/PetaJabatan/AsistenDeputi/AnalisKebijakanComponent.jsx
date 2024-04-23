import React from 'react'
import EmployeeLayout from '@/components/Employment/EmploymentLayout'
import JobChart from '@/components/shared/JobChart'
import { CardTypes } from 'libs/types/CardTypes'

const data = {
  parent: {
    position: 'Kepala Sekretariat Wakil Presiden',
    name: 'Ahmad Erani Yustika, S.E., M.Sc., Ph.D.',
    image: '/simdatuk/imagePegawai.png',
    eselon: 'Es. I.a., 25-01-2021',
    golongan: 'Pembina Utama Madya (IV/d), 01-04-2017',
    nip: '197303221997021001',
    tmt: '14-11-1999',
    isDetail: true,
    isProfile: true
  },
  children: [
    {
      type: CardTypes?.PROFILE1,
      position: 'Kepala Sekretariat Wakil Presiden',
      slot: 1,
      children: [
        {
          name: 'Dr. Ir. Suprayoga Hadi, M.S.P.',
          image: null,
          eselon: null,
          golongan: null,
          nip: null,
          tmt: '14-11-1999',
          isDetail: true,
          isProfile: true
        }
      ]
    },
    {
      type: CardTypes?.PROFILE1,
      position: 'Asisten Deputi Ekonomi dan Keuangan',
      slot: 1,
      children: [
        {
          name: 'Dr. Ir. Suprayoga Hadi, M.S.P.',
          image: '/simdatuk/imagePegawai.png',
          eselon: 'Es. I.a., 25-01-2021',
          golongan: 'Pembina Utama (IV/e), 01-04-2017',
          nip: '1965053019991031002',
          tmt: '14-11-1999',
          isDetail: true,
          isProfile: true
        }
      ]
    },
    {
      type: CardTypes?.PROFILE1,
      position:
        'Asisten Deputi Industri, Perdagangan, Pariwisata, dan Ekonomi Kreatif ',
      slot: 1,
      children: [
        {
          name: 'Dr. Velix Vernando Wanggai S.IP., MPA',
          image: '/simdatuk/imagePegawai.png',
          eselon: 'Es. I.a, 23-08-2022',
          golongan: 'Pembina Utama Muda (IV/c), 01-10-2019',
          nip: '197202161998031005',
          tmt: '14-11-1999',
          isDetail: true,
          isProfile: true
        }
      ]
    },
    {
      type: CardTypes?.PROFILE1,
      position: 'Kepala Subbagian Dukungan Administrasi',
      slot: 1,
      children: [
        {
          name: 'Sapto Harjono Wahjoe Sedjati, S.Sos., M.A.',
          image: '/simdatuk/imagePegawai.png',
          eselon: 'Es. I.a, 01-03-2023',
          golongan: 'Pembina Utama (IV/e), 01-03-2023',
          nip: '180004061 / 197010271995031001',
          tmt: '14-11-1999',
          isDetail: true,
          isProfile: true
        }
      ]
    }
  ]
}

const AnalisKebijakanComponent = () => {
  return (
    <EmployeeLayout summary='Peta Jabatan' showExpButton={true}>
      <JobChart datas={data} />
    </EmployeeLayout>
  )
}

export default AnalisKebijakanComponent
