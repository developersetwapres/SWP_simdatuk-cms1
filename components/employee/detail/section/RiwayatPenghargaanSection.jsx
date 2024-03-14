/* eslint-disable no-unused-vars */
import React from 'react'
import { Table } from '@/components/shared'
import { Grid, TableCell, TableRow, Typography } from '@mui/material'
import { headersRiwayatPenghargaan } from './dummyData'



const RiwayatPenghargaanSection = () => {



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
          Riwayat Penghargaan
        </Typography>
        <Table
          headers={headersRiwayatPenghargaan}
        >
        </Table>
      </Grid>
    </>
  )
}

export default RiwayatPenghargaanSection
