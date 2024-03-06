import React from 'react'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'


const MyButton = ({ text }) => {
  return (
    <>
      <Button
        type='submit'
        variant='contained'
        color='simdatukPrimary'
        sx={{
          width: '100%',
          height: '35%',
          '&:hover': {
            backgroundColor: '#895700'
          }
        }}>
        <Typography variant='h6' component='p' fontSize={13} color='common.white'>
          {text}
        </Typography>
      </Button>
    </>
  )
}

MyButton.propTypes = {
  text: PropTypes.string
}

export default MyButton
