/* eslint-disable no-unused-vars */
import React from 'react'
import { Table } from '@/components/shared'
import { Grid, TableCell, TableRow, Typography } from '@mui/material'
import { headersRiwayatKeluarga, riwayatKeluarga } from './dummyData'



const RiwayatKeluargaSection = () => {



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
          Riwayat Keluarga
        </Typography>
        <Table
          headers={headersRiwayatKeluarga}
        >
          {
            riwayatKeluarga.map((item, index) => {
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
                      {item.no_kartu_keluarga}
                    </TableCell>
                    <TableCell
                    >
                      {item.nama_anggota_keluarga}
                    </TableCell>
                    <TableCell
                    >
                      {item.no_NIK}
                    </TableCell>
                    <TableCell
                    >
                      {item.jenis_kelamin}
                    </TableCell>
                    <TableCell
                    >
                      {item.agama}
                    </TableCell>
                    <TableCell
                    >
                      {item.tempat_ahir}
                    </TableCell>
                    <TableCell
                    >
                      {item.tanggal_lahir}
                    </TableCell>
                    <TableCell
                    >
                      {item.nama_bapak}
                    </TableCell>
                    <TableCell
                    >
                      {item.nama_ibu}
                    </TableCell>
                    <TableCell
                    >
                      {item.hubungan_keluarga}
                    </TableCell>
                    <TableCell
                    >
                      {item.pendidikan}
                    </TableCell>
                    <TableCell
                    >
                      {item.jenis_pekerjaan}
                    </TableCell>
                    <TableCell
                    >
                      {item.keterangan_pekerjaan}
                    </TableCell>
                    <TableCell
                    >
                      {item.status_perkawinan}
                    </TableCell>
                    <TableCell
                    >
                      {item.no_hp}
                    </TableCell>
                    <TableCell
                    >
                      {item.urut_peluarga}
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

export default RiwayatKeluargaSection
