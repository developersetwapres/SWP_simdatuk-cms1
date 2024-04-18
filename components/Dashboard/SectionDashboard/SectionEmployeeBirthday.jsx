/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { Select } from '@/components/shared/index'
// import PropTypes from 'prop-types'
import CardEmployee from '../../shared/Card/CardEmployee'
import DashboardSectionLayout from '../DashboardSectionLayout'

const months = [
  { id: 1, text: 'January' },
  { id: 2, text: 'February' },
  { id: 3, text: 'March' },
  { id: 4, text: 'April' },
  { id: 5, text: 'May' },
  { id: 6, text: 'June' },
  { id: 7, text: 'July' },
  { id: 8, text: 'August' },
  { id: 9, text: 'September' },
  { id: 10, text: 'October' },
  { id: 11, text: 'November' },
  { id: 12, text: 'December' }
]

const data = [
  {
    name: 'Dr. Ir. Suprayoga Hadi, M.S.P.',
    image: '/simdatuk/imagePegawai.png',
    date: '00-00-0000'
  },
  {
    name: 'Dr. Ir. Suprayoga Hadi, M.S.P.',
    image: '/simdatuk/imagePegawai.png',
    date: '00-00-0000'
  },
  {
    name: 'Dr. Ir. Suprayoga Hadi, M.S.P.',
    image: '/simdatuk/imagePegawai.png',
    date: '00-00-0000'
  },
  {
    name: 'Dr. Ir. Suprayoga Hadi, M.S.P.',
    image: '/simdatuk/imagePegawai.png',
    date: '00-00-0000'
  },
  {
    name: 'Dr. Ir. Suprayoga Hadi, M.S.P.',
    image: '/simdatuk/imagePegawai.png',
    date: '00-00-0000'
  },
  {
    name: 'Dr. Ir. Suprayoga Hadi, M.S.P.',
    image: '/simdatuk/imagePegawai.png',
    date: '00-00-0000'
  },
  {
    name: 'Dr. Ir. Suprayoga Hadi, M.S.P.',
    image: '/simdatuk/imagePegawai.png',
    date: '00-00-0000'
  }
]

function SectionEmployeeBirthday() {
  const [month, setMonth] = useState(null)

  const handleChangeMonth = (event) => {
    setMonth(event.target.value)
  }

  function getCurrentMonth() {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const valueMonth = currentMonth + 1

    if (!month) setMonth(valueMonth)
  }

  useEffect(() => {
    getCurrentMonth()
  }, [])

  return (
    <DashboardSectionLayout>
      <Box
        sx={{
          marginBottom: '16px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography fontWeight='500'>Pegawain Yang Berulang Tahun</Typography>
        <Select
          name='month'
          sx={{ width: '200px' }}
          value={month}
          options={months}
          placeholder='Month'
          onChange={handleChangeMonth}
        />
      </Box>
      <Grid container>
        {data?.map((item, index) => (
          <Grid item xs={12} sm={3} key={index}>
            <CardEmployee data={item} otherStyle={{ boxShadow: 'none' }} />
          </Grid>
        ))}
      </Grid>
    </DashboardSectionLayout>
  )
}

// SectionEmployeeBirthday.propTypes = {
// }

export default SectionEmployeeBirthday
