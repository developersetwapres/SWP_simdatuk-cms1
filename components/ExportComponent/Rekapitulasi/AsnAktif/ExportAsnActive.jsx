import { Box, Typography } from '@mui/material'
import React from 'react'
import ExportTable from '../ExportTable'

const ExportAsnActive = () => {
  const allData = []

  const totalData = allData.reduce((acc, data) => acc + data.amount, 0)

  return (
    <Box>
      <ExportTable summary='Pejabat Pimpinan' data={[]} />
      <ExportTable summary='Pejabat Pelaksana' data={[]} />
      <ExportTable summary='Pejabat Fungsional Keahlian' data={[]} />
      <ExportTable summary='Pejabat Fungsional Keterampilan' data={[]} />
      <ExportTable
        summary='Pejabat Kemensetneg Yang Diperbantukan di Setwapres'
        data={[]}
      />
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
          Aparatur Sipil Negara (ASN) Aktif + Perbantuan TNI/POLRI Pelaksana
        </Typography>
        <Typography fontWeight='400' color='white' fontSize={14}>
          Total : {totalData}
        </Typography>
      </Box>
    </Box>
  )
}

export default ExportAsnActive
