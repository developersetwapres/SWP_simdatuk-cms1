import React, { useEffect, useState } from 'react'
import CheckboxCard from '../core/CheckboxCard'
import { Grid } from '@mui/material'
import PropTypes from 'prop-types'
import CardProfile from '../shared/Card/CardProfile'
import { CardTypes } from 'libs/types/CardTypes'

const data = [
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
        isDetail: false,
        isProfile: false,
        isCheck: true
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
        isDetail: false,
        isProfile: false,
        isCheck: true
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
        isDetail: false,
        isProfile: false,
        isCheck: true
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
        isDetail: false,
        isProfile: false,
        isCheck: true
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
        isDetail: false,
        isProfile: false,
        isCheck: true
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
        isDetail: false,
        isProfile: false,
        isCheck: true
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
        isDetail: false,
        isProfile: false,
        isCheck: true
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
        isDetail: false,
        isProfile: false,
        isCheck: true
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
        isDetail: false,
        isProfile: false,
        isCheck: true
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
        isDetail: false,
        isProfile: false,
        isCheck: true
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
        isDetail: false,
        isProfile: false,
        isCheck: true
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
        isDetail: false,
        isProfile: false,
        isCheck: true
      }
    ]
  }
]

const ListPegawai = ({ checkAmount = () => {} }) => {
  // eslint-disable-next-line no-unused-vars
  const [checkList, setCheckList] = useState([])
  const [checkAll, setCheckAll] = useState(false)

  const hanldeChekAll = () => {
    setCheckAll(!checkAll)
  }

  useEffect(() => {
    checkAmount(checkList)
  }, [checkAmount, checkList])

  return (
    <CheckboxCard
      checkedParent={checkAll}
      checkIndeterminate={checkAll == false}
      getChekAll={hanldeChekAll}
      label='Pilih Semua'
    >
      <Grid container spacing={3}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={3} key={index}>
            <CardProfile data={item} key={index} />
          </Grid>
        ))}
      </Grid>
    </CheckboxCard>
  )
}

ListPegawai.propTypes = {
  checkAmount: PropTypes.func
}

export default ListPegawai
