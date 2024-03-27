/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import ButtonExport from '../core/ButtonExport'
import PropTypes from 'prop-types'


const EmployeeLayout = ({ children, summary, totalAmount, showExpButton }) => {

  const [exportData, setExportData] = useState(showExpButton)


  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row'
          },
          justifyContent: 'space-between',
          marginBottom: '20px',
          paddingX: '20px'
        }}
      >
        <Typography
          variant='h6'
          component='h1'
          fontSize='14px'
        >
          {summary}
        </Typography>
        <Box>
          {
            totalAmount && (
              <Typography
                variant='h6'
                component='h5'
                fontSize='14px'
                marginBottom={2}
              >
                {`Total Keseluruhan : ${totalAmount}`}
              </Typography>
            )
          }
          {exportData ?
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end'
              }}
            >
              <ButtonExport />
            </Box> : ''
          }
        </Box>
      </Box>
      {children}
    </>
  )
}

EmployeeLayout.propTypes = {
  children: PropTypes.node.isRequired,
  summary: PropTypes.string.isRequired,
  totalAmount: PropTypes.number.isRequired,
  showExpButton: PropTypes.bool.isRequired
}

export default EmployeeLayout

