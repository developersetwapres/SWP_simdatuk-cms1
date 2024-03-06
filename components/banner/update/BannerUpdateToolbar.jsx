import React from 'react'
import { Grid } from '@mui/material'
import { Button } from '@/components/shared'
import { primaryButtonStyle } from '@/utils/theme'
import PropTypes from 'prop-types'

function BannerUpdateToolbar({
  bannerLoading,
  handleSubmit = () => { }
}) {
  return (
    <Grid
      container
      direction='column'
      sx={{
        marginTop: '20px'
      }}
    >
      <Grid
        item
      >
        <Button
          text='Submit'
          sx={{
            textTransform: 'none',
            ...primaryButtonStyle
          }}
          color='warning'
          onClick={handleSubmit}
          isBusy={bannerLoading?.isSubmit}
          isLoading={bannerLoading?.loading}
        />
      </Grid>
    </Grid>
  )
}

BannerUpdateToolbar.propTypes = {
  bannerLoading: PropTypes.object,
  handleSubmit: PropTypes.func
}

export default BannerUpdateToolbar