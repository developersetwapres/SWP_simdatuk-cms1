/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import ButtonExport from '../core/ButtonExport'
import PropTypes from 'prop-types'
import { Button } from '../shared'


const EmployeeLayout = ({ children, summary, totalAmount, showExpButton, reset, addBtn }) => {

  const [exportData, setExportData] = useState(showExpButton)
  const [resetBtn, setResetBtn] = useState(reset)
  const [addEmployee, setAddEmployee] = useState(addBtn)



  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row'
          },
          alignItems: 'center',
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
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            marginTop: '20px'
          }}
        >
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
          {resetBtn ?
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end'
              }}
            >
              <Button
                text='Reset Pegawai'
                color='sidatukDraweBase'
              />
            </Box> : ''
          }
          {addEmployee ?
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end'
              }}
            >
              <Button
                text='Tambah Pegawai'
                color='primary'
              />
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
  showExpButton: PropTypes.bool.isRequired,
  reset: PropTypes.bool,
  addBtn: PropTypes.bool
}

export default EmployeeLayout

