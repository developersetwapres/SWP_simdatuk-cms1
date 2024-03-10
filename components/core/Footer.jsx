import React from 'react'
import { Typography } from '@mui/material'

export default function Footer(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      &copy; {new Date().getFullYear()} Sekretariat Wakil Presiden.
    </Typography>
  )
}