import React from 'react'
import EmployeeLayout from './EmployeeLayout'
import { Grid } from '@mui/material'
import CardComponent from '../shared/Card/CardComponent'

const EmployeeComponent = () => {
  const data = [
    {
      id: 1,
      path: 'komposisi-pegawai/asn-aktif',
      type: 'Aparatur Sipil Negara (ASN) Aktif + Perbantuan TNI/POLRI Pelaksana',
      amount: 283
    },
    {
      id: 2,
      path: 'komposisi-pegawai/asn-non-aktif',
      type: 'Aparatur Sipil Negara (ASN) Non Aktif',
      amount: 6
    },
    {
      id: 3,
      path: 'komposisi-pegawai/non-asn',
      type: 'Non Aparatur Sipil Negara (Non ASN) + Tim',
      amount: 162
    },
    {
      id: 4,
      path: 'komposisi-pegawai/outsourcing',
      type: 'Tenaga Outsourcing dan Non Outsourcing',
      amount: 198
    }
  ]
  const totalAmount = data.reduce((acc, current) => acc + current.amount, 0)

  return (
    <>
      <EmployeeLayout
        summary='Rekapitulasi Pegawai Sekretariat Wakil Presiden RI'
        totalAmount={totalAmount}
        showExpButton={true}
      >
        <Grid
          container
          columnSpacing={2}
          rowSpacing={2}
          alignItems='center'
          justifyContent='space-between'
        >
          {data.map((item, index) => (
            <Grid item key={index + 1}>
              <CardComponent
                summary={item.type}
                amount={item.amount}
                path={item.path}
              />
            </Grid>
          ))}
        </Grid>
      </EmployeeLayout>
    </>
  )
}

export default EmployeeComponent
