/* eslint-disable no-unused-vars */
import React from 'react'
import { Table } from '@/components/shared'
import {
  Grid,
  TableCell,
  TableRow,
  Typography
} from '@mui/material'
import { headersRiwayatPelatihanFungsional } from './dummyData'



const RiwayatHukumanDisiplin = () => {



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
        Riwayat Hukuman Disiplin
        </Typography>
        <Table
          headers={headersRiwayatPelatihanFungsional}
        >
        </Table>
      </Grid>
    </>
  )
}

export default RiwayatHukumanDisiplin
