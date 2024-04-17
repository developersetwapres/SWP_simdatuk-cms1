/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import ButtonExport from '../core/ButtonExport'
import PropTypes from 'prop-types'
import { Button } from '../shared'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { useRouter } from 'next/router'

const EmployeeLayout = ({
  children,
  summary,
  showExpButton,
  reset,
  addBtn,
  urlBack
}) => {
  const router = useRouter()
  const [exportData, setExportData] = useState(showExpButton)
  const [resetBtn, setResetBtn] = useState(reset)
  const [addEmployee, setAddEmployee] = useState(addBtn)

  return (
    <>
      {urlBack && (
        <Box sx={{ marginBottom: '20px' }}>
          <Button
            text='Kembali'
            variant='text'
            icon={<KeyboardArrowLeft />}
            onClick={() => router.push(urlBack)}
          />
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row'
          },
          alignItems: 'start',
          justifyContent: 'space-between',
          marginBottom: '20px',
          paddingX: '20px'
        }}
      >
        <Typography variant='H4' component='H4' fontSize='16px'>
          {summary}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 1
          }}
        >
          {exportData && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end'
              }}
            >
              <ButtonExport />
            </Box>
          )}
          {resetBtn && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end'
              }}
            >
              <Button text='Reset Pegawai' color='sidatukDraweBase' />
            </Box>
          )}
          {addEmployee && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end'
              }}
            >
              <Button text='Tambah Pegawai' color='primary' />
            </Box>
          )}
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
