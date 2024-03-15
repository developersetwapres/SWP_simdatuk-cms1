import { Box, Typography } from '@mui/material'
import React from 'react'
import ExportTable from '../ExportTable'
import { tenagaOutsourcing, nonOutsourcing } from '@/components/employee/asn-active/dummiData'

const TenagaOutsourcing = () => {
  const allData = [
    ...tenagaOutsourcing,
    ...nonOutsourcing
  ]

  const totalData = allData.reduce((acc, data) => acc + data.amount, 0)

  return (
    <Box>
      <ExportTable
        summary='Tenaga Outsourcing'
        data={tenagaOutsourcing}
      />
      <ExportTable
        summary='Tenaga Non Outsourcing'
        data={nonOutsourcing}
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
          Tenaga Outsourcing dan Non Outsourcing
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

export default TenagaOutsourcing
