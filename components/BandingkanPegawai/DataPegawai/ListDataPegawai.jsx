/* eslint-disable no-unused-vars */
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell'
import Image from 'next/image'
import React from 'react'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import PelatihanFungsionalSection from '@/components/Employee/Detail/Section/PelatihanFungsional'


const useStyles = makeStyles((theme) => ({
  list: {
    paddingLeft: 15,
    margin: 0,
    fontSize: '12px'
  },
  boxListData: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  boxMain: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    marginBottom: '15px'
  },
  tableRowClass: {
    [`& .${tableCellClasses.root}`]: {
      borderBottom: 'none'
    }
  }
}))



const ListDataPegawai = ({
  id,
  imageSource,
  names,
  eselon,
  jabatan,
  golongan,
  nip,
  riwayatPendidikan,
  riwayatJabatan,
  pelatihanStruktural,
  pelatihanFungsional,
  pelatihanTeknis,
  riwayatCatatan
}) => {
  const classes = useStyles()

  const rows = [
    'Jabatan',
    'Eselon',
    'Golongan',
    'Nip/NRP',
    'Riwayat Pendidikan',
    'Riwayat Jabatan',
    'Riwayat Pelatihan Struktural',
    'Riwayat Pelatihan Fungsional',
    'Riwayat Pelatihan Teknis',
    'Riwayat Catatan'
  ]


  return (
    <Box
      sx={{
        paddingX: 2
      }}
    >
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow
              className={classes.tableRowClass}
            >
              <TableCell
                sx={{
                  maxWidth: '20rem'
                }}
                component='th' align='center'>

              </TableCell>
              {
                imageSource.map((imageSrc, index) => (
                  <TableCell
                    sx={{
                      maxWidth: '20rem'
                    }}
                    key={index} align='center'>
                    <Image
                      src={imageSrc}
                      alt='Fhoto Pegawai'
                      width={150}
                      height={200}
                    />
                  </TableCell>
                ))
              }
            </TableRow>
            <TableRow
              className={classes.tableRowClass}
            >
              <TableCell
                sx={{
                  maxWidth: '20rem'
                }}
                component='th' align='left'>

              </TableCell>
              {
                names.map((name, index) => (
                  <TableCell
                    sx={{
                      maxWidth: '20rem'
                    }}
                    key={index} align='center'>
                    <Typography
                      fontSize={16}
                      fontWeight='500'
                      color='primary'
                    >
                      {name}
                    </Typography>
                  </TableCell>
                ))
              }
            </TableRow>
            {
              rows.map((row, index) => (
                <TableRow
                  className={classes.tableRowClass}
                  key={index}>
                  <TableCell
                    sx={{
                      maxWidth: '20rem',
                      verticalAlign: 0
                    }}
                    component='th' align='left'>

                    {row}
                  </TableCell>
                  {
                    index === 0 && (
                      jabatan.map((item, index) => (
                        <TableCell
                          sx={{
                            maxWidth: '20rem',
                            verticalAlign: 0
                          }}
                          key={index} align='left'>
                          {item}
                        </TableCell>
                      ))
                    )
                  }
                  {
                    index === 1 && (
                      eselon.map((item, index) => (
                        <TableCell
                          sx={{
                            maxWidth: '20rem',
                            verticalAlign: 0
                          }}
                          key={index} align='left'>
                          {item}
                        </TableCell>
                      ))
                    )
                  }
                  {
                    index === 2 && (
                      golongan.map((item, index) => (
                        <TableCell
                          sx={{
                            maxWidth: '20rem',
                            verticalAlign: 0
                          }}
                          key={index} align='left'>
                          {item}
                        </TableCell>
                      ))
                    )
                  }
                  {
                    index === 3 && (
                      nip.map((item, index) => (
                        <TableCell
                          sx={{
                            maxWidth: '20rem',
                            verticalAlign: 0
                          }}
                          key={index} align='left'>
                          {item}
                        </TableCell>
                      ))
                    )
                  }
                  {
                    index === 4 && (
                      riwayatPendidikan?.map((item, index) => (
                        <TableCell
                          sx={{
                            maxWidth: '20rem',
                            verticalAlign: 0
                          }}
                          key={index} align='left'>
                          <ol
                            className={classes.list}
                          >
                            {item.map((data, index) => (
                              <li key={index}>
                                {`${data.jenjang} ${data?.jurusan} (${data.nama}, ${data.tahunLulus})`}
                              </li>
                            ))}
                          </ol>
                        </TableCell>
                      ))
                    )
                  }
                  {
                    index === 5 && (
                      riwayatJabatan?.map((item, index) => (
                        item.length ? (
                          <TableCell
                            sx={{
                              maxWidth: '20rem',
                              verticalAlign: 0
                            }}
                            key={index} align='left'>
                            <ol
                              className={classes.list}
                            >
                              {item.map((data, index) => (
                                <li key={index}>
                                  {data.jabatan}
                                </li>
                              ))}
                            </ol>
                          </TableCell>
                        ) : (
                          <TableCell
                            key={index}
                          >
                            -
                          </TableCell>
                        )
                      ))
                    )
                  }
                  {
                    index === 6 && (
                      pelatihanStruktural?.map((item, index) => (
                        item.length ? (
                          <TableCell
                            sx={{
                              maxWidth: '20rem',
                              verticalAlign: 0
                            }}
                            key={index} align='left'>
                            <ol
                              className={classes.list}
                            >
                              {item.map((data, index) => (
                                <li key={index}>
                                  {data.pelatihan}
                                </li>
                              ))}
                            </ol>
                          </TableCell>
                        ) : (
                          <TableCell
                            key={index}
                          >
                            -
                          </TableCell>
                        )
                      ))
                    )
                  }
                  {
                    index === 7 && (
                      pelatihanFungsional?.map((item, index) => (
                        item.length ? (
                          <TableCell
                            sx={{
                              maxWidth: '20rem',
                              verticalAlign: 0
                            }}
                            key={index} align='left'>
                            <ol
                              className={classes.list}
                            >
                              {item.map((data, index) => (
                                <li key={index}>
                                  {data.jabatan}
                                </li>
                              ))}
                            </ol>
                          </TableCell>
                        ) : (
                          <TableCell
                            key={index}
                          >
                            -
                          </TableCell>
                        )
                      ))
                    )
                  }
                  {
                    index === 8 && (
                      pelatihanTeknis?.map((item, index) => (
                        item.length ? (
                          <TableCell
                            sx={{
                              maxWidth: '20rem',
                              verticalAlign: 0
                            }}
                            key={index} align='left'>
                            <ol
                              className={classes.list}
                            >
                              {item.map((data, index) => (
                                <li key={index}>
                                  {data.pelatihan}
                                </li>
                              ))}
                            </ol>
                          </TableCell>
                        ) : (
                          <TableCell
                            key={index}
                          >
                            -
                          </TableCell>
                        )
                      ))
                    )
                  }
                  {
                    index === 9 && (
                      riwayatCatatan.map((item, index) => (
                        <TableCell
                          sx={{
                            maxWidth: '20rem',
                            verticalAlign: 0
                          }}
                          key={index} align='left'>
                          {item}
                        </TableCell>
                      ))
                    )
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

ListDataPegawai.propTypes = {
  id: PropTypes.array,
  imageSource: PropTypes.array,
  names: PropTypes.array,
  eselon: PropTypes.array,
  jabatan: PropTypes.array,
  golongan: PropTypes.array,
  nip: PropTypes.array,
  riwayatPendidikan: PropTypes.array,
  riwayatJabatan: PropTypes.array,
  pelatihanStruktural: PropTypes.array,
  pelatihanFungsional: PropTypes.array,
  pelatihanTeknis: PropTypes.array,
  riwayatCatatan: PropTypes.array
}

export default ListDataPegawai
