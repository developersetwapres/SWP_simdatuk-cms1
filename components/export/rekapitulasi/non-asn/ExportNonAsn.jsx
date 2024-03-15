import { Box, Typography } from '@mui/material'
import React from 'react'
import ExportTable from '../ExportTable'
import { nonAsn, tnp2k, tpps } from '@/components/employee/asn-active/dummiData'

const ExportNonAsn = () => {
  const tim = [
    ...tnp2k,
    ...tpps
  ]
  const allData = [
    ...nonAsn,
    ...tim
  ]
  const totalData = allData.reduce((acc, data) => acc + data.amount, 0)

  return (
    <Box>
      <ExportTable
        summary='Non Aparatur Sipil Negara (Non ASN)  '
        data={nonAsn}
      />
      <ExportTable
        summary='Tim'
        data={tim}
      />
      {/* <ExportTable
        data={tpps}
      /> */}
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
          Non Aparatur Sipil Negara (Non ASN) + Tim
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

export default ExportNonAsn
