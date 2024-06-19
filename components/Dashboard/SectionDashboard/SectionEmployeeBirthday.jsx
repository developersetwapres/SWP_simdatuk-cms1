/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { Select } from '@/components/shared/index'
import PropTypes from 'prop-types'
import CardEmployee from '../../shared/Card/CardEmployee'
import DashboardSectionLayout from '../DashboardSectionLayout'
import { v4 as uuidv4 } from 'uuid'

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

function SectionEmployeeBirthday({
  datas,
  month,
  handleChangeMonth
}) {
  const handleSelectChange = e => {
    handleChangeMonth(e.target.value)
  }

  const employees = useMemo(() => {
    return datas?.users?.map((item) => (
      <Grid item xs={12} sm={3} key={uuidv4()}>
        <CardEmployee
          data={{
            name: item.name,
            image: item.photo_profile,
            date: item.date_of_birth
          }}
          otherStyle={{ boxShadow: 'none' }}
        />
      </Grid>
    ))
  }, [datas])

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
        <Typography fontWeight='500'>Pegawai yang Berulang Tahun</Typography>
        <Select
          name='month'
          sx={{ width: '200px' }}
          value={month}
          options={months}
          placeholder='Month'
          onChange={handleSelectChange}
        />
      </Box>
      <Grid container>
        {employees}
      </Grid>
    </DashboardSectionLayout>
  )
}

SectionEmployeeBirthday.propTypes = {
  month: PropTypes.number,
  datas: PropTypes.object,
  handleChangeMonth: PropTypes.func
}

export default SectionEmployeeBirthday
