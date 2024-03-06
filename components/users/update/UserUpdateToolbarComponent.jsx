import { Button } from '@/components/shared'
import { primaryButtonStyle } from '@/utils/theme'
import { Grid } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

function UserUpdateToolbarComponent({
  updateLoading,
  loading,
  handleSubmit = () => { }
}) {
  return (
    <Grid
      sx={{
        marginTop: '20px'
      }}
    >
      <Button
        text='Submit'
        color='warning'
        sx={{
          textTransform: 'none',
          marginTop: '20px',
          ...primaryButtonStyle
        }}
        onClick={handleSubmit}
        isBusy={updateLoading}
        isLoading={loading}
      />
    </Grid>
  )
}

UserUpdateToolbarComponent.propTypes = {
  updateLoading: PropTypes.bool,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func
}

export default UserUpdateToolbarComponent