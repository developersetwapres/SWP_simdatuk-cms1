import { Box, Typography } from '@mui/material'
import React from 'react'
import ExportTable from '../ExportTable'

const ExportAsnNonActive = () => {
  const totalData = 0

  return (
    <Box>
      <ExportTable data={[]} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingY: '5px',
          paddingX: '8px',
          marginY: '5px',
          backgroundColor: '#394346'
        }}
      >
        <Typography fontWeight='400' color='white' fontSize={14}>
          Aparatur Sipil Negara (ASN) Non Aktif
        </Typography>
        <Typography fontWeight='400' color='white' fontSize={14}>
          Total : {totalData}
        </Typography>
      </Box>
    </Box>
  )
}

export default ExportAsnNonActive
