import React, { useState } from 'react'
import { Snackbar as MuiSnackbar, Alert } from '@mui/material'
import { useSelector } from 'react-redux'

function Snackbar() {
  const [open, setOpen] = useState(false)
  const selector = useSelector((state) => state.notificationReducer)
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
    >
      <Alert
        severity='info'
        sx={{ width: '100%' }}
        onClose={() => setOpen(false)}
      >
        <p>{selector?.title}</p>
        <p>{selector?.body}</p>
      </Alert>
    </MuiSnackbar>
  )
}


export default Snackbar