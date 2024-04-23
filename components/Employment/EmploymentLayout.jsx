/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Box, Typography } from '@mui/material'
import ButtonExport from '../core/ButtonExport'
import PropTypes from 'prop-types'
import { Button } from '../shared'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { useRouter } from 'next/router'

const EmploymentLayout = ({
  children,
  summary,
  formatExport,
  handleReset,
  handleAdd,
  handleBack,
  count,
  otherStyle
}) => {
  const router = useRouter()
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
            <Box sx={{ margin: '8px 0', display: 'flex', gap: 1 }}>
              {formatExport && formatExport.length > 0 && (
                <ButtonExport data={formatExport} />
              )}
              {handleReset && (
                <Button
                  text='Reset Pegawai'
                  color='sidatukDraweBase'
                  onClick={handleReset}
                />
              )}
              {handleAdd && (
                <Button
                  text='Tambah Pegawai'
                  color='primary'
                  onClick={handleAdd}
                />
              )}
            </Box>
          </Box>
        </Box>
      )}
      {children}
    </>
  )
}

EmploymentLayout.propTypes = {
  children: PropTypes.node,
  summary: PropTypes.string,
  formatExport: PropTypes.array,
  handleReset: PropTypes.func,
  handleAdd: PropTypes.func,
  handleBack: PropTypes.func,
  count: PropTypes.string,
  otherStyle: PropTypes.object
}

export default EmploymentLayout
