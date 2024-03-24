/* eslint-disable no-unused-vars */
import React from 'react'
import { Table } from '@/components/shared'
import {
  Grid,
  TableCell,
  TableRow,
  Typography
} from '@mui/material'
import { headersRiwayatCuti } from './dummyData'



const RiwayatCutiSection = () => {



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
          Riwayat Cuti
        </Typography>
        <Table
          headers={headersRiwayatCuti}
        >
        </Table>
      </Grid>
    </>
  )
}

export default RiwayatCutiSection
