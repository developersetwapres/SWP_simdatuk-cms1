/* eslint-disable no-unused-vars */
import React from 'react'
import { Table } from '@/components/shared'
import { Grid, TableCell, TableRow, Typography } from '@mui/material'
import {  headersRiwayatSKP } from './dummyData'



const RiwayatSKP = () => {



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
          Riwayat SKP
        </Typography>
        <Table
          headers={headersRiwayatSKP}
        >
        </Table>
      </Grid>
    </>
  )
}

export default RiwayatSKP
