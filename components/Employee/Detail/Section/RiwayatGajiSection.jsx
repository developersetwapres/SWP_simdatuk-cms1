/* eslint-disable no-unused-vars */
import React from 'react'
import { Table } from '@/components/shared'
import { Grid, TableCell, TableRow, Typography } from '@mui/material'
import { headersRiwayaGaji, riwayatGaji } from './dummyData'



const RiwayatGajiSection = () => {



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
          Riwayat Gaji
        </Typography>
        <Table
          headers={headersRiwayaGaji}
        >
          {
            riwayatGaji.map((item, index) => {
              return (
                <>
                  <TableRow

                  >
                    <TableCell
                    >
                      {item.no}
                    </TableCell>
                    <TableCell
                      align='left'
                    >
                      {item.golongan}
                    </TableCell>
                    <TableCell
                    >
                      {item.tmt_golongan}
                    </TableCell>
                    <TableCell
                    >
                      {item.no_sk}
                    </TableCell>
                    <TableCell
                    >
                      {item.mk_golongan_tahun}
                    </TableCell>
                    <TableCell
                    >
                      {item.mk_golongan_bulan}
                    </TableCell>
                    <TableCell
                    >
                      {item.gaji_pokok_lama}
                    </TableCell>
                    <TableCell
                    >
                      {item.gaji_pokok_baru}
                    </TableCell>
                    <TableCell
                    >
                      {item.keterangan}
                    </TableCell>
                  </TableRow>
                </>
              )
            })
          }
        </Table>
      </Grid>
    </>
  )
}

export default RiwayatGajiSection
