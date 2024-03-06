import { Button } from '@/components/shared'
import { Grid } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'
import { primaryButtonStyle } from '@/utils/theme'

function UserCreateToolbarComponent({
  createLoading,
  loading,
  onSubmit = () => { }
}) {
  return (
    <Grid>
      <Button
        text='Submit'
        color='warning'
        sx={{
          marginTop: '20px',
          textTransform: 'none',
          ...primaryButtonStyle
        }}
        onClick={onSubmit}
        isBusy={createLoading}
        isLoading={loading}
      />
    </Grid>
  )
}

UserCreateToolbarComponent.propTypes = {
  createLoading: PropTypes.bool,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func
}

export default UserCreateToolbarComponent