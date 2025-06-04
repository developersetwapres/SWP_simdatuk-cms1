import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'
import PropTypes from 'prop-types'

function BackdropPage({
  open
}) {
  return (
    <>
      <Backdrop
        open={open}
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  )
}

BackdropPage.propTypes = {
  open: PropTypes.bool
}

export default BackdropPage