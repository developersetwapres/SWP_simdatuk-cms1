import React from 'react'
import { Grid } from '@mui/material'
import EmployeeLayout from '../Employee/EmployeeLayout'
import AsnDataList from '../shared/Card/AsnDataList'
import {
  jenisKelamin,
  pendidikan,
  jabatan,
  tim
} from '../PegawaiAsnComponents/dummyData'

const styles = {
  cardStyle: {
    width: {
      lg: '22.5vw',
      md: '20vw',
      sm: '25vw',
      xs: '50vw'
    },
    height: '200px'
  },
  twoCardStyle: {
    width: {
      lg: '35vw',
      md: '20vw',
      sm: '25vw',
      xs: '50vw'
    },
    height: '200px'
  }
}

const PegawaiNonAsnComponent = () => {
  return (
    <EmployeeLayout
      summary='Rekapitulasi Jumlah Pegawai Non ASN'
      showExpButton={true}
    >
      <Grid
        container
        columnSpacing={2}
        rowSpacing={2}
        alignItems='center'
        justifyContent='space-between'
      >
        <AsnDataList data={jabatan} name='Jabatan' />
        <AsnDataList cardStyle={styles.twoCardStyle} data={tim} name='Tim' />
        <AsnDataList data={pendidikan} name='Pendidikan' />
        <AsnDataList
          cardStyle={styles.twoCardStyle}
          data={jenisKelamin}
          name='Jenis Kelamin'
        />
      </Grid>
    </EmployeeLayout>
  )
}

export default PegawaiNonAsnComponent
