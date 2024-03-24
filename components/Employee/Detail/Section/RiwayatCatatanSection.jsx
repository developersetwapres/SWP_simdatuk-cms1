/* eslint-disable no-unused-vars */
import React from 'react'
import { Table } from '@/components/shared'
import {
  Grid,
  TableCell,
  TableRow,
  Typography
} from '@mui/material'
import { headersRiwayatCatatan, headersRiwayatCuti } from './dummyData'



const RiwayatCatatanSection = () => {



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
          Riwayat Catatan
        </Typography>
        <Table
          headers={headersRiwayatCatatan}
        >
        </Table>
      </Grid>
    </>
  )
}

export default RiwayatCatatanSection
