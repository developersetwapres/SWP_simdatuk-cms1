/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react'
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
    <Fragment>
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
          <Typography variant='h4' component='h4' fontSize='16px'>
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
              <Typography component='h4' fontSize='16px'>
                {count}
              </Typography>
            )}
            {action && action}
          </Box>
        </Box>
      )}
      {children}
    </Fragment>
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
