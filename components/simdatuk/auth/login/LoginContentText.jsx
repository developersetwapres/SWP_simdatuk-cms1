import React from 'react'
import Typography from '@mui/material/Typography'

const LoginContentText = () => {
  return (
    <>
      <Typography
        variant='h3'
        component='h1'
        color='common.white'
        fontWeight='700'
      >
        SIMDATUK
      </Typography>
      <Typography
        variant='p'
        component='h5'
        color='common.white'
        fontWeight='200'
        py='5px'
      >
        (Sistem Informasi Manajemen Data Dukungan Kepegawaian)
      </Typography>
      <Typography
        variant='p'
        component='h4'
        color='common.white'
        fontWeight='500'
        pt='25px'
      >
        Sekretariat Wakil Presiden
      </Typography>
    </>
  )
}

export default LoginContentText
