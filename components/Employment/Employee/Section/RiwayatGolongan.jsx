/* eslint-disable no-unused-vars */
import React from 'react'
import { Table } from '@/components/shared'
import { Grid, TableCell, TableRow, Typography } from '@mui/material'
import { headersRiwayatGolongan, riwayatGolongan } from './dummyData'



const RiwayatGolonganSection = () => {



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
          Riwayat Golongan
        </Typography>
        <Table
          headers={headersRiwayatGolongan}
        >
          {
            riwayatGolongan.map((item, index) => {
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
                      {item.golongan}
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.tmt_golongan}
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.sk_golongan}
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.no_sk_golongan}
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.tanggal_sk_golongan}
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.keterangan_golongan}
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{

                      }}
                    >
                      {item.status_golongan}
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

export default RiwayatGolonganSection
