import React from 'react'
import { Grid } from '@mui/material'
import EmployeeLayout from '../employee/EmployeeLayout'
import AsnDataList from '../core/card/AsnDataList'
import {
  nonOutsourcing,
  pegawaiOutsourcing,
  jenisKelamin,
  pendidikan
} from '../pegawaiAsnComponent/dummyData'




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

const PegawaiOutsourcingComponent = () => {
  return (
    <EmployeeLayout
      summary='Rekapitulasi Pegawai ASN'
      showExpButton={true}
    >
      <Grid
        container
        columnSpacing={2}
        rowSpacing={2}
        alignItems='center'
        justifyContent='space-between'
      >
        <AsnDataList
          data={pegawaiOutsourcing}
          name='Unit Kerja'
        />
        <AsnDataList
          cardStyle={styles.cardStyle}
          data={nonOutsourcing}
          name='Keterangan Jabatan'
        />
        <AsnDataList
          cardStyle={styles.twoCardStyle}
          data={pegawaiOutsourcing}
          name='Pegawai Non Aktif'
        />
        <AsnDataList
          data={pendidikan}
          name='Pendidikan'
        />
        <AsnDataList
          cardStyle={styles.twoCardStyle}
          data={jenisKelamin}
          name='Jenis Kelamin'
        />
      </Grid>
    </EmployeeLayout>
  )
}

export default PegawaiOutsourcingComponent
