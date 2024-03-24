/* eslint-disable no-unused-vars */
import React from 'react'
import { Table } from '@/components/shared'
import { Grid, TableCell, TableRow, Typography } from '@mui/material'
import { headersPrestasiKerja } from './dummyData'



const RiwayatPrestasiKerja = () => {



  return (
    <>
      <Grid

      >
        <Typography
          color='primary'
          sx={{
            fontWeight: 'bold',
            marginBottom: '14px'
          }}
        >
          Riwayat Penilaian Prestasi Kerja
        </Typography>
        <Table
          headers={headersPrestasiKerja}
        >
        </Table>
      </Grid>
    </>
  )
}

export default RiwayatPrestasiKerja
