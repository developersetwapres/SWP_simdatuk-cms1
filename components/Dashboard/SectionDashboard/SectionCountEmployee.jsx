/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import DashboardSectionLayout from '../DashboardSectionLayout'
import { Box, Grid } from '@mui/material'
import ContentCount from './ContentCount'

const style = {
  grid: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

const SectionCountEmployee = ({ data }) => {
  return (
    <DashboardSectionLayout>
      <Grid container sx={{ height: '80vh' }}>
        <Grid
          item
          xs={12}
          sm={5}
          sx={{
            ...style?.grid,
            paddingLeft: '44px',
            justifyContent: 'start'
          }}
        >
          <ContentCount data={data} />
        </Grid>
        <Grid item xs={12} sm={7} sx={style?.grid}>
          <Box sx={style?.grid}>
            <Image
              src={data?.image}
              sx={{ width: '100%', height: 'fit-content' }}
            />
          </Box>
        </Grid>
      </Grid>
    </DashboardSectionLayout>
  )
}

SectionCountEmployee.propTypes = {
  data: PropTypes.object
}

export default SectionCountEmployee
