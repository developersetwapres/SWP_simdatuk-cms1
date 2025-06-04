import React from 'react'
import EmployeeLayout from '@/components/core/LayoutPages'
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
      type: CardTypes?.CARDJOBS,
      position: 'Jabatan Fungsional',
      children: [
        {
          title: 'Analisi Kebijakan',
          jobs: [
            {
              title: 'Ahli Utama',
              slot: 1,
              children: [
                {
                  type: CardTypes?.PROFILE1,
                  position: 'Asisten Deputi Ekonomi dan Keuangan',
                  name: 'Dr. Ir. Suprayoga Hadi, M.S.P.',
                  image: '/simdatuk/imagePegawai.png',
                  eselon: 'Es. I.a., 25-01-2021',
                  golongan: 'Pembina Utama (IV/e), 01-04-2017',
                  nip: '1965053019991031002',
                  isDetail: true,
                  isProfile: true
                }
              ]
            }
          ]
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
      children: []
    }
  ]
}

const AsistenDeputiComponent = () => {
  return (
    <EmployeeLayout summary='Peta Jabatan' showExpButton={true}>
      <JobChart datas={data} />
    </EmployeeLayout>
  )
}

export default AsistenDeputiComponent
