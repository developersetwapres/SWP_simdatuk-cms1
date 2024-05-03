/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { Button } from '../shared'
import { KeyboardArrowLeft } from '@mui/icons-material'

const LayoutPages = ({
  children,
  summary,
  handleBack,
  action,
  count,
  otherStyle
}) => {
  return (
    <>
      {handleBack && (
        <Box sx={{ marginBottom: '20px' }}>
          <Button
            text='Kembali'
            variant='text'
            icon={<KeyboardArrowLeft />}
            onClick={handleBack}
          />
        </Box>
      )}
      {summary && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'start',
            justifyContent: 'space-between',
            marginBottom: '20px',
            ...otherStyle
          }}
        >
          <Typography variant='H4' component='H4' fontSize='16px'>
            {summary}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'end',
              justifyContent: 'flex-end'
            }}
          >
            {count && (
              <Typography variant='H4' component='H4' fontSize='16px'>
                {count}
              </Typography>
            )}
            {action}
          </Box>
        </Box>
      )}
      {children}
    </>
  )
}

LayoutPages.propTypes = {
  children: PropTypes.node,
  action: PropTypes.node,
  summary: PropTypes.string,
  handleBack: PropTypes.func,
  count: PropTypes.string,
  otherStyle: PropTypes.object
}

export default LayoutPages
