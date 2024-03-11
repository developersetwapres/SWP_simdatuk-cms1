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
import AsnActiveDataList from './AsnActiveDataList'

const AsnActiveComponent = () => {

  const totalPejabat = [
    ...pejabatPimpinan,
    ...pejabatPelaksana,
    ...pejabatFungsionalKeahlian,
    ...pejabatFungsionalKeterampilan,
    ...pejabatKemensetneg
  ]

  const totalAmount = totalPejabat.reduce((acc, pejabat) => acc + pejabat.amount, 0)


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
        <AsnActiveDataList
          data={pejabatPimpinan}
          name='Pejabat Pimpinan'
        />
        <AsnActiveDataList
          data={pejabatPelaksana}
          name='Pejabat Pelaksana'
        />
        <AsnActiveDataList
          data={pejabatFungsionalKeahlian}
          name='Pejabat Fungsional Keahlian'
        />
        <AsnActiveDataList
          data={pejabatFungsionalKeterampilan}
          name='Pejabat Fungsional Keterampilan'
        />
        <AsnActiveDataList
          data={pejabatKemensetneg}
          name='Pejabat Kemensetneg Yang Diperbantukan di Setwapres'
        />

      </EmployeeLayout>
    </Box>
  )
}

export default AsnActiveComponent
