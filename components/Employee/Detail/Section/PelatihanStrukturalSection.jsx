/* eslint-disable no-unused-vars */
import React from 'react'
import { Table } from '@/components/shared'
import { Grid, TableCell, TableRow, Typography } from '@mui/material'
import { headersRiwayatPelatihanStruktural } from './dummyData'



const PelatihanStrukturalSection = () => {



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
          Riwayat Pelatihan Struktural
        </Typography>
        <Table
          headers={headersRiwayatPelatihanStruktural}
        >
        </Table>
      </Grid>
    </>
  )
}

export default PelatihanStrukturalSection
