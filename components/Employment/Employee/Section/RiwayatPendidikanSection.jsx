/* eslint-disable no-unused-vars */
import React from 'react'
import { Table } from '@/components/shared'
import { Grid, TableCell, TableRow, Typography } from '@mui/material'
import { headersRiwayatPendidikan, riwayatPendidikan } from './dummyData'



const RiwayatPendidikanSection = () => {



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
          Riwayat Pendidikan
        </Typography>
        <Table
          headers={headersRiwayatPendidikan}
        >
          {
            riwayatPendidikan.map((item, index) => {
              return (
                <>
                  <TableRow>
                    <TableCell>
                      {item.no}
                    </TableCell>
                    <TableCell

                    >
                      {item.Tingkat}
                    </TableCell>
                    <TableCell

                    >
                      {item.nama_Sekolah}
                    </TableCell>
                    <TableCell

                    >
                      {item.fakultas}
                    </TableCell>
                    <TableCell

                    >
                      {item.jurusan}
                    </TableCell>
                    <TableCell

                    >
                      {item.status}
                    </TableCell>
                    <TableCell

                    >
                      {item.tahun_Lulus}
                    </TableCell>
                    <TableCell

                    >
                      {item.keterangan_Sekolah}
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

export default RiwayatPendidikanSection
