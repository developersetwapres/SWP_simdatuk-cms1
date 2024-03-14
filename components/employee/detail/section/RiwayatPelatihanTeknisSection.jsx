/* eslint-disable no-unused-vars */
import React from 'react'
import { Table } from '@/components/shared'
import {
  Grid,
  TableCell,
  TableRow,
  Typography
} from '@mui/material'
import {  headersRiwayatPelatihanTeknis } from './dummyData'



const RiwayatPelatihanTeknisSection = () => {



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
          Riwayat Pelatihan Teknis
        </Typography>
        <Table
          headers={headersRiwayatPelatihanTeknis}
        >
        </Table>
      </Grid>
    </>
  )
}

export default RiwayatPelatihanTeknisSection
