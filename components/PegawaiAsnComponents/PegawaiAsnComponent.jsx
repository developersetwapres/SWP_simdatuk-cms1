import React from 'react'
import { Grid } from '@mui/material'
import AsnDataList from '../shared/Card/AsnDataList'
import {
  golongan,
  jenisKelamin,
  keteranganJabatan,
  pegawaiNonAktif,
  pendidikan,
  unitKerja
} from './dummyData'
import EmployeeLayout from '../Employment/EmploymentLayout'

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

const PegawaiAsnComponent = () => {
  return (
    <EmployeeLayout summary='Rekapitulasi Pegawai ASN' showExpButton={true}>
      <Grid
        container
        columnSpacing={2}
        rowSpacing={2}
        alignItems='center'
        justifyContent='space-between'
      >
        <AsnDataList data={unitKerja} name='Unit Kerja' />
        <AsnDataList
          cardStyle={styles.cardStyle}
          data={keteranganJabatan}
          name='Keterangan Jabatan'
        />
        <AsnDataList data={golongan} name='Golongan' />
        <AsnDataList
          cardStyle={styles.twoCardStyle}
          data={pegawaiNonAktif}
          name='Pegawai Non Aktif'
        />
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

export default PegawaiAsnComponent
