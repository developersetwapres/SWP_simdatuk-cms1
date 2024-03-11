import React from 'react'
import { Box } from '@mui/material'
import EmployeeLayout from '../EmployeeLayout'
import AsnDataList from '@/components/core/card/AsnDataList'
import { nonAsn, tnp2k, tpps } from '../asn-active/dummiData'


const NonAsnComponent = () => {
  const totalPejabat = [
    ...nonAsn,
    ...tnp2k,
    ...tpps
  ]

  const totalAmount = totalPejabat.reduce((acc, pejabat) => acc + pejabat.amount, 0)


  return (
    <Box
      sx={{
        paddingTop: '20px'
      }}
    >
      <EmployeeLayout
        summary='Non Aparatur Sipil Negara (Non ASN) + TIM'
        totalAmount={totalAmount}
        showExpButton={false}
      >
        <AsnDataList
          data={nonAsn}
          name='Non Aparatur Sipil Negara (Non ASN)'
        />
        <AsnDataList
          data={tnp2k}
          name='Tim Nasional Percepatan Penanggulangan Kemiskinan (TNP2K)'
        />
        <AsnDataList
          data={tpps}
          name='Tim Nasional Percepatan Penurunan Stunting (TPPS)'
        />
      </EmployeeLayout>
    </Box>
  )
}

export default NonAsnComponent
