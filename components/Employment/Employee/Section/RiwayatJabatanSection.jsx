/* eslint-disable no-unused-vars */
import React from 'react'
import { Table } from '@/components/shared'
import { Grid, TableCell, TableRow, Typography } from '@mui/material'
import { headersRiwayatJabatan, riwayatJabatan } from './dummyData'



const RiwayatJabatanSection = () => {



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
          Riwayat Jabatan
        </Typography>
        <Table
          headers={headersRiwayatJabatan}
        >
          {
            riwayatJabatan.map((item, index) => {
              return (
                <>
                  <TableRow

                  >
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.no}
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.jabatan}
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.rumpun}
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.tmt_menjabat}
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.sk_menjabat}
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.sk_jabatan}
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.jenis_sk}
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.no_sk}
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.tanggal_sk}
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.eselon}
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.keterangan_jabatan}
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.tmt_selesai}
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.sl_selesai}
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.jenis_sk_sls}
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.no_sk_sls}
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.tanggal_sk_sls}
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.status_jabatan}
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

export default RiwayatJabatanSection
