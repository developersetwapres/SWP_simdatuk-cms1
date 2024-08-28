/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo } from 'react'
import SectionEmployeeBirthday from './SectionDashboard/SectionEmployeeBirthday'
import SectionCountEmployee from './SectionDashboard/SectionCountEmployee'
import { Grid } from '@mui/material'
import COUNT_ICON from '/public/simdatuk/count.png'
import GENDER_ICON from '/public/simdatuk/gender.png'
import TYPE_ICON from '/public/simdatuk/type.png'
import GEN_ICON from '/public/simdatuk/generational_illustration.svg'
import SectionChart from './SectionDashboard/SectionChart'
import LayoutPages from '../core/LayoutPages'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'

const data = [
  {
    title: 'Jumlah Pegawai ASN',
    copytext: 'Pegawai ASN aktif (PNS Setwapres, Perbantuan Setneg, dan PPPK) + Perbantuan TNI/POLRI (Pelaksana)',
    image: COUNT_ICON,
    count: [
      {
        title: 'aktif'
      },
      {
        title: 'Seluruhnya'
      }
    ],
    type: 'total_government_employees'
  },
  {
    title: 'Jenis Kelamin Pegawai ASN',
    copytext: 'Jumlah pegawai berdasarkan jenis kelamin',
    image: GENDER_ICON,
    count: [
      {
        title: 'Pria'
      },
      {
        title: 'Wanita'
      }
    ],
    type: 'gender_employees'
  },
  {
    title: 'Pegawai Non ASN',
    copytext: 'Jumlah pegawai Non ASN yang ada di Sekretariat Wakil Presiden',
    image: TYPE_ICON,
    count: [
      {
        title: 'Perbantuan'
      },
      {
        title: 'Outsourcing'
      }
    ],
    type: 'total_non_government_employees'
  },
  {
    title: 'Generasi',
    copytext: 'Detail generasi pegawai yang ada di Sekretariat Wakil Presiden',
    image: GEN_ICON,
    count: [
      {
        title: 'Gen Z (18 - 24) (2000 - 2006)'
      },
      {
        title: 'Gen Y (25- 40) (1981 - 1999)'
      },
      {
        title: 'Gen X (41 - 58) (1965 - 1980)'
      },
      {
        title: 'Baby Boomers (59 - 75) (1946 - 1964)'
      }
    ],
    type: 'generations'
  }
]

const dataCharts = [
  {
    title: 'Unit Kerja',
    copytext: 'Detail unit kerja yang ada di Sekretariat Wakil Presiden',
    type: 'work_unit',
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
    title: 'Pendidikan Pegawai',
    copytext:
      'Detail pendidikan pegawai yang ada di Sekretariat Wakil Presiden',
    type: 'education_employees',
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
  datas,
  month,
  dashboardReducer,
  handleChangeMonth = () => { },
  setDatas = () => { },
  setRender = () => { }
}) {
  useEffect(() => {
    const state = !dashboardReducer?.loading
    setRender(state)
  }, [dashboardReducer?.loading])

  useEffect(() => {
    setDatas(dashboardReducer?.data)
  }, [dashboardReducer?.data])

  const employeesCounts = useMemo(() => {
    return data.map((item) => (
      <Grid item xs={12} key={uuidv4()}>
        <SectionCountEmployee data={item} datas={datas} />
      </Grid>
    ))
  }, [datas])

  const chartsCounts = useMemo(() => {
    return dataCharts.map((item, index) => (
      <Grid item xs={12} key={index}>
        <SectionChart data={item} datas={datas} />
      </Grid>
    ))
  }, [datas])

  return (
    <LayoutPages summary={'Dashboard'}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <SectionEmployeeBirthday
            month={month}
            datas={datas}
            handleChangeMonth={handleChangeMonth}
          />
        </Grid>
        {employeesCounts}
        {chartsCounts}
      </Grid>
    </LayoutPages>
  )
}

DashboardComponent.propTypes = {
  month: PropTypes.number,
  datas: PropTypes.object,
  dashboardReducer: PropTypes.object,
  handleChangeMonth: PropTypes.func,
  setDatas: PropTypes.func,
  setRender: PropTypes.func
}

export default DashboardComponent
