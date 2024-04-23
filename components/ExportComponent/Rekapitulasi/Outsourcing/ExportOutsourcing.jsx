import { Box, Typography } from '@mui/material'
import React from 'react'
import ExportTable from '../ExportTable'

const TenagaOutsourcing = () => {
  const allData = []

  const totalData = allData.reduce((acc, data) => acc + data.amount, 0)

  return (
    <Box>
      <ExportTable summary='Tenaga Outsourcing' data={[]} />
      <ExportTable summary='Tenaga Non Outsourcing' data={[]} />
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
          Tenaga Outsourcing dan Non Outsourcing
        </Typography>
        <Typography fontWeight='400' color='white' fontSize={14}>
          Total : {totalData}
        </Typography>
      </Box>
    </Box>
  )
}

export default TenagaOutsourcing
