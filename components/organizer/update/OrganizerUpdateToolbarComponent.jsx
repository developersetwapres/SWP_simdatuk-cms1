import React from 'react'
import { Grid } from '@mui/material'
import { Button } from '@/components/shared'
import { primaryButtonStyle } from '@/utils/theme'
import PropTypes from 'prop-types'

function OrganizerUpdateToolbarComponent({
  loadingProvider,
  handleSubmit = () => { }
}) {
  return (
    <Grid
      container
      direction='column'
      sx={{
        marginTop: '52px'
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
          isBusy={loadingProvider?.isSubmit}
          isLoading={loadingProvider?.loading}
        />
      </Grid>
    </Grid>
  )
}

OrganizerUpdateToolbarComponent.propTypes = {
  loadingProvider: PropTypes.object,
  handleSubmit: PropTypes.func
}

export default OrganizerUpdateToolbarComponent