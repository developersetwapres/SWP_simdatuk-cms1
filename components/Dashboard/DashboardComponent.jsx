/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import SectionEmployeeBirthday from './SectionDashboard/SectionEmployeeBirthday'
import SectionCountEmployee from './SectionDashboard/SectionCountEmployee'
import { Grid } from '@mui/material'
import COUNT_ICON from '/public/simdatuk/count.png'
import GENDER_ICON from '/public/simdatuk/gender.png'
import TYPE_ICON from '/public/simdatuk/type.png'
import SectionChart from './SectionDashboard/SectionChart'

const data = [
  {
    title: 'Jumlah Pegawai',
    copytext: 'Jumlah pegawai yang ada di Sekretariat Wakil Presiden',
    image: COUNT_ICON,
    count: [
      {
        title: 'Seluruhnya',
        total: 294
      },
      {
        title: 'aktif',
        total: 288
      }
    ]
  },
  {
    title: 'Jenis Kelamin Pegawai',
    copytext: 'Jumlah jenis kelamin yang ada di Sekretariat Wakil Presiden',
    image: GENDER_ICON,
    count: [
      {
        title: 'Pria',
        total: 155
      },
      {
        title: 'Wanita',
        total: 133
      }
    ]
  },
  {
    title: 'Pegawai Bukan ASN',
    copytext: 'Jumlah pegawai bukan ASN yang ada di Sekretariat Wakil Presiden',
    image: TYPE_ICON,
    count: [
      {
        title: 'Perbantuan',
        total: 143
      },
      {
        title: 'Outsourcing',
        total: 190
      }
    ]
  }
]

const dataCharts = [
  {
    title: 'Unit Kerja',
    copytext: 'Detail unit kerja yang ada di Sekretariat Wakil Presiden',
    children: [
      {
        name: 'Kepala Sekretariat Wakil Presiden',
        count: 1
      },
      {
        name: 'Deputi Bidang Dukungan Kebijakan Pembangunan Ekonomi dan Peningkatan Daya Saing',
        count: 24
      },
      {
        name: 'Deputi Bidang Dukungan Kebijakan Pembangunan Manusia dan Pemerataan Pembangunan',
        count: 26
      },
      {
        name: 'Deputi Bidang Dukungan Kebijakan Pemerintahan dan Wawasan Kebangsaan',
        count: 31
      },
      {
        name: 'Deputi Bidang Administrasi',
        count: 186
      },
      {
        name: 'Kementerian Sekretariat Negara',
        count: 15
      }
    ]
  },
  {
    title: 'Pegawai Pendidikan',
    copytext:
      'Detail pendidikan pegawai yang ada di Sekretariat Wakil Presiden',
    children: [
      {
        name: 'Strata III',
        count: 8
      },
      {
        name: 'Strata II',
        count: 96
      },
      {
        name: 'Diploma IV / Strata I',
        count: 92
      },
      {
        name: 'Akademi / Diploma III / Sarjana Muda',
        count: 18
      },
      {
        name: 'Diploma I / II',
        count: 1
      },
      {
        name: 'SLTA / Sederajat',
        count: 67
      },
      {
        name: 'SLTP / Sederajat',
        count: 1
      }
    ]
  }
]

function DashboardComponent({
  banner,
  queries,
  // deleteListBanner = () => { },
  // onPaginationChange = () => { },
  onBirthDay = () => {},
  onClearFilter = () => {}
}) {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <SectionEmployeeBirthday />
      </Grid>
      {data.map((item, index) => (
        <Grid item xs={12} key={index}>
          <SectionCountEmployee data={item} />
        </Grid>
      ))}
      {dataCharts.map((item, index) => (
        <Grid item xs={12} key={index}>
          <SectionChart data={item} />
        </Grid>
      ))}
    </Grid>
  )
}

DashboardComponent.propTypes = {
  banner: PropTypes.object,
  queries: PropTypes.object,
  deleteListBanner: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onBirthDay: PropTypes.func,
  onClearFilter: PropTypes.func
}

export default DashboardComponent
