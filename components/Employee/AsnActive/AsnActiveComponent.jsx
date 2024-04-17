import React from 'react'
import { Box } from '@mui/material'
import EmployeeLayout from '../EmployeeLayout'
import {
  pejabatPimpinan,
  pejabatPelaksana,
  pejabatFungsionalKeahlian,
  pejabatFungsionalKeterampilan,
  pejabatKemensetneg
} from './dummiData'
import AsnDataList from '../../shared/Card/AsnDataList'

const AsnActiveComponent = () => {
  const totalPejabat = [
    ...pejabatPimpinan,
    ...pejabatPelaksana,
    ...pejabatFungsionalKeahlian,
    ...pejabatFungsionalKeterampilan,
    ...pejabatKemensetneg
  ]

  const totalAmount = totalPejabat.reduce(
    (acc, pejabat) => acc + pejabat.amount,
    0
  )

  return (
    <Box
      sx={{
        paddingTop: '20px'
      }}
    >
      <EmployeeLayout
        summary='Aparatur Sipil Negara (ASN) Aktif + Perbantuan TNI/POLRI Pelaksana'
        totalAmount={totalAmount}
        showExpButton={false}
      >
        <AsnDataList data={pejabatPimpinan} name='Pejabat Pimpinan' />
        <AsnDataList data={pejabatPelaksana} name='Pejabat Pelaksana' />
        <AsnDataList
          data={pejabatFungsionalKeahlian}
          name='Pejabat Fungsional Keahlian'
        />
        <AsnDataList
          data={pejabatFungsionalKeterampilan}
          name='Pejabat Fungsional Keterampilan'
        />
        <AsnDataList
          data={pejabatKemensetneg}
          name='Pejabat Kemensetneg Yang Diperbantukan di Setwapres'
        />
      </EmployeeLayout>
    </Box>
  )
}

export default AsnActiveComponent
