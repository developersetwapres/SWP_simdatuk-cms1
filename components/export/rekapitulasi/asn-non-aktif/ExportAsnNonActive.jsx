import { Box, Typography } from '@mui/material'
import React from 'react'
import ExportTable from '../ExportTable'
import { asnNonActive } from '@/components/employee/asn-active/dummiData'

const ExportAsnNonActive = () => {



  const totalData = asnNonActive.reduce((acc, data) => acc + data.amount, 0)

  return (
    <Box>
      <ExportTable
        data={asnNonActive}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingY: '5px',
          paddingX: '8px',
          marginY: 1,
          backgroundColor: '#394346'
        }}
      >
        <Typography
          fontWeight='400'
          color='white'
          fontSize={14}
        >
          Aparatur Sipil Negara (ASN) Non Aktif
        </Typography>
        <Typography
          fontWeight='400'
          color='white'
          fontSize={14}
        >
          Total : {totalData}
        </Typography>
      </Box>
    </Box>
  )
}

export default ExportAsnNonActive
