import React, { useState } from 'react'
import { Box, Grid, Typography, Paper } from '@mui/material'
import { Autocomplete } from '@/components/shared/index'
import PropTypes from 'prop-types'
import BannerListComponent from './DashboardListComponent'



function DashboardToolbarComponent({
  // eslint-disable-next-line no-unused-vars
  queries,
  onBirthDay = () => { }
  // onClearFilter = () => { }
}) {
  const [birthDate, setBirthDate] = useState('')

  const handleBirthDay = (e) => {
    setBirthDate(e.target.value)
    onBirthDay(e.target.value)
  }



  // const handleClearAll = () => {
  //   onClearFilter()
  //   setFilterStatus('')
  //   setFilterType('')
  //   setSearch('')
  // }

  const months = [
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' }
  ]

  return (
    <>
      <Paper
        elevation={2}
        container
        direction='column'
        sx={{
          backgroundColor: '#fff',
          padding: '1rem'
        }}
      >
        <Grid
          container
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Box>
            <Typography
              fontWeight='500'
            >
              Pegawain Yang Berulang Tahun
            </Typography>
          </Box>
          <Box
            sx={{
              width: {
                xs: '100%',
                sm: '30%',
                md: '20%'
              },
              padding: '0'
            }}
          >
            <Autocomplete
              placeholder='Pilih'
              name='status'
              options={months}
              onChange={(e) => { handleBirthDay(e) }}
              value={birthDate}
            />
          </Box>
        </Grid>
        <BannerListComponent />
      </Paper>
    </>
  )
}

DashboardToolbarComponent.propTypes = {
  queries: PropTypes.object,
  onBirthDay: PropTypes.func,
  onClearFilter: PropTypes.func
}

export default DashboardToolbarComponent